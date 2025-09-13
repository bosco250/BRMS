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
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-6 border-b border-gray-200 bg-white"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
                  <span className="text-brand text-lg">🛒</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Shopping Cart
                  </h2>
                  <p className="text-sm text-gray-500">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
              </motion.button>
            </motion.div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🛒</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Add some delicious items to get started
                    </p>
                    <motion.button
                      onClick={closeCart}
                      className="bg-brand text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-hover transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
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
                        <div className="flex items-start gap-4">
                          {item.image ? (
                            <motion.img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover shadow-sm"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-2xl">🍽️</span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-brand font-bold text-lg">
                                {formatCurrency(item.totalPrice)}
                              </span>
                              <span className="text-sm text-gray-500">
                                {formatCurrency(item.price)} each
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                            <motion.button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="p-3 hover:bg-white rounded-md transition-colors group touch-manipulation"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Minus className="w-5 h-5 text-gray-600 group-hover:text-brand" />
                            </motion.button>
                            <span className="px-6 py-3 bg-white border border-gray-200 rounded-md text-center min-w-[4rem] font-bold text-gray-900 text-lg">
                              {item.quantity}
                            </span>
                            <motion.button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="p-3 hover:bg-white rounded-md transition-colors group touch-manipulation"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Plus className="w-5 h-5 text-gray-600 group-hover:text-brand" />
                            </motion.button>
                          </div>
                          <motion.button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "#FEF2F2",
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Trash2 className="w-4 h-4 group-hover:text-red-600" />
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
                className="border-t border-gray-200 p-6 bg-white flex-shrink-0"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Order Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Subtotal ({items.length} items)
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(getTotalPrice())}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold text-gray-900">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-brand">
                        {formatCurrency(getTotalPrice())}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={handleProceedToCheckout}
                    className="w-full bg-brand text-white py-4 rounded-xl font-semibold text-lg hover:bg-brand-hover transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Proceed to Checkout</span>
                    <span className="text-xl">→</span>
                  </motion.button>

                  <motion.button
                    onClick={handleClearCart}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash className="w-4 h-4" />
                    <span>Clear Cart</span>
                  </motion.button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-3">
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
