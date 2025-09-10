import React, { useState, useMemo } from "react";
import { useOwnerDashboard } from "./context";
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
  Users,
  Menu,
  Camera,
  CheckCircle,
  AlertCircle,
  XCircle,
  Building2,
  Settings,
  Eye,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Business {
  id: string;
  name: string;
  location: string;
  type: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  logo?: string | null;
  status: string;
  revenue: number;
  staffCount: number;
  rating: number;
  createdAt: string;
  address?: string;
  city?: string;
  cuisine?: string;
  priceRange?: string;
  opensAt?: string;
  closesAt?: string;
  capacity?: number;
  acceptsReservations?: boolean;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  availability: string;
  photo?: string | null;
  ingredients: string;
  allergens: string;
  preparationTime: string;
  calories: string;
  restaurantId: string;
  status?: string;
  createdAt: string;
}

export default function Businesses() {
  const { addNotification } = useOwnerDashboard();
  const [activeTab, setActiveTab] = useState("businesses");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<any>(null);
  const [editingMenu, setEditingMenu] = useState<any>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Business | null>(
    null
  );
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);

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
    cuisine: "",
    address: "",
    city: "",
    opensAt: "08:00",
    closesAt: "22:00",
    capacity: 50,
    priceRange: "$$",
    acceptsReservations: true,
    paymentMethods: ["Cash", "Card", "Mobile Money"],
    amenities: ["WiFi", "Parking", "Outdoor Seating"],
    tags: ["Dine-in", "Delivery"],
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
  const businesses: Business[] = [
    {
      id: "1",
      name: "La Casa Italiana",
      location: "Kigali, Rwanda",
      type: "restaurant",
      phone: "+250 788 123 456",
      email: "info@lacasa.rw",
      website: "www.lacasa.rw",
      description: "Authentic Italian cuisine in the heart of Kigali",
      logo: "/api/placeholder/100/100",
      status: "active",
      revenue: 450000,
      staffCount: 25,
      rating: 4.8,
      createdAt: "2024-01-15",
      address: "KN 4 Ave, Kigali, Rwanda",
      city: "Kigali",
      cuisine: "Italian",
      priceRange: "$$$",
      opensAt: "11:00",
      closesAt: "23:00",
      capacity: 80,
      acceptsReservations: true,
    },
    {
      id: "2",
      name: "Sky Lounge Bar",
      location: "Kigali, Rwanda",
      type: "bar",
      phone: "+250 789 456 789",
      email: "contact@skylounge.rw",
      website: "www.skylounge.rw",
      description: "Premium rooftop bar with city views",
      logo: "/api/placeholder/100/100",
      status: "active",
      revenue: 320000,
      staffCount: 18,
      rating: 4.6,
      createdAt: "2024-02-20",
      address: "KG 123 St, Kigali, Rwanda",
      city: "Kigali",
      cuisine: "International",
      priceRange: "$$$",
      opensAt: "18:00",
      closesAt: "02:00",
      capacity: 60,
      acceptsReservations: true,
    },
    {
      id: "3",
      name: "Urban Coffee Co.",
      location: "Kigali, Rwanda",
      type: "cafe",
      phone: "+250 790 123 456",
      email: "hello@urbancoffee.rw",
      website: "www.urbancoffee.rw",
      description: "Artisanal coffee and light meals",
      logo: "/api/placeholder/100/100",
      status: "active",
      revenue: 180000,
      staffCount: 12,
      rating: 4.4,
      createdAt: "2024-03-10",
      address: "KG 456 Ave, Kigali, Rwanda",
      city: "Kigali",
      cuisine: "Coffee & Light Meals",
      priceRange: "$$",
      opensAt: "06:00",
      closesAt: "20:00",
      capacity: 40,
      acceptsReservations: false,
    },
  ];

  const menuItems: MenuItem[] = [
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
      restaurantId: "3",
      createdAt: "2024-02-20",
    },
  ];

  // Filter data
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesSearch =
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || business.status === statusFilter;
      const matchesType = typeFilter === "all" || business.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [businesses, searchQuery, statusFilter, typeFilter]);

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRestaurant =
        !selectedRestaurant || item.restaurantId === selectedRestaurant.id;
      return matchesSearch && matchesRestaurant;
    });
  }, [menuItems, searchQuery, selectedRestaurant]);

  // Utility functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-3 h-3" />;
      case "inactive":
        return <XCircle className="w-3 h-3" />;
      case "maintenance":
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "restaurant":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "bar":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "cafe":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBusinesses(filteredBusinesses.map((b) => b.id));
    } else {
      setSelectedBusinesses([]);
    }
  };

  const handleSelectBusiness = (businessId: string, checked: boolean) => {
    if (checked) {
      setSelectedBusinesses([...selectedBusinesses, businessId]);
    } else {
      setSelectedBusinesses(
        selectedBusinesses.filter((id) => id !== businessId)
      );
    }
  };

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({
      type: "system",
      title: editingBusiness ? "Business Updated" : "Business Added",
      message: `${businessForm.name} has been ${
        editingBusiness ? "updated" : "added"
      } successfully`,
      priority: "medium",
      actionRequired: false,
    });
    resetBusinessForm();
  };

  const handleMenuSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({
      type: "system",
      title: editingMenu ? "Menu Item Updated" : "Menu Item Added",
      message: `${menuForm.name} has been ${
        editingMenu ? "updated" : "added"
      } successfully`,
      priority: "medium",
      actionRequired: false,
    });
    resetMenuForm();
  };

  const resetBusinessForm = () => {
    setBusinessForm({
      name: "",
      location: "",
      type: "restaurant",
      phone: "",
      email: "",
      website: "",
      description: "",
      logo: null,
      cuisine: "",
      address: "",
      city: "",
      opensAt: "08:00",
      closesAt: "22:00",
      capacity: 50,
      priceRange: "$$",
      acceptsReservations: true,
      paymentMethods: ["Cash", "Card", "Mobile Money"],
      amenities: ["WiFi", "Parking", "Outdoor Seating"],
      tags: ["Dine-in", "Delivery"],
    });
    setShowBusinessModal(false);
    setEditingBusiness(null);
  };

  const resetMenuForm = () => {
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
      type: business.type,
      phone: business.phone,
      email: business.email,
      website: business.website,
      description: business.description,
      logo: null,
      cuisine: business.cuisine || "",
      address: business.address || business.location,
      city: business.city || "",
      opensAt: business.opensAt || "08:00",
      closesAt: business.closesAt || "22:00",
      capacity: business.capacity || 50,
      priceRange: business.priceRange || "$$",
      acceptsReservations: business.acceptsReservations || true,
      paymentMethods: ["Cash", "Card", "Mobile Money"],
      amenities: ["WiFi", "Parking", "Outdoor Seating"],
      tags: ["Dine-in", "Delivery"],
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
    const business = businesses.find((b) => b.id === menu.restaurantId);
    setSelectedRestaurant(business || null);
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
          <h1 className="text-3xl font-bold text-text-primary">Businesses</h1>
          <p className="text-text-secondary mt-1">
            Manage your restaurants, bars, and cafes
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditingBusiness(null);
              resetBusinessForm();
              setShowBusinessModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand to-brand-hover text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Add Business
          </button>
          <button
            onClick={() => {
              setEditingMenu(null);
              resetMenuForm();
              setShowMenuModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-200"
          >
            <Menu className="w-5 h-5" />
            Add Menu Item
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface-card rounded-2xl border border-border-subtle shadow-sm">
        <div className="flex border-b border-border-subtle">
          <button
            onClick={() => setActiveTab("businesses")}
            className={`px-6 py-4 text-sm font-semibold transition-all duration-200 ${
              activeTab === "businesses"
                ? "text-brand border-b-2 border-brand bg-brand/5"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50"
            }`}
          >
            <Building2 className="w-4 h-4 inline mr-2" />
            Businesses ({filteredBusinesses.length})
          </button>
          <button
            onClick={() => setActiveTab("menu")}
            className={`px-6 py-4 text-sm font-semibold transition-all duration-200 ${
              activeTab === "menu"
                ? "text-brand border-b-2 border-brand bg-brand/5"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50"
            }`}
          >
            <Menu className="w-4 h-4 inline mr-2" />
            Menu Items ({filteredMenuItems.length})
          </button>
        </div>

        <div className="p-6">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
              />
            </div>

            <div className="flex gap-3">
              {activeTab === "businesses" && (
                <>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                  >
                    <option value="all">All Types</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="bar">Bar</option>
                    <option value="cafe">Cafe</option>
                  </select>
                </>
              )}

              {activeTab === "menu" && (
                <select
                  value={selectedRestaurant?.id || ""}
                  onChange={(e) => {
                    const business = businesses.find(
                      (b) => b.id === e.target.value
                    );
                    setSelectedRestaurant(business || null);
                  }}
                  className="px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                >
                  <option value="">All Restaurants</option>
                  {businesses.map((business) => (
                    <option key={business.id} value={business.id}>
                      {business.name}
                    </option>
                  ))}
                </select>
              )}

              <button className="flex items-center gap-2 px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary hover:bg-surface-card transition-all duration-200">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Businesses Table */}
          {activeTab === "businesses" && (
            <div className="bg-surface-primary rounded-xl border border-border-subtle overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-secondary/50">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedBusinesses.length ===
                              filteredBusinesses.length &&
                            filteredBusinesses.length > 0
                          }
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="w-4 h-4 text-brand rounded border-border-subtle focus:ring-brand/30"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                        Business
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                        Revenue
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                        Staff
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                        Rating
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-text-secondary">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {filteredBusinesses.map((business) => (
                      <motion.tr
                        key={business.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hover:bg-surface-secondary/30 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedBusinesses.includes(business.id)}
                            onChange={(e) =>
                              handleSelectBusiness(
                                business.id,
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 text-brand rounded border-border-subtle focus:ring-brand/30"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-hover rounded-lg flex items-center justify-center text-white font-bold text-lg">
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
                            <div>
                              <div className="font-semibold text-text-primary">
                                {business.name}
                              </div>
                              <div className="text-sm text-text-muted">
                                ID: {business.id.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <MapPin className="w-4 h-4 text-brand" />
                            <span className="font-medium">
                              {business.location}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(
                              business.type
                            )}`}
                          >
                            {business.type.charAt(0).toUpperCase() +
                              business.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                              business.status
                            )}`}
                          >
                            {getStatusIcon(business.status)}
                            {business.status.charAt(0).toUpperCase() +
                              business.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-text-primary">
                            {formatCurrency(business.revenue)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <Users className="w-4 h-4" />
                            <span className="font-medium">
                              {business.staffCount}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold text-text-primary">
                              {business.rating}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedRestaurant(business);
                                setShowDetailsModal(true);
                              }}
                              className="p-2 text-text-secondary hover:text-brand hover:bg-brand/10 rounded-lg transition-all duration-200 group"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                              onClick={() => handleEditBusiness(business)}
                              className="p-2 text-text-secondary hover:text-blue-600 hover:bg-blue-500/10 rounded-lg transition-all duration-200 group"
                              title="Edit Business"
                            >
                              <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                              onClick={() => handleDeleteBusiness(business.id)}
                              className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
                              title="Delete Business"
                            >
                              <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Menu Items Grid */}
          {activeTab === "menu" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenuItems.map((item) => (
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
                        {item.category.charAt(0).toUpperCase() +
                          item.category.slice(1)}
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
                        onClick={() => handleEditMenu(item)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-brand text-white text-sm rounded-lg hover:bg-brand-hover transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMenu(item.id)}
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
          )}
        </div>
      </div>

      {/* Business Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedRestaurant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-surface-primary rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-border-subtle/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand to-brand-hover rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                    {selectedRestaurant.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      {selectedRestaurant.name}
                    </h3>
                    <p className="text-text-secondary">
                      {selectedRestaurant.type.charAt(0).toUpperCase() +
                        selectedRestaurant.type.slice(1)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-3 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded-full transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
                      <Building2 className="w-5 h-5 text-brand" />
                      Basic Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-brand" />
                        <div>
                          <p className="text-sm text-text-secondary">
                            Location
                          </p>
                          <p className="font-semibold text-text-primary">
                            {selectedRestaurant.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-brand" />
                        <div>
                          <p className="text-sm text-text-secondary">Phone</p>
                          <p className="font-semibold text-text-primary">
                            {selectedRestaurant.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-brand" />
                        <div>
                          <p className="text-sm text-text-secondary">Email</p>
                          <p className="font-semibold text-text-primary">
                            {selectedRestaurant.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-brand" />
                      Performance Metrics
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary font-medium">
                            Revenue
                          </span>
                          <span className="text-2xl font-bold text-green-600">
                            {formatCurrency(selectedRestaurant.revenue)}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary font-medium">
                            Staff Count
                          </span>
                          <span className="text-2xl font-bold text-blue-600">
                            {selectedRestaurant.staffCount}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl border border-purple-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary font-medium">
                            Rating
                          </span>
                          <span className="text-2xl font-bold text-purple-600">
                            {selectedRestaurant.rating} / 5.0
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 px-6 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-xl font-semibold transition-all duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleEditBusiness(selectedRestaurant);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-brand to-brand-hover text-text-inverted rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Edit Business
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Business Modal */}
      <AnimatePresence>
        {showBusinessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowBusinessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-surface-primary rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-border-subtle/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-brand to-brand-hover rounded-xl">
                    <Building2 className="w-6 h-6 text-text-inverted" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      {editingBusiness ? "Edit Business" : "Add New Business"}
                    </h3>
                    <p className="text-text-secondary">
                      {editingBusiness
                        ? "Update business information"
                        : "Create a new business location"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBusinessModal(false)}
                  className="p-3 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded-full transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleBusinessSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-brand" />
                    Basic Information
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={businessForm.name}
                        onChange={(e) =>
                          setBusinessForm({
                            ...businessForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter business name"
                        className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Business Type *
                      </label>
                      <select
                        value={businessForm.type}
                        onChange={(e) =>
                          setBusinessForm({
                            ...businessForm,
                            type: e.target.value,
                          })
                        }
                        required
                        className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      >
                        <option value="restaurant">Restaurant</option>
                        <option value="bar">Bar</option>
                        <option value="cafe">Cafe</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      value={businessForm.description}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe your business..."
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Cuisine Type
                      </label>
                      <input
                        type="text"
                        value={businessForm.cuisine}
                        onChange={(e) =>
                          setBusinessForm({
                            ...businessForm,
                            cuisine: e.target.value,
                          })
                        }
                        placeholder="e.g., Italian, Asian, African"
                        className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Price Range
                      </label>
                      <select
                        value={businessForm.priceRange}
                        onChange={(e) =>
                          setBusinessForm({
                            ...businessForm,
                            priceRange: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      >
                        <option value="$">$ - Budget Friendly</option>
                        <option value="$$">$$ - Moderate</option>
                        <option value="$$$">$$$ - Expensive</option>
                        <option value="$$$$">$$$$ - Very Expensive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand" />
                    Location Information
                  </h4>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Full Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessForm.address}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          address: e.target.value,
                        })
                      }
                      placeholder="Enter full address"
                      className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={businessForm.city}
                        onChange={(e) =>
                          setBusinessForm({
                            ...businessForm,
                            city: e.target.value,
                          })
                        }
                        placeholder="Enter city"
                        className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Location (Display)
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
                        placeholder="e.g., Kigali, Rwanda"
                        className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
                    <Phone className="w-5 h-5 text-brand" />
                    Contact Information
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={businessForm.phone}
                        onChange={(e) =>
                          setBusinessForm({
                            ...businessForm,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+250 7xx xxx xxx"
                        className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={businessForm.email}
                        onChange={(e) =>
                          setBusinessForm({
                            ...businessForm,
                            email: e.target.value,
                          })
                        }
                        placeholder="business@example.com"
                        className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
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
                      placeholder="https://yourwebsite.com"
                      className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
                    <Clock className="w-5 h-5 text-brand" />
                    Operating Hours
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Opening Time
                      </label>
                      <input
                        type="time"
                        value={businessForm.opensAt}
                        onChange={(e) =>
                          setBusinessForm({
                            ...businessForm,
                            opensAt: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Closing Time
                      </label>
                      <input
                        type="time"
                        value={businessForm.closesAt}
                        onChange={(e) =>
                          setBusinessForm({
                            ...businessForm,
                            closesAt: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Settings */}
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
                    <Settings className="w-5 h-5 text-brand" />
                    Business Settings
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Capacity (Seats)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={businessForm.capacity}
                        onChange={(e) =>
                          setBusinessForm({
                            ...businessForm,
                            capacity: parseInt(e.target.value) || 50,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Accepts Reservations
                      </label>
                      <select
                        value={businessForm.acceptsReservations ? "yes" : "no"}
                        onChange={(e) =>
                          setBusinessForm({
                            ...businessForm,
                            acceptsReservations: e.target.value === "yes",
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Business Logo */}
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
                    <Camera className="w-5 h-5 text-brand" />
                    Business Logo
                  </h4>

                  <div className="border-2 border-dashed border-border-subtle rounded-xl p-6 text-center hover:border-brand/50 transition-colors">
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
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      {businessForm.logo ? (
                        <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-brand/20">
                          <img
                            src={URL.createObjectURL(businessForm.logo)}
                            alt="Logo preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 bg-surface-secondary rounded-xl flex items-center justify-center border-2 border-dashed border-border-subtle">
                          <Upload className="w-8 h-8 text-text-muted" />
                        </div>
                      )}
                      <span className="text-sm text-text-secondary font-medium">
                        {businessForm.logo ? "Change Logo" : "Upload Logo"}
                      </span>
                      <span className="text-xs text-text-muted">
                        PNG, JPG up to 2MB
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowBusinessModal(false)}
                    className="flex-1 px-6 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-xl font-semibold transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-brand to-brand-hover text-text-inverted rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    {editingBusiness ? "Update Business" : "Add Business"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Menu Modal */}
      <AnimatePresence>
        {showMenuModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowMenuModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-surface-primary rounded-3xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-border-subtle/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-green-600 to-green-700 rounded-xl">
                    <Menu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      {editingMenu ? "Edit Menu Item" : "Add New Menu Item"}
                    </h3>
                    <p className="text-text-secondary">
                      {editingMenu
                        ? "Update menu item information"
                        : "Create a new menu item"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMenuModal(false)}
                  className="p-3 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded-full transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleMenuSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Restaurant *
                    </label>
                    <select
                      value={selectedRestaurant?.id || ""}
                      onChange={(e) => {
                        const business = businesses.find(
                          (b) => b.id === e.target.value
                        );
                        setSelectedRestaurant(business || null);
                      }}
                      required
                      className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
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
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Category *
                    </label>
                    <select
                      value={menuForm.category}
                      onChange={(e) =>
                        setMenuForm({ ...menuForm, category: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    >
                      <option value="main">Main Course</option>
                      <option value="appetizer">Appetizer</option>
                      <option value="beverage">Beverage</option>
                      <option value="dessert">Dessert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      value={menuForm.name}
                      onChange={(e) =>
                        setMenuForm({ ...menuForm, name: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
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
                      className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
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
                      className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Calories
                    </label>
                    <input
                      type="text"
                      value={menuForm.calories}
                      onChange={(e) =>
                        setMenuForm({ ...menuForm, calories: e.target.value })
                      }
                      placeholder="e.g., 320"
                      className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Availability *
                    </label>
                    <select
                      value={menuForm.availability}
                      onChange={(e) =>
                        setMenuForm({
                          ...menuForm,
                          availability: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    >
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                      <option value="limited">Limited</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Allergens
                    </label>
                    <input
                      type="text"
                      value={menuForm.allergens}
                      onChange={(e) =>
                        setMenuForm({ ...menuForm, allergens: e.target.value })
                      }
                      placeholder="e.g., Fish, Nuts, Dairy"
                      className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Description *
                  </label>
                  <textarea
                    value={menuForm.description}
                    onChange={(e) =>
                      setMenuForm({ ...menuForm, description: e.target.value })
                    }
                    required
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Ingredients
                  </label>
                  <textarea
                    value={menuForm.ingredients}
                    onChange={(e) =>
                      setMenuForm({ ...menuForm, ingredients: e.target.value })
                    }
                    rows={3}
                    placeholder="List ingredients separated by commas"
                    className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Menu Item Photo
                  </label>
                  <div className="border-2 border-dashed border-border-subtle rounded-xl p-6 text-center hover:border-brand/50 transition-colors">
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
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      {menuForm.photo ? (
                        <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-brand/20">
                          <img
                            src={URL.createObjectURL(menuForm.photo)}
                            alt="Menu preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 bg-surface-secondary rounded-xl flex items-center justify-center border-2 border-dashed border-border-subtle">
                          <Camera className="w-8 h-8 text-text-muted" />
                        </div>
                      )}
                      <span className="text-sm text-text-secondary font-medium">
                        {menuForm.photo ? "Change Photo" : "Upload Photo"}
                      </span>
                      <span className="text-xs text-text-muted">
                        PNG, JPG up to 2MB
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowMenuModal(false)}
                    className="flex-1 px-6 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-xl font-semibold transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    {editingMenu ? "Update Menu Item" : "Add Menu Item"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
