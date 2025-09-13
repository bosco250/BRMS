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
      className="relative bg-brand/10 hover:bg-brand/20 px-4 py-3 rounded-lg text-brand hover:text-brand-hover transition-all duration-200 group border border-brand/20 hover:border-brand/40"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
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
        </div>
        <div className="hidden sm:block">
          <div className="text-sm font-semibold">Cart</div>
          <div className="text-xs opacity-75">
            {itemCount === 0
              ? "Empty"
              : `${itemCount} item${itemCount !== 1 ? "s" : ""}`}
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default CartIcon;
