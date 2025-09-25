import React from "react";
import { motion } from "framer-motion";
import { Image, Clock, Edit, Trash2 } from "lucide-react";
import type { MenuItem } from "../../../../types/business";
import { formatCurrency } from "../../../../utils/businessUtils";

interface MenuGridProps {
  menuItems: MenuItem[];
  onEditMenu: (menu: MenuItem) => void;
  onDeleteMenu: (menuId: string) => void;
}

export default function MenuGrid({
  menuItems,
  onEditMenu,
  onDeleteMenu,
}: MenuGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface-secondary rounded-xl border border-border-subtle overflow-hidden hover:shadow-lg transition-all duration-200 group"
        >
          <div className="h-48 bg-gradient-to-br from-surface-secondary to-surface-card relative">
            {item.photo ? (
              <img
                src={item.photo}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image className="w-12 h-12 text-text-muted" />
              </div>
            )}
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-brand/90 text-white">
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-brand transition-colors">
                {item.name}
              </h3>
              <span className="text-lg font-bold text-brand">
                {formatCurrency(item.price)}
              </span>
            </div>
            <p className="text-text-secondary text-sm mb-3 line-clamp-2">
              {item.description}
            </p>
            <div className="space-y-2 text-xs text-text-secondary mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>{item.preparationTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Calories: {item.calories}</span>
              </div>
              {item.allergens && (
                <div className="flex items-center gap-2">
                  <span>Allergens: {item.allergens}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEditMenu(item)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-brand text-white text-sm rounded-lg hover:bg-brand-hover transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => onDeleteMenu(item.id)}
                className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Delete Menu Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
