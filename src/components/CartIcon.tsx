import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const CartIcon: React.FC = () => {
  const { getItemCount, toggleCart } = useCart();
  const itemCount = getItemCount();

  return (
    <motion.button
      onClick={toggleCart}
      className="relative p-2 text-text-primary hover:text-brand transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ShoppingCart className="w-6 h-6" />

      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 bg-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            {itemCount > 99 ? "99+" : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CartIcon;
