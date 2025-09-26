import React, { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { Plus, Search, Menu, Building2, Filter, RefreshCw } from "lucide-react";

import { useOwnerDashboard } from "./context";
import uploadImage from "../../../services/imageUpload";
import {
  registerBusiness,
  canCreateBusiness,
  getUserBusinesses,
  type UserBusiness,
} from "./apiServises";
import type { RegisterBusinessPayload } from "./apiServises";
import { getSessionUser } from "../../../auth/session";

import type {
  Business,
  MenuItem,
  BusinessFormData,
  MenuFormData,
} from "../../../types/business";
// import { mockBusinesses, mockMenuItems } from "../../../data/mockBusinessData"; // Removed - using API data
import BusinessTable from "./business/BusinessTable";
import MenuGrid from "./business/MenuGrid";
import BusinessModal from "./business/BusinessModal";
import MenuModal from "./business/MenuModal";
import BusinessDetailsModal from "./business/BusinessDetailsModal";

// import { getSessionUser } from "../../../auth/session";

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
  const [submittingBusiness, setSubmittingBusiness] = useState(false);
  const [submittingMenu, setSubmittingMenu] = useState(false);

  // API data states
  const [userBusinesses, setUserBusinesses] = useState<UserBusiness[]>([]);
  const [loadingBusinesses, setLoadingBusinesses] = useState(false);
  const [businessesError, setBusinessesError] = useState<string>("");
  // const [businessMenus, setBusinessMenus] = useState<Record<string, any[]>>({}); // For future menu API integration
  // const [loadingMenus, setLoadingMenus] = useState<Record<string, boolean>>({}); // Unused for now

  // Fetch user businesses
  const fetchUserBusinesses = async () => {
    const user = getSessionUser();
    if (!user?.id) {
      setBusinessesError("User not authenticated");
      return;
    }

    setLoadingBusinesses(true);
    setBusinessesError("");

    try {
      const response = await getUserBusinesses(user.id);

      if (response.success && response.data) {

        setUserBusinesses(response.data);
        addNotification({
          type: "restaurant",
          title: "Businesses Loaded",
          message: `Found ${response.data.length} businesses`,
          priority: "low",
          actionRequired: false,
        });
      } else {
        console.error("❌ Failed to fetch businesses:", response.error);
        setBusinessesError(response.error || "Failed to load businesses");
        toast.error(response.error || "Failed to load businesses");
      }
    } catch (error) {
      const errorMessage = "Failed to load businesses";
      setBusinessesError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoadingBusinesses(false);
    }
  };

  // Load businesses on component mount
  useEffect(() => {
    fetchUserBusinesses();
  }, []);

  // Form states
  const [businessForm, setBusinessForm] = useState<BusinessFormData>({
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
    tags: ["Dine-in", "Take-away", "Delivery"],
  });

  const [menuForm, setMenuForm] = useState<MenuFormData>({
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

  // Convert API data to component format
  const businesses = useMemo(() => {
    const converted = userBusinesses.map((business) => ({
      id: business.id,
      name: business.name || "",
      location: business.address || "",
      type: (business.type || "restaurant").toLowerCase() as
        | "restaurant"
        | "bar"
        | "cafe",
      status: business.openNow
        ? "active"
        : ("inactive" as "active" | "inactive" | "maintenance"),
      revenue: 0, // Not provided in API
      staffCount: 0, // Not provided in API
      rating: typeof business.rating === "number" ? business.rating : 0,
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString(), // Add missing field
      // Additional API fields
      cuisine: business.cuisine || "",
      city: business.city || "",
      phone: business.phone || "",
      email: business.email || "",
      website: business.website || "",
      description: business.description || "",
      capacity: business.capacity ?? 0,
      acceptsReservations: business.acceptsReservations,
      paymentMethods: business.paymentMethods || [],
      amenities: business.amenities || [],
      tags: business.tags || [],
      image: business.image || "",
      averageWaitTime: business.averageWaitTime || "",
      priceRange: business.priceRange || "",
      owners: business.owners || [],
      menu: business.menu || [],
    }));

    return converted;
  }, [userBusinesses]);

  // Get all menu items from all businesses
  const allMenuItems = useMemo(() => {
    return (userBusinesses || []).flatMap((business) =>
      (business.menu ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category || "Main Course",
        availability: item.available ? "available" : "unavailable",
        photo: null,
        ingredients: "",
        allergens: "",
        preparationTime: "",
        calories: "",
        restaurantId: business.id,
        status: "active",
        createdAt: new Date().toISOString(),
        // Additional fields
        restaurantName: business.name || "",
        available: item.available,
      }))
    );
  }, [userBusinesses]);

  // Filter data
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const name = (business.name || "").toLowerCase();
      const location = (business.location || "").toLowerCase();
      const type = (business.type || "").toLowerCase();
      const cuisine = (business.cuisine || "").toLowerCase();
      const query = (searchQuery || "").toLowerCase();

      const matchesSearch =
        name.includes(query) ||
        location.includes(query) ||
        type.includes(query) ||
        cuisine.includes(query);
      const matchesStatus =
        statusFilter === "all" || business.status === statusFilter;
      const matchesType = typeFilter === "all" || business.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [businesses, searchQuery, statusFilter, typeFilter]);

  const filteredMenuItems = useMemo(() => {
    return allMenuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRestaurant =
        !selectedRestaurant || item.restaurantId === selectedRestaurant.id;
      return matchesSearch && matchesRestaurant;
    });
  }, [allMenuItems, searchQuery, selectedRestaurant]);

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

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmittingBusiness(true);
      let uploadedLogoUrl: string | null = null;
      if (businessForm.logo instanceof File) {
        const { secureUrl } = await uploadImage({
          file: businessForm.logo,
          folder: "business-logos",
        });
        uploadedLogoUrl = secureUrl;
      }

      const payload: RegisterBusinessPayload = {
        business_name: businessForm.name,
        business_type: businessForm.type,
        address: businessForm.address,
        phone: businessForm.phone,
        email: businessForm.email,
        description: businessForm.description,
        cuisine: businessForm.cuisine || undefined,
        website: businessForm.website || undefined,
        accept_reservations: Boolean(businessForm.acceptsReservations),
        business_logo: uploadedLogoUrl || undefined,
        // Additional optional fields you may support later
        // location: businessForm.location,
        // city: businessForm.city,
        // opens_at: businessForm.opensAt,
        // closes_at: businessForm.closesAt,
        // capacity: businessForm.capacity,
        // price_range: businessForm.priceRange,
        // payment_methods: businessForm.paymentMethods,
        // amenities: businessForm.amenities,
        // tags: businessForm.tags,
      };

      // Permission check via api service
      if (!canCreateBusiness()) {
        const msg =
          "You need Admin or Business Owner role to create businesses";
        toast.error(msg);
        addNotification({
          type: "system",
          title: "Unauthorized",
          message: msg,
          priority: "high",
          actionRequired: false,
        });
        return;
      }

      const result = await registerBusiness(payload);

      if (!result.success) {
        const message = result.error || "Could not create business.";
        addNotification({
          type: "system",
          title: "Business Create Failed",
          message,
          priority: "high",
          actionRequired: false,
        });
        toast.error(message);
        if (result.status === 401) {
          window.location.href = "/login";
        }
        return;
      }

      addNotification({
        type: "system",
        title: editingBusiness ? "Business Updated" : "Business Added",
        message: `${businessForm.name} has been ${
          editingBusiness ? "updated" : "added"
        } successfully`,
        priority: "medium",
        actionRequired: false,
      });
      toast.success(result.message || "Business created successfully");

      resetBusinessForm();
    } catch (error: any) {
      console.error("Business logo upload failed:", error?.message || error);
      addNotification({
        type: "system",
        title: "Business Create Failed",
        message:
          error?.message === "Not authenticated. Please log in."
            ? "You must be logged in to create a business."
            : error?.message || "Could not create business. Please try again.",
        priority: "high",
        actionRequired: false,
      });
      toast.error(
        error?.message === "Not authenticated. Please log in."
          ? "You must be logged in to create a business."
          : error?.message || "Could not create business. Please try again."
      );
    } finally {
      setSubmittingBusiness(false);
    }
  };

  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmittingMenu(true);
      let uploadedPhotoUrl: string | null = null;
      if (menuForm.photo instanceof File) {
        const { secureUrl } = await uploadImage({
          file: menuForm.photo,
          folder: "menu-photos",
        });
        uploadedPhotoUrl = secureUrl;
      }

      const payload = {
        restaurantId: selectedRestaurant?.id || null,
        name: menuForm.name,
        description: menuForm.description,
        price: Number(menuForm.price),
        category: menuForm.category,
        availability: menuForm.availability,
        photo: uploadedPhotoUrl,
        ingredients: menuForm.ingredients,
        allergens: menuForm.allergens,
        preparationTime: menuForm.preparationTime,
        calories: menuForm.calories,
      };

      addNotification({
        type: "system",
        title: editingMenu ? "Menu Item Updated" : "Menu Item Added",
        message: `${menuForm.name} has been ${
          editingMenu ? "updated" : "added"
        } successfully`,
        priority: "medium",
        actionRequired: false,
      });
      toast.success("Menu item saved successfully");

      // TODO: send 'payload' to your backend
      resetMenuForm();
    } catch (error: any) {
      console.error("Menu item photo upload failed:", error?.message || error);
      addNotification({
        type: "system",
        title: "Photo Upload Failed",
        message: error?.message || "Could not upload photo. Please try again.",
        priority: "high",
        actionRequired: false,
      });
      toast.error(
        error?.message || "Could not upload photo. Please try again."
      );
    } finally {
      setSubmittingMenu(false);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-surface-primary to-surface-secondary ">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-success/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative space-y-8 p-6">
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
              onClick={fetchUserBusinesses}
              disabled={loadingBusinesses}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                className={`w-5 h-5 ${loadingBusinesses ? "animate-spin" : ""}`}
              />
              {loadingBusinesses ? "Loading..." : "Refresh"}
            </button>
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
              <>
                {loadingBusinesses ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <RefreshCw className="w-8 h-8 animate-spin text-brand mx-auto mb-4" />
                      <p className="text-text-secondary">
                        Loading businesses...
                      </p>
                    </div>
                  </div>
                ) : businessesError ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-error text-2xl">⚠️</span>
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        Failed to load businesses
                      </h3>
                      <p className="text-text-secondary mb-4">
                        {businessesError}
                      </p>
                      <button
                        onClick={fetchUserBusinesses}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-text-inverted rounded-md hover:bg-brand-dark transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                      </button>
                    </div>
                  </div>
                ) : filteredBusinesses.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Building2 className="w-16 h-16 text-text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        No businesses found
                      </h3>
                      <p className="text-text-secondary mb-4">
                        {userBusinesses.length === 0
                          ? "You haven't registered any businesses yet."
                          : "No businesses match your current filters."}
                      </p>
                      {userBusinesses.length === 0 && (
                        <button
                          onClick={() => {
                            setEditingBusiness(null);
                            resetBusinessForm();
                            setShowBusinessModal(true);
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-text-inverted rounded-md hover:bg-brand-dark transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add Your First Business
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <BusinessTable
                    businesses={filteredBusinesses}
                    selectedBusinesses={selectedBusinesses}
                    onSelectAll={handleSelectAll}
                    onSelectBusiness={handleSelectBusiness}
                    onViewDetails={(business) => {
                      setSelectedRestaurant(business);
                      setShowDetailsModal(true);
                    }}
                    onEditBusiness={handleEditBusiness}
                    onDeleteBusiness={handleDeleteBusiness}
                  />
                )}
              </>
            )}

            {/* Menu Items Grid */}
            {activeTab === "menu" && (
              <MenuGrid
                menuItems={filteredMenuItems}
                onEditMenu={handleEditMenu}
                onDeleteMenu={handleDeleteMenu}
              />
            )}
          </div>
        </div>

        {/* Business Details Modal */}
        <BusinessDetailsModal
          isOpen={showDetailsModal}
          business={selectedRestaurant}
          onClose={() => setShowDetailsModal(false)}
          onEdit={handleEditBusiness}
        />

        {/* Add/Edit Business Modal */}
        <BusinessModal
          isOpen={showBusinessModal}
          formData={businessForm}
          onSubmit={handleBusinessSubmit}
          onChange={(data) => setBusinessForm({ ...businessForm, ...data })}
          onClose={() => setShowBusinessModal(false)}
          isSubmitting={submittingBusiness}
          isEditing={!!editingBusiness}
        />

        {/* Add/Edit Menu Modal */}
        <MenuModal
          isOpen={showMenuModal}
          formData={menuForm}
          businesses={businesses}
          selectedRestaurant={selectedRestaurant}
          onSubmit={handleMenuSubmit}
          onChange={(data) => setMenuForm({ ...menuForm, ...data })}
          onRestaurantChange={setSelectedRestaurant}
          onClose={() => setShowMenuModal(false)}
          isSubmitting={submittingMenu}
          isEditing={!!editingMenu}
        />
      </div>
    </div>
  );
}
