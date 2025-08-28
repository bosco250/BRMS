import React, { useState } from "react";
import {
  Search,
  Heart,
  Star,
  Utensils,
  Coffee,
  Wine,
  Cake,
  ShoppingCart,
  Plus,
  Minus,
  Filter,
  X,
} from "lucide-react";
import { useCustomerDashboard } from "./context";
import { toast } from "react-toastify";
import { autoGenerateNotifications } from "../../../services/notificationService";
import type { Notification } from "../../../types/notification";

// Utility function to format RWF currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function BrowseMenu() {
  const {
    products,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    cartItems,
    cartTotal,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useCustomerDashboard();

  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const categories = [
    {
      id: "all",
      label: "All Items",
      icon: Utensils,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "food",
      label: "Food",
      icon: Utensils,
      color: "bg-green-100 text-green-800",
    },
    {
      id: "beverages",
      label: "Beverages",
      icon: Coffee,
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: "alcohol",
      label: "Alcohol",
      icon: Wine,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "desserts",
      label: "Desserts",
      icon: Cake,
      color: "bg-pink-100 text-pink-800",
    },
  ];

  // Toggle favorite
  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Get cart quantity for a product
  const getCartQuantity = (productId: number) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem?.quantity || 0;
  };

  // Filter and sort products
  const filteredAndSorted = products
    .filter((p) => {
      const matchCat =
        selectedCategory === "all" || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchCat && matchSearch && matchPrice;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "rating":
          comparison = a.rating - b.rating;
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Handle add to cart
  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);

    // Generate a notification for adding to cart
    const { addNotification } = useCustomerDashboard();
    if (addNotification) {
      addNotification({
        type: "order",
        title: "Item Added to Cart",
        description: `${product.name} has been added to your cart`,
        priority: "low",
        isRead: false,
        icon: "🛒",
      });
    }
  };

  // Handle remove from cart
  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
    toast.info("Item removed from cart");
  };

  // Handle quantity update
  const handleQuantityUpdate = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange([0, 50000]);
    setSortBy("name");
    setSortOrder("asc");
  };

  return (
    <div className="space-y-6">
      {/* Header with Cart */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Browse Menu</h2>
          <p className="text-text-secondary">
            Discover delicious food and beverages
          </p>
        </div>
        <button
          onClick={() => setShowCart(!showCart)}
          className="relative bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Cart ({cartItems.length})
          {cartTotal > 0 && (
            <span className="bg-white text-brand text-xs px-2 py-1 rounded-full">
              {formatCurrency(cartTotal)}
            </span>
          )}
        </button>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-4 border-b border-border-primary">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your Cart</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-text-secondary mx-auto mb-4" />
                  <p className="text-text-secondary">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary">
                          {item.name}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityUpdate(
                              item.id,
                              (item.quantity || 1) - 1
                            )
                          }
                          className="w-8 h-8 bg-surface-primary rounded-full flex items-center justify-center hover:bg-surface-card"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityUpdate(
                              item.id,
                              (item.quantity || 1) + 1
                            )
                          }
                          className="w-8 h-8 bg-surface-primary rounded-full flex items-center justify-center hover:bg-surface-card"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-border-primary pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-text-primary">
                        Total:
                      </span>
                      <span className="font-bold text-lg text-text-primary">
                        {formatCurrency(cartTotal)}
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        setShowCart(false);
                        window.location.href = "/checkout";
                      }}
                      className="w-full bg-brand text-white py-3 rounded-lg font-medium hover:bg-brand-dark transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-dashboard border border-border-primary rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Price Range: {formatCurrency(priceRange[0])} -{" "}
            {formatCurrency(priceRange[1])}
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([parseInt(e.target.value), priceRange[1]])
              }
              className="flex-1"
            />
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="flex-1"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {filteredAndSorted.length} items found
            </span>
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-brand hover:text-brand-dark font-medium"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-brand text-white"
                  : "bg-surface-secondary text-text-primary hover:bg-surface-card"
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSorted.map((product) => {
          const isFavorite = favorites.includes(product.id);
          const cartQuantity = getCartQuantity(product.id);
          return (
            <div
              key={product.id}
              className="bg-surface-secondary rounded-lg border border-border-secondary p-4 hover:shadow-lg transition-shadow"
            >
              {/* Product Image Placeholder */}
              <div className="w-full h-32 bg-surface-primary rounded-lg mb-3 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full rounded-lg object-cover"
                  />
                ) : (
                  <span className="text-2xl">
                    {product.category === "food"
                      ? "🍽️"
                      : product.category === "beverages"
                      ? "☕"
                      : product.category === "alcohol"
                      ? "🍷"
                      : "🍰"}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-text-primary text-sm line-clamp-2">
                  {product.name}
                </h4>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-1 rounded transition-colors ${
                    isFavorite
                      ? "text-error hover:text-error/80"
                      : "text-text-muted hover:text-error"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              <p className="text-xs text-text-secondary mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 text-warning fill-current" />
                <span className="text-xs text-text-secondary">
                  {product.rating}
                </span>
              </div>

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary text-lg">
                  {formatCurrency(product.price)}
                </span>
                {cartQuantity > 0 ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityUpdate(product.id, cartQuantity - 1)
                      }
                      className="w-8 h-8 bg-surface-primary rounded-full flex items-center justify-center hover:bg-surface-card"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium text-sm">
                      {cartQuantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityUpdate(product.id, cartQuantity + 1)
                      }
                      className="w-8 h-8 bg-surface-primary rounded-full flex items-center justify-center hover:bg-surface-card"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand/90 transition-colors text-sm"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAndSorted.length === 0 && (
        <div className="text-center py-12">
          <Utensils className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No Items Found
          </h3>
          <p className="text-text-secondary">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
}
