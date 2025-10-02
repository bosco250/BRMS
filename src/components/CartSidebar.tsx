import React, { useState } from "react";
import { X, Plus, Minus, Trash2, Trash, AlertTriangle } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../data/checkoutTypes";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartSidebar: React.FC = () => {
  const navigate = useNavigate();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const {
    state,
    removeItem,
    updateQuantity,
    closeCart,
    getTotalPrice,
    clearCart,
  } = useCart();
  const { items, isOpen } = state;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    toast.success(
      <div>
        <div className="font-medium">Proceeding to Checkout</div>
        <div className="text-sm text-gray-600">
          Please complete your order details
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
    navigate("/checkout");
  };

  const handleClearCart = () => {
    setShowClearConfirm(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  const cancelClearCart = () => {
    setShowClearConfirm(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-surface-primary shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-4 border-b border-border-subtle bg-gradient-to-r from-brand/5 to-brand/10 backdrop-blur-sm"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-hover rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-xl">🛒</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-primary">
                    Your Cart
                  </h2>
                  <p className="text-xs text-text-secondary font-medium">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={closeCart}
                className="p-2 hover:bg-surface-secondary rounded-lg transition-colors group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-text-secondary group-hover:text-text-primary" />
              </motion.button>
            </motion.div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-3 min-h-0 scrollbar-thin scrollbar-thumb-brand/30 scrollbar-track-surface-secondary">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-brand/10 to-brand/5 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-3xl">🛒</span>
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-sm text-text-secondary mb-6 px-4">
                      Add some delicious items to get started
                    </p>
                    <motion.button
                      onClick={closeCart}
                      className="bg-gradient-to-r from-brand to-brand-hover text-text-inverted px-6 py-2.5 rounded-lg font-semibold text-sm hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="space-y-2.5">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="bg-surface-secondary rounded-lg p-3 border border-border-subtle shadow-sm hover:shadow-md hover:border-brand/30 transition-all"
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        transition={{
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        layout
                      >
                        <div className="flex items-start gap-3">
                          {item.image ? (
                            <motion.img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover shadow-sm border border-border-subtle"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gradient-to-br from-brand/10 to-brand/5 rounded-lg flex items-center justify-center border border-border-subtle">
                              <span className="text-2xl">🍽️</span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-text-primary text-sm mb-1 line-clamp-1">
                              {item.name}
                            </h3>
                            <p className="text-xs text-text-secondary mb-2 line-clamp-1">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-brand font-bold text-base">
                                {formatCurrency(item.totalPrice)}
                              </span>
                              <span className="text-xs text-text-muted">
                                {formatCurrency(item.price)} each
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border-subtle">
                          <div className="flex items-center gap-1.5 bg-surface-primary rounded-lg p-1 border border-border-subtle shadow-sm">
                            <motion.button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="p-1.5 hover:bg-brand/10 rounded transition-colors group touch-manipulation"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Minus className="w-4 h-4 text-text-secondary group-hover:text-brand" />
                            </motion.button>
                            <span className="px-3 py-1 bg-surface-primary border border-border-subtle rounded text-center min-w-[2.5rem] font-bold text-text-primary text-sm">
                              {item.quantity}
                            </span>
                            <motion.button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="p-1.5 hover:bg-brand/10 rounded transition-colors group touch-manipulation"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Plus className="w-4 h-4 text-text-secondary group-hover:text-brand" />
                            </motion.button>
                          </div>
                          <motion.button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors group border border-transparent hover:border-error/30"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                className="border-t border-border-subtle p-4 bg-gradient-to-t from-surface-secondary to-surface-primary flex-shrink-0 shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Order Summary */}
                <div className="space-y-2 mb-4 bg-surface-secondary rounded-lg p-3 border border-border-subtle">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">
                      Subtotal ({items.length} items)
                    </span>
                    <span className="font-semibold text-text-primary text-sm">
                      {formatCurrency(getTotalPrice())}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Delivery Fee</span>
                    <span className="font-semibold text-success text-sm">Free</span>
                  </div>
                  <div className="border-t border-border-subtle pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-text-primary">
                        Total
                      </span>
                      <span className="text-xl font-bold text-brand">
                        {formatCurrency(getTotalPrice())}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <motion.button
                    onClick={handleProceedToCheckout}
                    className="w-full bg-gradient-to-r from-brand to-brand-hover text-text-inverted py-3 rounded-lg font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Proceed to Checkout</span>
                    <span className="text-lg">→</span>
                  </motion.button>

                  <motion.button
                    onClick={handleClearCart}
                    className="w-full bg-surface-secondary text-text-secondary py-2.5 rounded-lg font-medium text-sm hover:bg-error/10 hover:text-error transition-colors flex items-center justify-center gap-2 border border-border-subtle hover:border-error/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash className="w-4 h-4" />
                    <span>Clear Cart</span>
                  </motion.button>
                </div>

                <p className="text-center text-xs text-text-muted mt-3">
                  ✓ Secure checkout • ✓ Guest checkout available
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Clear Cart Confirmation Modal */}
          <AnimatePresence>
            {showClearConfirm && (
              <>
                {/* Modal Backdrop */}
                <motion.div
                  className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={cancelClearCart}
                />

                {/* Modal */}
                <motion.div
                  className="fixed inset-0 z-[70] flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {/* Modal Header */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 border-b border-red-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            Clear Shopping Cart
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            This action cannot be undone
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                      <div className="text-center mb-6">
                        <p className="text-gray-700 mb-4">
                          Are you sure you want to remove all items from your
                          cart?
                        </p>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Items in cart:</span>
                            <span className="font-semibold">
                              {items.length}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Total value:</span>
                            <span className="font-semibold text-brand">
                              {formatCurrency(getTotalPrice())}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          onClick={cancelClearCart}
                          className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors border border-gray-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          onClick={confirmClearCart}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Trash className="w-4 h-4" />
                          Clear Cart
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
