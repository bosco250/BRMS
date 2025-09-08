import React, { useState } from "react";
import {
  Plus,
  Minus,
  ShoppingCart,
  Users,
  Clock,
  DollarSign,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Utensils,
  Coffee,
  Wine,
  IceCream,
  RefreshCw,
  Save,
  X,
  Calculator,
  Receipt,
  Printer,
} from "lucide-react";

export default function OrderTaking() {
  const [activeTab, setActiveTab] = useState("menu");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");

  // Mock menu data
  const menuItems = [
    {
      id: 1,
      name: "Grilled Chicken",
      category: "Main Course",
      price: 15000,
      description: "Tender grilled chicken with herbs and spices",
      image: "/api/placeholder/300/200",
      available: true,
      prepTime: 20,
      allergens: ["None"],
      calories: 350,
    },
    {
      id: 2,
      name: "Caesar Salad",
      category: "Salad",
      price: 8000,
      description: "Fresh romaine lettuce with caesar dressing",
      image: "/api/placeholder/300/200",
      available: true,
      prepTime: 10,
      allergens: ["Dairy", "Gluten"],
      calories: 250,
    },
    {
      id: 3,
      name: "Chocolate Cake",
      category: "Dessert",
      price: 6000,
      description: "Rich chocolate cake with ganache",
      image: "/api/placeholder/300/200",
      available: false,
      prepTime: 30,
      allergens: ["Gluten", "Dairy", "Eggs"],
      calories: 450,
    },
    {
      id: 4,
      name: "Coca Cola",
      category: "Beverage",
      price: 2000,
      description: "Refreshing cola drink",
      image: "/api/placeholder/300/200",
      available: true,
      prepTime: 2,
      allergens: ["None"],
      calories: 140,
    },
    {
      id: 5,
      name: "Red Wine",
      category: "Alcohol",
      price: 12000,
      description: "Premium red wine",
      image: "/api/placeholder/300/200",
      available: true,
      prepTime: 5,
      allergens: ["Sulfites"],
      calories: 120,
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
  const tables = [
    { id: 1, number: 1, status: "available", capacity: 4 },
    { id: 2, number: 2, status: "occupied", capacity: 2 },
    { id: 3, number: 3, status: "available", capacity: 6 },
    { id: 4, number: 4, status: "reserved", capacity: 4 },
    { id: 5, number: 5, status: "available", capacity: 2 },
  ];

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

  const getTableStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "occupied":
        return "bg-blue-100 text-blue-800";
      case "reserved":
        return "bg-yellow-100 text-yellow-800";
      case "cleaning":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    if (!selectedTable || cart.length === 0) return;

    const order = {
      id: `ORD-${Date.now()}`,
      table: selectedTable,
      items: cart,
      total: getTotalAmount(),
      notes: orderNotes,
      timestamp: new Date().toISOString(),
      status: "pending",
    };

    // Placing order
    setCart([]);
    setOrderNotes("");
    setSelectedTable("");
    setShowOrderModal(false);
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
          <h1 className="text-2xl font-bold text-text-primary">Order Taking</h1>
          <p className="text-text-secondary">
            Take orders, manage cart, and process transactions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh Menu
          </button>
        </div>
      </div>

      {/* Table Selection */}
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Select Table
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {tables.map((table) => (
            <button
              key={table.id}
              onClick={() => setSelectedTable(table.number.toString())}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedTable === table.number.toString()
                  ? "border-brand bg-brand/5"
                  : "border-border-primary hover:border-brand/50"
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-surface-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-text-primary" />
                </div>
                <p className="font-medium text-text-primary">
                  Table {table.number}
                </p>
                <p className="text-sm text-text-secondary">
                  Capacity: {table.capacity}
                </p>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${getTableStatusColor(
                    table.status
                  )}`}
                >
                  {table.status}
                </span>
              </div>
            </button>
          ))}
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
                    <div className="w-16 h-16 bg-surface-secondary rounded-lg flex items-center justify-center">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-text-primary">
                          {item.name}
                        </h4>
                        <span className="text-sm font-medium text-brand">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.prepTime} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Calculator className="w-3 h-3" />
                          {item.calories} cal
                        </span>
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full px-3 py-2 bg-brand text-white text-sm rounded hover:bg-brand-dark transition-colors"
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
                        <Trash2 className="w-4 h-4" />
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
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Add order notes..."
                    className="w-full p-3 border border-border-primary rounded-lg text-sm resize-none"
                    rows={3}
                  />

                  <button
                    onClick={() => setShowOrderModal(true)}
                    disabled={!selectedTable}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
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
                <Receipt className="w-5 h-5 text-brand" />
                <span className="text-text-primary">Print Receipt</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors">
                <Calculator className="w-5 h-5 text-brand" />
                <span className="text-text-primary">Calculate Split</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors">
                <Printer className="w-5 h-5 text-brand" />
                <span className="text-text-primary">Print Kitchen Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Confirm Order
              </h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-1 text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-secondary">
                  Table: {selectedTable}
                </p>
                <p className="text-sm text-text-secondary">
                  Items: {getTotalItems()}
                </p>
                <p className="text-sm text-text-secondary">
                  Total: {formatCurrency(getTotalAmount())}
                </p>
              </div>

              {orderNotes && (
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Notes:
                  </p>
                  <p className="text-sm text-text-secondary">{orderNotes}</p>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 px-4 py-2 border border-border-primary text-text-primary rounded-lg hover:bg-surface-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
