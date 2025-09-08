import React, { useState, useMemo } from "react";
import { useOwnerDashboard } from "./context";

interface Business {
  id: string;
  name: string;
  location: string;
  type: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  logo?: string | File | null;
  status: string;
  revenue: number;
  staffCount: number;
  rating: number;
  createdAt: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  availability: string;
  photo?: string | File | null;
  ingredients: string;
  allergens: string;
  preparationTime: string;
  calories: string;
  restaurantId: string;
  status?: string;
  createdAt: string;
}
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Image,
  X,
  Search,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  DollarSign,
  Users,
  Menu,
  Camera,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

export default function BusinessManagement() {
  const { addNotification } = useOwnerDashboard();
  const [activeTab, setActiveTab] = useState("businesses");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<any>(null);
  const [editingMenu, setEditingMenu] = useState<any>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("");

  // Form states
  const [businessForm, setBusinessForm] = useState({
    name: "",
    location: "",
    type: "restaurant",
    phone: "",
    email: "",
    website: "",
    description: "",
    logo: null as File | null,
  });

  const [menuForm, setMenuForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "main",
    availability: "available",
    photo: null as File | null,
    ingredients: "",
    allergens: "",
    preparationTime: "",
    calories: "",
  });

  // Mock data
  const businesses = [
    {
      id: "1",
      name: "Kigali City Restaurant",
      location: "KN 4 Ave, Kigali, Rwanda",
      type: "restaurant",
      phone: "+250 788 123 456",
      email: "info@kigalicity.com",
      website: "www.kigalicity.com",
      description:
        "Fine dining restaurant serving local and international cuisine",
      logo: "/api/placeholder/100/100",
      status: "active",
      revenue: 2500000,
      staffCount: 15,
      rating: 4.5,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Rwanda Coffee House",
      location: "KG 123 St, Kigali, Rwanda",
      type: "cafe",
      phone: "+250 789 456 789",
      email: "contact@rwandacoffee.com",
      website: "www.rwandacoffee.com",
      description: "Premium coffee shop with local Rwandan coffee",
      logo: "/api/placeholder/100/100",
      status: "active",
      revenue: 1200000,
      staffCount: 8,
      rating: 4.2,
      createdAt: "2024-02-20",
    },
  ];

  const menuItems = [
    {
      id: "1",
      name: "Grilled Tilapia",
      description: "Fresh tilapia grilled with local spices",
      price: 4500,
      category: "main",
      availability: "available",
      photo: "/api/placeholder/200/150",
      ingredients: "Tilapia, garlic, ginger, lemon, salt, pepper",
      allergens: "Fish",
      preparationTime: "25 minutes",
      calories: "320",
      restaurantId: "1",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Rwandan Coffee",
      description: "Premium locally sourced coffee beans",
      price: 2000,
      category: "beverage",
      availability: "available",
      photo: "/api/placeholder/200/150",
      ingredients: "Coffee beans, water, sugar (optional)",
      allergens: "None",
      preparationTime: "5 minutes",
      calories: "5",
      restaurantId: "2",
      createdAt: "2024-02-20",
    },
  ];

  // Filter data
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(
      (business) =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [businesses, searchQuery]);

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRestaurant =
        selectedRestaurant === "" || item.restaurantId === selectedRestaurant;
      return matchesSearch && matchesRestaurant;
    });
  }, [menuItems, searchQuery, selectedRestaurant]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "inactive":
        return <XCircle className="w-4 h-4" />;
      case "maintenance":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "restaurant":
        return "bg-blue-100 text-blue-800";
      case "bar":
        return "bg-purple-100 text-purple-800";
      case "cafe":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "main":
        return "bg-green-100 text-green-800";
      case "appetizer":
        return "bg-blue-100 text-blue-800";
      case "beverage":
        return "bg-purple-100 text-purple-800";
      case "dessert":
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

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate business creation/update
    addNotification({
      type: "system",
      title: editingBusiness ? "Business Updated" : "Business Added",
      message: `${businessForm.name} has been ${
        editingBusiness ? "updated" : "added"
      } successfully`,
      priority: "medium",
      actionRequired: false,
    });

    // Reset form
    setBusinessForm({
      name: "",
      location: "",
      type: "restaurant",
      phone: "",
      email: "",
      website: "",
      description: "",
      logo: null,
    });
    setShowBusinessModal(false);
    setEditingBusiness(null);
  };

  const handleMenuSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate menu item creation/update
    addNotification({
      type: "system",
      title: editingMenu ? "Menu Item Updated" : "Menu Item Added",
      message: `${menuForm.name} has been ${
        editingMenu ? "updated" : "added"
      } successfully`,
      priority: "medium",
      actionRequired: false,
    });

    // Reset form
    setMenuForm({
      name: "",
      description: "",
      price: "",
      category: "main",
      availability: "available",
      photo: null,
      ingredients: "",
      allergens: "",
      preparationTime: "",
      calories: "",
    });
    setShowMenuModal(false);
    setEditingMenu(null);
  };

  const handleEditBusiness = (business: Business) => {
    setEditingBusiness(business);
    setBusinessForm({
      name: business.name,
      location: business.location,
      type: "system",
      phone: business.phone,
      email: business.email,
      website: business.website,
      description: business.description,
      logo: null,
    });
    setShowBusinessModal(true);
  };

  const handleEditMenu = (menu: MenuItem) => {
    setEditingMenu(menu);
    setMenuForm({
      name: menu.name,
      description: menu.description,
      price: menu.price.toString(),
      category: menu.category,
      availability: menu.availability,
      photo: null,
      ingredients: menu.ingredients,
      allergens: menu.allergens,
      preparationTime: menu.preparationTime,
      calories: menu.calories,
    });
    setSelectedRestaurant(menu.restaurantId);
    setShowMenuModal(true);
  };

  const handleDeleteBusiness = (_businessId: string) => {
    if (window.confirm("Are you sure you want to delete this business?")) {
      addNotification({
        type: "system",
        title: "Business Deleted",
        message: "Business has been removed successfully",
        priority: "high",
        actionRequired: false,
      });
    }
  };

  const handleDeleteMenu = (_menuId: string) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      addNotification({
        type: "system",
        title: "Menu Item Deleted",
        message: "Menu item has been removed successfully",
        priority: "high",
        actionRequired: false,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Business Management
          </h1>
          <p className="text-text-secondary">
            Manage your businesses and menu items
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingBusiness(null);
              setBusinessForm({
                name: "",
                location: "",
                type: "restaurant",
                phone: "",
                email: "",
                website: "",
                description: "",
                logo: null,
              });
              setShowBusinessModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Business
          </button>
          <button
            onClick={() => {
              setEditingMenu(null);
              setMenuForm({
                name: "",
                description: "",
                price: "",
                category: "main",
                availability: "available",
                photo: null,
                ingredients: "",
                allergens: "",
                preparationTime: "",
                calories: "",
              });
              setShowMenuModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Menu className="w-4 h-4" />
            Add Menu Item
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface-card rounded-lg border border-border">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("businesses")}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "businesses"
                ? "text-brand border-b-2 border-brand bg-brand/5"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Businesses
          </button>
          <button
            onClick={() => setActiveTab("menu")}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "menu"
                ? "text-brand border-b-2 border-brand bg-brand/5"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Menu Items
          </button>
        </div>

        <div className="p-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
            </div>

            {activeTab === "menu" && (
              <select
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
              >
                <option value="">All Restaurants</option>
                {businesses.map((business) => (
                  <option key={business.id} value={business.id}>
                    {business.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Businesses Tab */}
          {activeTab === "businesses" && (
            <div className="space-y-4">
              {filteredBusinesses.map((business) => (
                <div
                  key={business.id}
                  className="bg-surface-secondary rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-brand rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        {business.logo ? (
                          <img
                            src={business.logo}
                            alt={business.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          business.name.charAt(0)
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-text-primary">
                            {business.name}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              business.status
                            )}`}
                          >
                            {getStatusIcon(business.status)}
                            {business.status.charAt(0).toUpperCase() +
                              business.status.slice(1)}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                              business.type
                            )}`}
                          >
                            {business.type.charAt(0).toUpperCase() +
                              business.type.slice(1)}
                          </span>
                        </div>
                        <p className="text-text-secondary mb-3">
                          {business.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-text-secondary" />
                              <span className="text-text-primary">
                                {business.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-text-secondary" />
                              <span className="text-text-primary">
                                {business.phone}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-text-secondary" />
                              <span className="text-text-primary">
                                {business.email}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-text-secondary" />
                              <span className="text-text-primary">
                                {formatCurrency(business.revenue)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-text-secondary" />
                              <span className="text-text-primary">
                                {business.staffCount} staff
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-text-primary">
                                {business.rating}/5.0
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditBusiness(business)}
                        className="p-2 text-text-secondary hover:text-brand transition-colors"
                        title="Edit Business"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBusiness(business.id)}
                        className="p-2 text-text-secondary hover:text-red-500 transition-colors"
                        title="Delete Business"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Menu Items Tab */}
          {activeTab === "menu" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-secondary rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-48 bg-gray-200 relative">
                    {item.photo ? (
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          item.category
                        )}`}
                      >
                        {item.category.charAt(0).toUpperCase() +
                          item.category.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {item.name}
                      </h3>
                      <span className="text-lg font-bold text-brand">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="space-y-2 text-xs text-text-secondary">
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
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => handleEditMenu(item)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-brand text-white text-sm rounded hover:bg-brand-dark transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMenu(item.id)}
                        className="p-2 text-text-secondary hover:text-red-500 transition-colors"
                        title="Delete Menu Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Business Modal */}
      {showBusinessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[80]">
          <div className="bg-surface-card rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-text-primary">
                {editingBusiness ? "Edit Business" : "Add New Business"}
              </h3>
              <button
                onClick={() => setShowBusinessModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleBusinessSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={businessForm.name}
                    onChange={(e) =>
                      setBusinessForm({ ...businessForm, name: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Type *
                  </label>
                  <select
                    value={businessForm.type}
                    onChange={(e) =>
                      setBusinessForm({ ...businessForm, type: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="restaurant">Restaurant</option>
                    <option value="bar">Bar</option>
                    <option value="cafe">Cafe</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={businessForm.location}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        location: e.target.value,
                      })
                    }
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={businessForm.phone}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={businessForm.email}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={businessForm.website}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        website: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Business Logo
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          logo: e.target.files?.[0] || null,
                        })
                      }
                      className="hidden"
                      id="business-logo"
                    />
                    <label
                      htmlFor="business-logo"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      {businessForm.logo ? (
                        <div className="w-20 h-20 rounded-lg overflow-hidden">
                          <img
                            src={URL.createObjectURL(businessForm.logo)}
                            alt="Logo preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <span className="text-sm text-text-secondary">
                        {businessForm.logo ? "Change Logo" : "Upload Logo"}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Description
                  </label>
                  <textarea
                    value={businessForm.description}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBusinessModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-primary hover:bg-surface-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
                >
                  {editingBusiness ? "Update Business" : "Add Business"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Menu Modal */}
      {showMenuModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[80]">
          <div className="bg-surface-card rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-text-primary">
                {editingMenu ? "Edit Menu Item" : "Add New Menu Item"}
              </h3>
              <button
                onClick={() => setShowMenuModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleMenuSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Restaurant *
                  </label>
                  <select
                    value={selectedRestaurant}
                    onChange={(e) => setSelectedRestaurant(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="">Select Restaurant</option>
                    {businesses.map((business) => (
                      <option key={business.id} value={business.id}>
                        {business.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Category *
                  </label>
                  <select
                    value={menuForm.category}
                    onChange={(e) =>
                      setMenuForm({ ...menuForm, category: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="main">Main Course</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="beverage">Beverage</option>
                    <option value="dessert">Dessert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    value={menuForm.name}
                    onChange={(e) =>
                      setMenuForm({ ...menuForm, name: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Price (RWF) *
                  </label>
                  <input
                    type="number"
                    value={menuForm.price}
                    onChange={(e) =>
                      setMenuForm({ ...menuForm, price: e.target.value })
                    }
                    required
                    min="0"
                    step="100"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Preparation Time
                  </label>
                  <input
                    type="text"
                    value={menuForm.preparationTime}
                    onChange={(e) =>
                      setMenuForm({
                        ...menuForm,
                        preparationTime: e.target.value,
                      })
                    }
                    placeholder="e.g., 25 minutes"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Calories
                  </label>
                  <input
                    type="text"
                    value={menuForm.calories}
                    onChange={(e) =>
                      setMenuForm({ ...menuForm, calories: e.target.value })
                    }
                    placeholder="e.g., 320"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Availability *
                  </label>
                  <select
                    value={menuForm.availability}
                    onChange={(e) =>
                      setMenuForm({ ...menuForm, availability: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                    <option value="limited">Limited</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Menu Item Photo
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setMenuForm({
                          ...menuForm,
                          photo: e.target.files?.[0] || null,
                        })
                      }
                      className="hidden"
                      id="menu-photo"
                    />
                    <label
                      htmlFor="menu-photo"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      {menuForm.photo ? (
                        <div className="w-24 h-24 rounded-lg overflow-hidden">
                          <img
                            src={URL.createObjectURL(menuForm.photo)}
                            alt="Menu preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <span className="text-sm text-text-secondary">
                        {menuForm.photo ? "Change Photo" : "Upload Photo"}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Description *
                  </label>
                  <textarea
                    value={menuForm.description}
                    onChange={(e) =>
                      setMenuForm({ ...menuForm, description: e.target.value })
                    }
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Ingredients
                  </label>
                  <textarea
                    value={menuForm.ingredients}
                    onChange={(e) =>
                      setMenuForm({ ...menuForm, ingredients: e.target.value })
                    }
                    rows={3}
                    placeholder="List ingredients separated by commas"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Allergens
                  </label>
                  <input
                    type="text"
                    value={menuForm.allergens}
                    onChange={(e) =>
                      setMenuForm({ ...menuForm, allergens: e.target.value })
                    }
                    placeholder="e.g., Fish, Nuts, Dairy"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMenuModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-primary hover:bg-surface-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
                >
                  {editingMenu ? "Update Menu Item" : "Add Menu Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
