import { useState } from "react";
import {
  User,
  Camera,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  Edit3,
  Save,
  X,
  Plus,
  Check,
  Shield,
  Heart,
  Settings,
} from "lucide-react";
import { useCustomerDashboard } from "./context";
import { getSessionUser } from "../../../auth/session";
import { toast } from "react-toastify";

export default function AccountProfile() {
  const { customer, setCustomer } = useCustomerDashboard();
  const sessionUser = getSessionUser();
  const [isEditing, setIsEditing] = useState(false);
  const [newPreference, setNewPreference] = useState("");
  const [showAddPreference, setShowAddPreference] = useState(false);

  // If no user is logged in, show a message
  if (!sessionUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-primary to-surface-secondary">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-2xl shadow-xl border border-border-primary overflow-hidden">
            <div className="bg-gradient-to-r from-brand to-brand-dark p-8 text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome to BRMS
              </h1>
              <p className="text-brand-light text-lg">
                Please log in to access your profile
              </p>
            </div>
            <div className="p-8 text-center">
              <button
                onClick={() => (window.location.href = "/login")}
                className="bg-brand text-white px-8 py-3 rounded-xl hover:bg-brand-dark transition-all duration-200 border border-brand-dark shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Sign In to Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleAddPreference = () => {
    if (newPreference.trim()) {
      setCustomer((c) => ({
        ...c,
        preferences: [...(c.preferences || []), newPreference.trim()],
      }));
      setNewPreference("");
      setShowAddPreference(false);
      toast.success("Preference added successfully!");
    }
  };

  const handleRemovePreference = (index: number) => {
    setCustomer((c) => ({
      ...c,
      preferences: c.preferences?.filter((_, i) => i !== index) || [],
    }));
    toast.success("Preference removed successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-primary to-surface-secondary">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-border-primary overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-brand to-brand-dark p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30">
                    {customer.avatar ? (
                      <img
                        src={customer.avatar}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <button className="absolute -bottom-2 -right-2 bg-white text-brand p-2 rounded-full shadow-lg hover:bg-brand/10 transition-colors border border-brand/20">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {customer.name || "Loading..."}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-300" />
                      <span className="text-white font-medium">
                        {customer.tier} Member
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                      <Heart className="w-4 h-4 text-pink-300" />
                      <span className="text-white">
                        {customer.loyaltyPoints} Points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-brand px-6 py-3 rounded-xl hover:bg-brand/10 transition-all duration-200 border border-white/20 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? "Cancel Edit" : "Edit Profile"}</span>
              </button>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-blue-600 font-medium">Email</p>
                <p className="text-xs text-blue-500 mt-1">{customer.email}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-green-600 font-medium">Phone</p>
                <p className="text-xs text-green-500 mt-1">
                  {customer.phone || "Not provided"}
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-purple-600 font-medium">
                  Member Since
                </p>
                <p className="text-xs text-purple-500 mt-1">
                  {customer.joinDate
                    ? new Date(customer.joinDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-orange-600 font-medium">Location</p>
                <p className="text-xs text-orange-500 mt-1">Kigali, Rwanda</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-border-primary overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-border-primary">
                <h2 className="text-xl font-bold text-text-primary flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Personal Information</span>
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-text-secondary">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={customer.name || ""}
                      onChange={(e) =>
                        setCustomer((c) => ({ ...c, name: e.target.value }))
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-border-primary rounded-xl bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all duration-200 disabled:bg-surface-secondary disabled:text-text-muted"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-text-secondary">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={customer.email || ""}
                      onChange={(e) =>
                        setCustomer((c) => ({ ...c, email: e.target.value }))
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-border-primary rounded-xl bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all duration-200 disabled:bg-surface-secondary disabled:text-text-muted"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-text-secondary">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={customer.phone || ""}
                      onChange={(e) =>
                        setCustomer((c) => ({ ...c, phone: e.target.value }))
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-border-primary rounded-xl bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all duration-200 disabled:bg-surface-secondary disabled:text-text-muted"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-text-secondary">
                      Member Since
                    </label>
                    <input
                      type="text"
                      value={
                        customer.joinDate
                          ? new Date(customer.joinDate).toLocaleDateString()
                          : "Loading..."
                      }
                      disabled
                      className="w-full px-4 py-3 border border-border-primary rounded-xl bg-surface-secondary text-text-muted"
                    />
                  </div>
                </div>

                {/* Dietary Preferences */}
                <div className="mt-8">
                  <label className="block text-sm font-semibold text-text-secondary mb-4">
                    Dietary Preferences & Allergies
                  </label>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {customer.preferences &&
                      customer.preferences.length > 0 ? (
                        customer.preferences.map((pref, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 bg-gradient-to-r from-accent/10 to-accent/5 text-accent px-4 py-2 rounded-full text-sm border border-accent/20"
                          >
                            <span>{pref}</span>
                            {isEditing && (
                              <button
                                onClick={() => handleRemovePreference(index)}
                                className="text-accent/60 hover:text-accent transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        ))
                      ) : (
                        <span className="text-text-secondary text-sm italic">
                          No dietary preferences set
                        </span>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex items-center space-x-2">
                        {showAddPreference ? (
                          <div className="flex items-center space-x-2 flex-1">
                            <input
                              type="text"
                              value={newPreference}
                              onChange={(e) => setNewPreference(e.target.value)}
                              placeholder="Add dietary preference..."
                              className="flex-1 px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleAddPreference()
                              }
                            />
                            <button
                              onClick={handleAddPreference}
                              className="bg-brand text-white p-2 rounded-lg hover:bg-brand-dark transition-colors"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setShowAddPreference(false);
                                setNewPreference("");
                              }}
                              className="bg-surface-secondary text-text-primary p-2 rounded-lg hover:bg-surface-card transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowAddPreference(true)}
                            className="flex items-center space-x-2 bg-surface-secondary text-brand px-4 py-2 rounded-lg hover:bg-brand/10 transition-colors border border-brand/20"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Preference</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-border-primary">
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 bg-surface-secondary text-text-primary rounded-xl hover:bg-surface-card transition-all duration-200 border border-border-secondary hover:border-border-primary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-brand text-white rounded-xl hover:bg-brand-dark transition-all duration-200 border border-brand-dark shadow-lg hover:shadow-xl flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Security */}
            <div className="bg-white rounded-2xl shadow-xl border border-border-primary overflow-hidden">
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 border-b border-red-200">
                <h3 className="text-lg font-bold text-red-800 flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Account Security</span>
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <button className="w-full text-left p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors border border-border-secondary">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-primary">
                      Change Password
                    </span>
                    <Settings className="w-4 h-4 text-text-secondary" />
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors border border-border-secondary">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-primary">
                      Two-Factor Authentication
                    </span>
                    <Settings className="w-4 h-4 text-text-secondary" />
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors border border-border-secondary">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-primary">
                      Login Activity
                    </span>
                    <Settings className="w-4 h-4 text-text-secondary" />
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl border border-border-primary overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-blue-200">
                <h3 className="text-lg font-bold text-blue-800 flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Account Stats</span>
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                  <span className="text-sm font-medium text-yellow-800">
                    Loyalty Points
                  </span>
                  <span className="text-lg font-bold text-yellow-600">
                    {customer.loyaltyPoints}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-green-800">
                    Total Orders
                  </span>
                  <span className="text-lg font-bold text-green-600">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <span className="text-sm font-medium text-purple-800">
                    Member Level
                  </span>
                  <span className="text-lg font-bold text-purple-600">
                    {customer.tier}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
