import { useState } from "react";
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
  Clock,
  MapPin,
  ChefHat,
  AlertTriangle,
  Zap,
  Award,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCustomerDashboard } from "./context";
import { useCart } from "../../../contexts/CartContext";
import type { CartItem } from "../../../data/checkoutTypes";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useCustomerDashboard();
  const {
    state: cartState,
    addItem,
    removeItem,
    updateQuantity,
    getItemCount,
    getTotalPrice,
  } = useCart();

  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [showRestaurantSelector, setShowRestaurantSelector] = useState(false);

  // Multiple restaurants data
  const restaurants = [
    {
      id: 1,
      name: "Kigali Bistro",
      location: "Kigali, Rwanda",
      rating: 4.6,
      deliveryTime: "25-35 min",
      deliveryFee: 2000,
      minimumOrder: 5000,
      isOpen: true,
      cuisine: "International",
      phone: "+250 788 123 456",
      address: "KG 123 St, Kigali, Rwanda",
      image: null,
      specialties: ["Grilled Meats", "Fresh Salads", "Coffee"],
      operatingHours: "7:00 AM - 10:00 PM",
    },
    {
      id: 2,
      name: "Rwanda Kitchen",
      location: "Kigali, Rwanda",
      rating: 4.8,
      deliveryTime: "20-30 min",
      deliveryFee: 1500,
      minimumOrder: 3000,
      isOpen: true,
      cuisine: "Rwandan",
      phone: "+250 788 234 567",
      address: "KG 456 St, Kigali, Rwanda",
      image: null,
      specialties: ["Traditional Dishes", "Local Cuisine", "Fresh Fish"],
      operatingHours: "6:00 AM - 11:00 PM",
    },
    {
      id: 3,
      name: "Pizza Palace",
      location: "Kigali, Rwanda",
      rating: 4.4,
      deliveryTime: "30-45 min",
      deliveryFee: 2500,
      minimumOrder: 4000,
      isOpen: true,
      cuisine: "Italian",
      phone: "+250 788 345 678",
      address: "KG 789 St, Kigali, Rwanda",
      image: null,
      specialties: ["Wood-fired Pizza", "Pasta", "Desserts"],
      operatingHours: "11:00 AM - 12:00 AM",
    },
    {
      id: 4,
      name: "Sushi Zen",
      location: "Kigali, Rwanda",
      rating: 4.9,
      deliveryTime: "35-50 min",
      deliveryFee: 3000,
      minimumOrder: 8000,
      isOpen: false,
      cuisine: "Japanese",
      phone: "+250 788 456 789",
      address: "KG 321 St, Kigali, Rwanda",
      image: null,
      specialties: ["Fresh Sushi", "Sashimi", "Ramen"],
      operatingHours: "12:00 PM - 10:00 PM",
    },
    {
      id: 5,
      name: "Burger Junction",
      location: "Kigali, Rwanda",
      rating: 4.2,
      deliveryTime: "15-25 min",
      deliveryFee: 1000,
      minimumOrder: 2000,
      isOpen: true,
      cuisine: "American",
      phone: "+250 788 567 890",
      address: "KG 654 St, Kigali, Rwanda",
      image: null,
      specialties: ["Gourmet Burgers", "Fries", "Milkshakes"],
      operatingHours: "10:00 AM - 11:00 PM",
    },
  ];

  // Set default selected restaurant
  const currentRestaurant = selectedRestaurant || restaurants[0];

  // Enhanced product data with multi-tenant information
  const enhancedProducts = products.map((product) => ({
    ...product,
    // Multi-tenant restaurant information
    restaurant: currentRestaurant,
    // Availability and timing
    availability: {
      isAvailable: true,
      preparationTime: Math.floor(Math.random() * 30) + 15, // 15-45 minutes
      lastOrderTime: "22:00",
      isPopular: Math.random() > 0.7,
      isNew: Math.random() > 0.8,
      isLimited: Math.random() > 0.9,
    },
    // Nutritional information
    nutrition: {
      calories: Math.floor(Math.random() * 800) + 200,
      protein: Math.floor(Math.random() * 40) + 10,
      carbs: Math.floor(Math.random() * 60) + 20,
      fat: Math.floor(Math.random() * 30) + 5,
      fiber: Math.floor(Math.random() * 10) + 2,
      sugar: Math.floor(Math.random() * 20) + 5,
      sodium: Math.floor(Math.random() * 1000) + 200,
      allergens: ["gluten", "dairy"].filter(() => Math.random() > 0.5),
      dietary: ["vegetarian", "vegan", "keto", "halal"].filter(
        () => Math.random() > 0.6
      ),
    },
    // Additional details
    details: {
      servingSize: "1 portion",
      spiceLevel: Math.floor(Math.random() * 5) + 1,
      temperature: ["hot", "cold", "room temperature"][
        Math.floor(Math.random() * 3)
      ],
      ingredients: [
        "Fresh ingredients",
        "Local produce",
        "Organic when available",
        "No artificial preservatives",
      ],
      cookingMethod: ["grilled", "fried", "steamed", "baked"][
        Math.floor(Math.random() * 4)
      ],
      origin: "Made fresh daily",
      chef: "Chef Jean Baptiste",
      signature: Math.random() > 0.7,
    },
    // Pricing and offers
    pricing: {
      originalPrice: product.price,
      discount: Math.random() > 0.8 ? Math.floor(Math.random() * 20) + 5 : 0,
      loyaltyPoints: Math.floor(product.price / 100),
      isOnSale: Math.random() > 0.8,
      bulkDiscount: Math.random() > 0.7,
    },
    // Reviews and ratings
    reviews: {
      totalReviews: Math.floor(Math.random() * 200) + 20,
      averageRating: product.rating,
      recentReviews: [
        "Absolutely delicious!",
        "Great portion size",
        "Fast delivery",
        "Highly recommended",
      ],
    },
  }));

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
    const cartItem = cartState.items.find(
      (ci) => ci.productId === String(productId)
    );
    return cartItem?.quantity || 0;
  };

  const getAvailabilityStatus = (product: any) => {
    if (!product.availability.isAvailable)
      return { text: "Unavailable", color: "text-red-600", icon: XCircle };
    if (product.availability.isLimited)
      return { text: "Limited", color: "text-orange-600", icon: AlertTriangle };
    if (product.availability.isPopular)
      return { text: "Popular", color: "text-green-600", icon: Award };
    if (product.availability.isNew)
      return { text: "New", color: "text-blue-600", icon: Zap };
    return { text: "Available", color: "text-green-600", icon: CheckCircle };
  };

  const getCurrentPrice = (product: any) => {
    const discount = product.pricing.discount;
    return discount > 0 ? product.price * (1 - discount / 100) : product.price;
  };

  // Filter and sort products
  const filteredAndSorted = enhancedProducts
    .filter((p) => {
      const matchCat =
        selectedCategory === "all" || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
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
    const item: CartItem = {
      id: `ci_${product.id}_${Date.now()}`,
      productId: String(product.id),
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: 1,
      totalPrice: product.price,
      image: product.image || undefined,
      category: product.category,
      modifiers: [],
    };
    addItem(item);
  };

  // Handle remove from cart
  const handleRemoveFromCart = (productId: number) => {
    const existing = cartState.items.find(
      (ci) => ci.productId === String(productId)
    );
    if (existing) removeItem(existing.id);
  };

  // Handle quantity update
  const handleQuantityUpdate = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      const existing = cartState.items.find(
        (ci) => ci.productId === String(productId)
      );
      if (existing) updateQuantity(existing.id, newQuantity);
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
      {/* Header with Restaurant Info and Cart */}
      <div className="bg-white rounded-2xl shadow-lg border border-border-primary p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-brand to-brand-dark rounded-xl flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-text-primary">
                    {currentRestaurant.name}
                  </h1>
                  <button
                    onClick={() => setShowRestaurantSelector(true)}
                    className="px-3 py-1 bg-brand/10 text-brand rounded-lg hover:bg-brand/20 transition-colors text-sm font-medium flex items-center space-x-1"
                  >
                    <span>Change Restaurant</span>
                    <X className="w-3 h-3 rotate-45" />
                  </button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{currentRestaurant.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{currentRestaurant.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{currentRestaurant.deliveryTime} delivery</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentRestaurant.isOpen
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {currentRestaurant.isOpen ? "Open Now" : "Closed"}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {currentRestaurant.cuisine} Cuisine
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Free Delivery over{" "}
                {formatCurrency(currentRestaurant.minimumOrder)}
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                {formatCurrency(currentRestaurant.deliveryFee)} delivery fee
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-brand text-white"
                    : "bg-surface-secondary text-text-secondary hover:bg-surface-card"
                }`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-brand text-white"
                    : "bg-surface-secondary text-text-secondary hover:bg-surface-card"
                }`}
              >
                <div className="w-4 h-4 flex flex-col space-y-1">
                  <div className="bg-current rounded-sm h-1"></div>
                  <div className="bg-current rounded-sm h-1"></div>
                  <div className="bg-current rounded-sm h-1"></div>
                </div>
              </button>
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-brand text-white px-6 py-3 rounded-xl hover:bg-brand-dark transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart ({getItemCount()})</span>
              {getTotalPrice() > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-brand text-xs px-2 py-1 rounded-full font-bold">
                  {formatCurrency(getTotalPrice())}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto border border-border-primary">
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
              {cartState.items.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-text-secondary mx-auto mb-4" />
                  <p className="text-text-secondary">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartState.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg border border-border-secondary"
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
                              Number(item.productId),
                              (item.quantity || 1) - 1
                            )
                          }
                          className="w-8 h-8 bg-surface-primary rounded-full flex items-center justify-center hover:bg-surface-card border border-border-secondary"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityUpdate(
                              Number(item.productId),
                              (item.quantity || 1) + 1
                            )
                          }
                          className="w-8 h-8 bg-surface-primary rounded-full flex items-center justify-center hover:bg-surface-card border border-border-secondary"
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
                        {formatCurrency(getTotalPrice())}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setShowCart(false);
                        navigate("/checkout");
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

      {/* Products Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {filteredAndSorted.map((product) => {
          const isFavorite = favorites.includes(product.id);
          const cartQuantity = getCartQuantity(product.id);
          const availability = getAvailabilityStatus(product);
          const currentPrice = getCurrentPrice(product);
          const AvailabilityIcon = availability.icon;

          if (viewMode === "list") {
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg border-2 border-border-primary overflow-hidden hover:shadow-xl hover:border-brand/30 transition-all duration-200"
              >
                <div className="flex">
                  {/* Product Image */}
                  <div className="w-32 h-32 bg-surface-primary flex items-center justify-center border-r border-border-secondary">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">
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

                  {/* Product Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-bold text-text-primary">
                            {product.name}
                          </h4>
                          {product.details.signature && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                              Signature
                            </span>
                          )}
                        </div>
                        <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className={`p-2 rounded-lg transition-colors border ${
                            isFavorite
                              ? "text-error bg-red-50 border-red-200"
                              : "text-text-muted hover:text-error hover:bg-red-50 border-border-secondary hover:border-red-200"
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              isFavorite ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-text-primary">
                            {formatCurrency(currentPrice)}
                          </span>
                          {product.pricing.discount > 0 && (
                            <span className="text-sm text-text-muted line-through">
                              {formatCurrency(product.price)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <AvailabilityIcon
                            className={`w-4 h-4 ${availability.color}`}
                          />
                          <span
                            className={`text-sm font-medium ${availability.color}`}
                          >
                            {availability.text}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {cartQuantity > 0 ? (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                handleQuantityUpdate(
                                  product.id,
                                  cartQuantity - 1
                                )
                              }
                              className="w-8 h-8 bg-surface-secondary rounded-full flex items-center justify-center hover:bg-surface-card border-2 border-border-secondary hover:border-brand/30"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {cartQuantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityUpdate(
                                  product.id,
                                  cartQuantity + 1
                                )
                              }
                              className="w-8 h-8 bg-surface-secondary rounded-full flex items-center justify-center hover:bg-surface-card border-2 border-border-secondary hover:border-brand/30"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-brand text-white px-6 py-2 rounded-xl hover:bg-brand-dark transition-all duration-200 flex items-center space-x-2 border-2 border-brand-dark hover:border-brand/80"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Grid view
          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md border border-border-primary overflow-hidden hover:shadow-lg hover:border-brand/30 transition-all duration-200 group hover:-translate-y-0.5"
            >
              {/* Product Image with Overlays */}
              <div className="relative">
                <div className="w-full h-36 bg-surface-primary flex items-center justify-center border-b border-border-secondary relative">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <span className="text-4xl">
                      {product.category === "food"
                        ? "🍽️"
                        : product.category === "beverages"
                        ? "☕"
                        : product.category === "alcohol"
                        ? "🍷"
                        : "🍰"}
                    </span>
                  )}
                  {/* Category pill */}
                  <span
                    className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium border ${
                      categories.find((c) => c.id === product.category)
                        ?.color || "bg-surface-secondary text-text-secondary"
                    } border-border-secondary`}
                  >
                    {" "}
                    {categories.find((c) => c.id === product.category)?.label ||
                      "Item"}{" "}
                  </span>
                </div>

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {product.pricing.discount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full border border-red-600">
                      -{product.pricing.discount}%
                    </span>
                  )}
                  {!product.availability.isAvailable && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full border border-red-200">
                      Unavailable
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`p-2 rounded-full transition-all duration-200 border ${
                      isFavorite
                        ? "text-error bg-white shadow-lg border-red-200"
                        : "text-white bg-black/20 hover:bg-white hover:text-error border-white/30"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-text-primary mb-1 line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-text-secondary text-xs mb-2 line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between mb-3 text-xs text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-warning" />
                    <span className="font-medium text-text-primary text-sm">
                      {product.rating}
                    </span>
                  </div>
                  {product.availability?.preparationTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{product.availability.preparationTime} min</span>
                    </div>
                  )}
                </div>

                {/* Dietary Tags - Only show most important ones */}
                {product.nutrition.dietary.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.nutrition.dietary
                      .slice(0, 1)
                      .map((diet, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium border border-green-200"
                        >
                          {diet}
                        </span>
                      ))}
                  </div>
                )}

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-text-primary">
                      {formatCurrency(currentPrice)}
                    </span>
                    {product.pricing.discount > 0 && (
                      <span className="text-xs text-text-muted line-through">
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>
                  {cartQuantity > 0 ? (
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() =>
                          handleQuantityUpdate(product.id, cartQuantity - 1)
                        }
                        className="w-7 h-7 bg-surface-secondary rounded-full flex items-center justify-center hover:bg-surface-card border border-border-secondary hover:border-brand/30"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center font-medium text-xs">
                        {cartQuantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityUpdate(product.id, cartQuantity + 1)
                        }
                        className="w-7 h-7 bg-surface-secondary rounded-full flex items-center justify-center hover:bg-surface-card border border-border-secondary hover:border-brand/30"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-brand text-white px-3.5 py-2 rounded-lg hover:bg-brand-dark transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium border border-brand-dark hover:border-brand/80 w-full sm:w-auto"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
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

      {/* Restaurant Selector Modal */}
      {showRestaurantSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border-primary p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-primary">
                Choose a Restaurant
              </h2>
              <button
                onClick={() => setShowRestaurantSelector(false)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    onClick={() => {
                      setSelectedRestaurant(restaurant);
                      setShowRestaurantSelector(false);
                      toast.success(`Switched to ${restaurant.name}`);
                    }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedRestaurant?.id === restaurant.id
                        ? "border-brand bg-brand/5"
                        : "border-border-secondary hover:border-brand/50"
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-brand to-brand-dark rounded-xl flex items-center justify-center">
                        <ChefHat className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-text-primary">
                          {restaurant.name}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {restaurant.cuisine} • {restaurant.location}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">
                            {restaurant.rating}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            restaurant.isOpen
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {restaurant.isOpen ? "Open" : "Closed"}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{restaurant.deliveryTime} delivery</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>
                            Fee: {formatCurrency(restaurant.deliveryFee)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>
                            Min: {formatCurrency(restaurant.minimumOrder)}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-xs text-text-secondary mb-2">
                          Specialties:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {restaurant.specialties
                            .slice(0, 2)
                            .map((specialty, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-surface-secondary text-text-secondary rounded-full text-xs"
                              >
                                {specialty}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
