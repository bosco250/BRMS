import React, { useState, useMemo } from "react";
import { useManagerDashboard } from "./context";
import {
  Utensils,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  MoreVertical,
  Tag,
  DollarSign,
  Package,
  AlertTriangle,
  CheckCircle,
  X,
  Save,
  XCircle,
  Image as ImageIcon,
  Star,
  Clock,
  Users,
} from "lucide-react";

export default function MenuManagement() {
  const { staff, inventory } = useManagerDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Mock menu data (in real app, this would come from context/API)
  const menuItems = useMemo(
    () => [
      {
        id: 1,
        name: "Grilled Chicken Breast",
        description:
          "Tender grilled chicken breast with herbs and garlic, served with seasonal vegetables",
        category: "Main Course",
        price: 18990,
        cost: 8500,
        status: "active",
        image: null,
        preparationTime: 20,
        allergens: ["None"],
        dietary: ["High Protein", "Low Carb"],
        popularity: 4.8,
        orderCount: 156,
        inStock: true,
        ingredients: ["Chicken breast", "Herbs", "Garlic", "Vegetables"],
        nutrition: {
          calories: 320,
          protein: 35,
          carbs: 8,
          fat: 18,
        },
      },
      {
        id: 2,
        name: "Caesar Salad",
        description:
          "Fresh romaine lettuce with Caesar dressing, parmesan cheese, and croutons",
        category: "Appetizer",
        price: 12990,
        cost: 4500,
        status: "active",
        image: null,
        preparationTime: 10,
        allergens: ["Dairy", "Gluten"],
        dietary: ["Vegetarian"],
        popularity: 4.2,
        orderCount: 89,
        inStock: true,
        ingredients: [
          "Romaine lettuce",
          "Caesar dressing",
          "Parmesan",
          "Croutons",
        ],
        nutrition: {
          calories: 180,
          protein: 8,
          carbs: 12,
          fat: 14,
        },
      },
      {
        id: 3,
        name: "Fresh Coffee",
        description: "Freshly brewed coffee from local Rwandan beans",
        category: "Beverages",
        price: 3990,
        cost: 800,
        status: "active",
        image: null,
        preparationTime: 5,
        allergens: ["None"],
        dietary: ["Vegan", "Gluten Free"],
        popularity: 4.8,
        orderCount: 234,
        inStock: true,
        ingredients: ["Coffee beans", "Water"],
        nutrition: {
          calories: 5,
          protein: 0,
          carbs: 1,
          fat: 0,
        },
      },
      {
        id: 4,
        name: "Premium Red Wine",
        description: "Premium red wine from South African vineyards",
        category: "Alcoholic Beverages",
        price: 25990,
        cost: 12000,
        status: "active",
        image: null,
        preparationTime: 2,
        allergens: ["Sulfites"],
        dietary: ["Vegan", "Gluten Free"],
        popularity: 4.6,
        orderCount: 67,
        inStock: true,
        ingredients: ["Red wine"],
        nutrition: {
          calories: 125,
          protein: 0,
          carbs: 4,
          fat: 0,
        },
      },
      {
        id: 5,
        name: "Chocolate Cake",
        description:
          "Rich chocolate layer cake with chocolate ganache frosting",
        category: "Desserts",
        price: 8990,
        cost: 3200,
        status: "active",
        image: null,
        preparationTime: 15,
        allergens: ["Eggs", "Dairy", "Gluten"],
        dietary: ["Vegetarian"],
        popularity: 4.9,
        orderCount: 123,
        inStock: true,
        ingredients: ["Chocolate", "Flour", "Eggs", "Butter", "Sugar"],
        nutrition: {
          calories: 420,
          protein: 6,
          carbs: 58,
          fat: 22,
        },
      },
    ],
    []
  );

  // Filter menu items
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [menuItems, searchQuery, categoryFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Main Course":
        return "bg-blue-100 text-blue-800";
      case "Appetizer":
        return "bg-green-100 text-green-800";
      case "Beverages":
        return "bg-purple-100 text-purple-800";
      case "Alcoholic Beverages":
        return "bg-red-100 text-red-800";
      case "Desserts":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getMenuStats = () => {
    const totalItems = menuItems.length;
    const activeItems = menuItems.filter(
      (item) => item.status === "active"
    ).length;
    const totalRevenue = menuItems.reduce(
      (sum, item) => sum + item.price * item.orderCount,
      0
    );
    const averagePrice =
      menuItems.reduce((sum, item) => sum + item.price, 0) / totalItems;

    return { totalItems, activeItems, totalRevenue, averagePrice };
  };

  const stats = getMenuStats();

  const categories = [
    "Main Course",
    "Appetizer",
    "Beverages",
    "Alcoholic Beverages",
    "Desserts",
  ];

  const handleAddItem = () => {
    setEditingItem({
      name: "",
      description: "",
      category: "Main Course",
      price: 0,
      cost: 0,
      status: "active",
      preparationTime: 15,
      allergens: [],
      dietary: [],
      ingredients: [],
      nutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    });
    setShowAddItem(true);
  };

  const handleEditItem = (item: any) => {
    setEditingItem({ ...item });
    setShowEditItem(true);
  };

  const handleSaveItem = () => {
    // In a real app, this would save to the backend
    if (showAddItem) {
      // Add new item logic
      setShowAddItem(false);
    } else {
      // Update existing item logic
      setShowEditItem(false);
    }
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Menu Management
          </h1>
          <p className="text-text-secondary">
            Manage menu items, categories, and pricing
          </p>
        </div>
        <button
          onClick={handleAddItem}
          className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Menu Item</span>
        </button>
      </div>

      {/* Menu Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Items</p>
              <p className="text-2xl font-bold text-text-primary">
                {stats.totalItems}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Utensils className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active Items</p>
              <p className="text-2xl font-bold text-text-primary">
                {stats.activeItems}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {((stats.activeItems / stats.totalItems) * 100).toFixed(1)}% of
                total
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Average Price</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(Math.round(stats.averagePrice))}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Tag className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-dashboard border border-border-primary rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search menu items by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenuItems.map((item) => (
          <div
            key={item.id}
            className="bg-dashboard border border-border-primary rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Item Image */}
            <div className="h-48 bg-surface-secondary flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-16 h-16 text-text-secondary mx-auto mb-2" />
                  <p className="text-sm text-text-secondary">No Image</p>
                </div>
              )}
            </div>

            {/* Item Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-text-primary">
                  {item.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-text-secondary">
                    {item.popularity}
                  </span>
                </div>
              </div>

              <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {item.category}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-bold text-text-primary">
                  {formatCurrency(item.price)}
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Clock className="w-4 h-4" />
                  <span>{item.preparationTime} min</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-text-secondary">
                  Cost: {formatCurrency(item.cost)}
                </div>
                <div className="text-sm text-text-secondary">
                  Orders: {item.orderCount}
                </div>
              </div>

              {/* Allergens and Dietary */}
              <div className="mb-4">
                {item.allergens.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs text-text-secondary mb-1">
                      Allergens:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.allergens.map((allergen, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {item.dietary.length > 0 && (
                  <div>
                    <p className="text-xs text-text-secondary mb-1">Dietary:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.dietary.map((diet, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border-primary">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-text-secondary hover:text-text-primary transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-text-secondary hover:text-text-primary transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <button className="text-red-500 hover:text-red-700 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Item Modal */}
      {(showAddItem || showEditItem) && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dashboard rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">
                {showAddItem ? "Add Menu Item" : "Edit Menu Item"}
              </h2>
              <button
                onClick={() => {
                  setShowAddItem(false);
                  setShowEditItem(false);
                  setEditingItem(null);
                }}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Price (RWF)
                  </label>
                  <input
                    type="number"
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        price: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Cost (RWF)
                  </label>
                  <input
                    type="number"
                    value={editingItem.cost}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        cost: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Preparation Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={editingItem.preparationTime}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        preparationTime: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Status
                  </label>
                  <select
                    value={editingItem.status}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Description
                </label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-border-primary">
              <button
                onClick={() => {
                  setShowAddItem(false);
                  setShowEditItem(false);
                  setEditingItem(null);
                }}
                className="px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveItem}
                className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Item</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
