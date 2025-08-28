import React, { useEffect, useState } from "react";
import { Trash2, Minus, Plus, User } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { formatCurrency } from "../../data/checkoutData";
import { getSessionUser } from "../../auth/session";

interface CartReviewStepProps {
  onNext: () => void;
}

const CartReviewStep: React.FC<CartReviewStepProps> = ({ onNext }) => {
  // FIX: Use correct function names from CartContext
  const { state, updateQuantity, removeItem } = useCart();
  const { items } = state;
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  // Get logged in user on component mount
  useEffect(() => {
    const user = getSessionUser();
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.08; // 8% tax

  // For now, we'll use a default delivery fee since the delivery method isn't selected yet
  // This will be updated in the next step when the user selects their order method
  const deliveryFee = 0; // Will be updated based on selection (0 for dine_in/take_away, 3000 RWF for delivery)
  const total = subtotal + tax + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-text-primary mb-2">
          Your cart is empty
        </h3>
        <p className="text-text-secondary">
          Add some items to your cart to continue with checkout.
        </p>
      </div>
    );
  }

  // If no user is logged in, show a message
  if (!loggedInUser) {
    return (
      <div className="text-center py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <User className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-yellow-800 mb-2">
            Please Log In
          </h3>
          <p className="text-yellow-700 mb-4">
            You need to be logged in to proceed with checkout.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Review Your Items ({items.length})
        </h3>

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-surface-secondary rounded-lg border border-border-primary"
          >
            {/* Item Image */}
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">No Image</span>
                </div>
              )}
            </div>

            {/* Item Details */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-text-primary truncate">
                {item.name}
              </h4>
              <p className="text-sm text-text-secondary truncate">
                {item.description}
              </p>
              <p className="text-sm font-medium text-brand">
                {formatCurrency(item.price)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-border-primary flex items-center justify-center hover:bg-surface-primary transition-colors"
                disabled={item.quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium text-text-primary">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-border-primary flex items-center justify-center hover:bg-surface-primary transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Item Total */}
            <div className="text-right min-w-0">
              <p className="font-semibold text-text-primary">
                {formatCurrency(item.totalPrice)}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="p-2 text-text-tertiary hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-surface-secondary rounded-lg border border-border-primary p-4">
        <h4 className="font-semibold text-text-primary mb-3">Order Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Subtotal</span>
            <span className="text-text-primary">
              {formatCurrency(subtotal)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Tax (8%)</span>
            <span className="text-text-primary">{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Service Fee</span>
            <span className="text-text-primary">
              {deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}
            </span>
          </div>
          <div className="border-t border-border-primary pt-2 mt-2">
            <div className="flex justify-between font-semibold text-lg">
              <span className="text-text-primary">Total</span>
              <span className="text-brand">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-text-tertiary mt-2">
          * Service fee will be calculated based on your selected order method
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-brand text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-dark transition-colors"
        >
          Continue to Order Method
        </button>
      </div>
    </div>
  );
};

export default CartReviewStep;
