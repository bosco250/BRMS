import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const FloatingCartButton: React.FC = () => {
  const { getItemCount, toggleCart, getTotalPrice } = useCart();
  const location = useLocation();
  const itemCount = getItemCount();
  const totalPrice = getTotalPrice();

  // Don't show on checkout or order pages
  const hideOnPages = ["/checkout", "/order-success", "/order-tracking"];
  const shouldHide = hideOnPages.some((page) =>
    location.pathname.includes(page)
  );

  if (shouldHide || itemCount === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.button
        onClick={toggleCart}
        className="fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent-hover text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
        initial={{ opacity: 0, scale: 0, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0, y: 100 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <motion.span
              className="absolute -top-2 -right-2 bg-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {itemCount > 99 ? "99+" : itemCount}
            </motion.span>
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-semibold">View Cart</div>
            <div className="text-xs opacity-90">
              {itemCount} item{itemCount !== 1 ? "s" : ""} • RF
              {totalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </motion.button>
    </AnimatePresence>
  );
};

export default FloatingCartButton;
