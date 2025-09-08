import React, { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Search,
  Filter,
  Star,
  Clock,
  Heart,
  Share2,
  ShoppingBag,
  CreditCard,
  MapPin,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  Utensils,
  Coffee,
  Wine,
  IceCream,
  Zap,
  Gift,
  Crown,
  Award,
  Trophy,
} from "lucide-react";

export default function SelfServiceOrdering() {
  const [activeTab, setActiveTab] = useState("menu");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState("restaurant-1");
  const [orderType, setOrderType] = useState("dine_in");

  // Mock data
  const restaurants = [
    {
      id: "restaurant-1",
      name: "Kigali City Restaurant",
      location: "KN 4 Ave, Kigali",
    },
    {
      id: "restaurant-2",
      name: "Downtown Bistro",
      location: "City Center, Kigali",
    },
    { id: "restaurant-3", name: "Garden Cafe", location: "Kimisagara, Kigali" },
  ];

  const menuItems = [
    {
      id: 1,
      name: "Grilled Chicken",
      category: "Main Course",
      price: 15000,
      description: "Tender grilled chicken with herbs and spices",
      image: "/api/placeholder/300/200",
      rating: 4.8,
      prepTime: 20,
      calories: 350,
      allergens: ["None"],
      isFavorite: false,
      isPopular: true,
      available: true,
    },
    {
      id: 2,
      name: "Caesar Salad",
      category: "Salad",
      price: 8000,
      description: "Fresh romaine lettuce with caesar dressing",
      image: "/api/placeholder/300/200",
      rating: 4.5,
      prepTime: 10,
      calories: 250,
      allergens: ["Dairy", "Gluten"],
      isFavorite: true,
      isPopular: false,
      available: true,
    },
    {
      id: 3,
      name: "Chocolate Cake",
      category: "Dessert",
      price: 6000,
      description: "Rich chocolate cake with ganache",
      image: "/api/placeholder/300/200",
      rating: 4.9,
      prepTime: 15,
      calories: 450,
      allergens: ["Gluten", "Dairy", "Eggs"],
      isFavorite: false,
      isPopular: true,
      available: true,
    },
    {
      id: 4,
      name: "Coca Cola",
      category: "Beverage",
      price: 2000,
      description: "Refreshing cola drink",
      image: "/api/placeholder/300/200",
      rating: 4.2,
      prepTime: 2,
      calories: 140,
      allergens: ["None"],
      isFavorite: false,
      isPopular: false,
      available: true,
    },
  ];

  const categories = [
    "All",
    "Main Course",
    "Salad",
    "Dessert",
    "Beverage",
    "Alcohol",
  ];
  const orderTypes = [
    { id: "dine_in", name: "Dine In", icon: Utensils },
    { id: "takeaway", name: "Takeaway", icon: ShoppingBag },
    { id: "delivery", name: "Delivery", icon: MapPin },
  ];

  const loyaltyPoints = 1250;
  const loyaltyTier = "Gold";
  const nextTierPoints = 500;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Main Course":
        return <Utensils className="w-4 h-4" />;
      case "Salad":
        return <Utensils className="w-4 h-4" />;
      case "Dessert":
        return <IceCream className="w-4 h-4" />;
      case "Beverage":
        return <Coffee className="w-4 h-4" />;
      case "Alcohol":
        return <Wine className="w-4 h-4" />;
      default:
        return <Utensils className="w-4 h-4" />;
    }
  };

  const addToCart = (item: any) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(
        cart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
      );
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const order = {
      id: `ORD-${Date.now()}`,
      restaurant: selectedRestaurant,
      type: orderType,
      items: cart,
      total: getTotalAmount(),
      timestamp: new Date().toISOString(),
      status: "pending",
    };

    // Placing order
    setCart([]);
  };

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeTab === "menu" ||
      activeTab === "All" ||
      item.category === activeTab;
    return matchesSearch && matchesCategory && item.available;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Self-Service Ordering
          </h1>
          <p className="text-text-secondary">
            Browse menu, place orders, and earn loyalty points
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
            className="px-3 py-2 border border-border-primary rounded-lg text-sm"
          >
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Order Type Selection */}
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Order Type
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {orderTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setOrderType(type.id)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                orderType === type.id
                  ? "border-brand bg-brand/5"
                  : "border-border-primary hover:border-brand/50"
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-surface-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
                  <type.icon className="w-6 h-6 text-text-primary" />
                </div>
                <p className="font-medium text-text-primary">{type.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Loyalty Points Banner */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Loyalty Program</h3>
              <p className="text-yellow-100">You have {loyaltyPoints} points</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-yellow-100">
              Current Tier: {loyaltyTier}
            </p>
            <p className="text-sm text-yellow-100">
              {nextTierPoints} points to next tier
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Tabs */}
          <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Menu Items
              </h3>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-sm border border-border-primary rounded px-3 py-1"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    activeTab === category
                      ? "bg-brand text-white"
                      : "bg-surface-secondary text-text-secondary hover:bg-surface-card"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-lg border border-border-primary"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-20 h-20 bg-surface-secondary rounded-lg flex items-center justify-center">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-text-primary">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-1">
                          {item.isPopular && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              Popular
                            </span>
                          )}
                          <button className="p-1 text-text-secondary hover:text-red-500">
                            <Heart
                              className={`w-4 h-4 ${
                                item.isFavorite
                                  ? "fill-current text-red-500"
                                  : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          {item.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.prepTime} min
                        </span>
                        <span>{item.calories} cal</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-brand">
                          {formatCurrency(item.price)}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-3 py-1 bg-brand text-white text-sm rounded hover:bg-brand-dark transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Section */}
        <div className="space-y-6">
          {/* Cart Summary */}
          <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Order Cart
              </h3>
              <span className="px-2 py-1 bg-brand text-white text-xs rounded-full">
                {getTotalItems()} items
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-text-secondary">Your cart is empty</p>
                <p className="text-sm text-text-secondary">
                  Add items from the menu
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white rounded-lg border border-border-primary"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-text-primary">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 bg-surface-secondary rounded flex items-center justify-center hover:bg-surface-card"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 bg-surface-secondary rounded flex items-center justify-center hover:bg-surface-card"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-medium text-brand">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border-primary">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-text-primary">
                    Total
                  </span>
                  <span className="text-xl font-bold text-brand">
                    {formatCurrency(getTotalAmount())}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-800">
                        Earn {Math.floor(getTotalAmount() / 1000)} loyalty
                        points
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors">
                <Heart className="w-5 h-5 text-brand" />
                <span className="text-text-primary">View Favorites</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors">
                <Trophy className="w-5 h-5 text-brand" />
                <span className="text-text-primary">Loyalty Rewards</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors">
                <Share2 className="w-5 h-5 text-brand" />
                <span className="text-text-primary">Share Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
