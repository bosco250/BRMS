import React from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../data/checkoutData";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { state, removeItem, updateQuantity, closeCart, getTotalPrice } =
    useCart();
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
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-4 border-b border-border-primary bg-surface-secondary"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-semibold text-text-primary">
                Shopping Cart
              </h2>
              <motion.button
                onClick={closeCart}
                className="p-2 hover:bg-surface-primary rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-text-secondary mb-2">
                      Your cart is empty
                    </div>
                    <div className="text-sm text-text-tertiary">
                      Add some items to get started
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="bg-surface-secondary rounded-lg p-3 border border-border-primary"
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
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <motion.img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-text-primary truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-text-secondary">
                              {item.description}
                            </p>
                            <p className="text-brand font-medium">
                              {formatCurrency(item.totalPrice)}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <motion.button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="p-1 hover:bg-surface-primary rounded transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            <span className="px-3 py-1 bg-white border border-border-primary rounded text-center min-w-[3rem]">
                              {item.quantity}
                            </span>
                            <motion.button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="p-1 hover:bg-surface-primary rounded transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>
                          <motion.button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "#FEF2F2",
                            }}
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
                className="border-t border-border-primary p-4 bg-surface-secondary"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Debug Info */}
                <div className="text-xs text-gray-500 mb-2">
                  Debug: {items.length} items in cart
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-text-primary">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-brand">
                    {formatCurrency(getTotalPrice())}
                  </span>
                </div>

                {/* Test Navigation Button */}
                <motion.button
                  onClick={() => {
                    // Test navigation
                    window.location.href = "/checkout";
                  }}
                  className="w-full bg-gray-500 text-white py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors mb-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Test Navigation (Direct)
                </motion.button>

                <motion.button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-brand text-white py-3 rounded-lg font-medium hover:bg-brand-dark transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
