import React, { useState } from "react";
import {
  User,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Globe,
  CreditCard,
  Key,
  Eye,
  EyeOff,
  Save,
  X,
  Edit,
  Building,
  Users,
  Lock,
  Palette,
  BellRing,
  Smartphone,
} from "lucide-react";
import { useOwnerDashboard } from "./context";

export default function Settings() {
  const { owner, addNotification } = useOwnerDashboard();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: SettingsIcon },
    { id: "restaurants", label: "Restaurants", icon: Building },
    { id: "permissions", label: "Permissions", icon: Shield },
    { id: "integrations", label: "Integrations", icon: Database },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const [profileData, setProfileData] = useState({
    name: owner.name,
    email: owner.email,
    phone: owner.phone,
    avatar: owner.avatar,
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "Africa/Kigali",
    currency: "RWF",
    dateFormat: "DD/MM/YYYY",
    theme: "system",
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const [restaurantSettings, setRestaurantSettings] = useState({
    defaultTaxRate: 18,
    serviceCharge: 10,
    deliveryRadius: 15,
    maxTableReservation: 20,
    autoAcceptOrders: false,
    requireApproval: true,
    maintenanceMode: false,
  });

  const [permissions, setPermissions] = useState({
    canManageStaff: true,
    canViewFinancials: true,
    canManageRestaurants: true,
    canViewReports: true,
    canManageSettings: true,
    canExportData: true,
    canManageIntegrations: true,
  });

  const [integrations, setIntegrations] = useState({
    paymentGateway: "mobile_money",
    accountingSoftware: "quickbooks",
    inventorySystem: "custom",
    crmSystem: "none",
    analyticsPlatform: "google_analytics",
    emailService: "sendgrid",
  });

  const handleSaveProfile = () => {
    addNotification({
      type: "system",
      title: "Profile Updated",
      message: "Your profile information has been updated successfully",
      priority: "medium",
      actionRequired: false,
    });
  };

  const handleSavePreferences = () => {
    addNotification({
      type: "system",
      title: "Preferences Saved",
      message: "Your system preferences have been saved",
      priority: "medium",
      actionRequired: false,
    });
  };

  const handleSaveRestaurantSettings = () => {
    addNotification({
      type: "system",
      title: "Restaurant Settings Updated",
      message: "Restaurant settings have been updated successfully",
      priority: "medium",
      actionRequired: false,
    });
  };

  const handleSavePermissions = () => {
    addNotification({
      type: "system",
      title: "Permissions Updated",
      message: "User permissions have been updated",
      priority: "high",
      actionRequired: false,
    });
    setShowPermissionsModal(false);
  };

  const handleSaveIntegrations = () => {
    addNotification({
      type: "system",
      title: "Integrations Updated",
      message: "Integration settings have been updated",
      priority: "medium",
      actionRequired: false,
    });
    setShowIntegrationModal(false);
  };

  const handleChangePassword = () => {
    addNotification({
      type: "system",
      title: "Password Changed",
      message: "Your password has been changed successfully",
      priority: "high",
      actionRequired: false,
    });
    setShowPasswordModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary">
          Configure system settings and preferences
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-surface-card rounded-lg border border-border overflow-hidden">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-brand text-white border-b-2 border-brand"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-surface-card rounded-lg border border-border p-6">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-text-primary">
              Owner Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-white font-medium text-xl">
                    {profileData.name.charAt(0)}
                  </div>
                  <button className="px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors">
                    Change Photo
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-6 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors flex items-center gap-2"
              >
                <Key className="w-4 h-4" />
                Change Password
              </button>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-text-primary">
              System Preferences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Language
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) =>
                    setPreferences({ ...preferences, language: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                >
                  <option value="en">English</option>
                  <option value="rw">Kinyarwanda</option>
                  <option value="fr">French</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Timezone
                </label>
                <select
                  value={preferences.timezone}
                  onChange={(e) =>
                    setPreferences({ ...preferences, timezone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                >
                  <option value="Africa/Kigali">Africa/Kigali (GMT+2)</option>
                  <option value="UTC">UTC (GMT+0)</option>
                  <option value="America/New_York">
                    America/New_York (GMT-5)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Currency
                </label>
                <select
                  value={preferences.currency}
                  onChange={(e) =>
                    setPreferences({ ...preferences, currency: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                >
                  <option value="RWF">RWF (Rwandan Franc)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Theme
                </label>
                <select
                  value={preferences.theme}
                  onChange={(e) =>
                    setPreferences({ ...preferences, theme: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                >
                  <option value="system">System Default</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">
                Notification Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        emailNotifications: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                  />
                  <span className="text-text-primary">Email Notifications</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.smsNotifications}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        smsNotifications: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                  />
                  <span className="text-text-primary">SMS Notifications</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.pushNotifications}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        pushNotifications: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                  />
                  <span className="text-text-primary">Push Notifications</span>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {/* Restaurants Tab */}
        {activeTab === "restaurants" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-text-primary">
              Restaurant Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Default Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={restaurantSettings.defaultTaxRate}
                  onChange={(e) =>
                    setRestaurantSettings({
                      ...restaurantSettings,
                      defaultTaxRate: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Service Charge (%)
                </label>
                <input
                  type="number"
                  value={restaurantSettings.serviceCharge}
                  onChange={(e) =>
                    setRestaurantSettings({
                      ...restaurantSettings,
                      serviceCharge: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Delivery Radius (km)
                </label>
                <input
                  type="number"
                  value={restaurantSettings.deliveryRadius}
                  onChange={(e) =>
                    setRestaurantSettings({
                      ...restaurantSettings,
                      deliveryRadius: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Max Table Reservation
                </label>
                <input
                  type="number"
                  value={restaurantSettings.maxTableReservation}
                  onChange={(e) =>
                    setRestaurantSettings({
                      ...restaurantSettings,
                      maxTableReservation: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">
                Order Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={restaurantSettings.autoAcceptOrders}
                    onChange={(e) =>
                      setRestaurantSettings({
                        ...restaurantSettings,
                        autoAcceptOrders: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                  />
                  <span className="text-text-primary">Auto-accept Orders</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={restaurantSettings.requireApproval}
                    onChange={(e) =>
                      setRestaurantSettings({
                        ...restaurantSettings,
                        requireApproval: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                  />
                  <span className="text-text-primary">
                    Require Order Approval
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSaveRestaurantSettings}
                className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Restaurant Settings
              </button>
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === "permissions" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-text-primary">
              User Permissions
            </h2>

            <div className="bg-surface-secondary p-4 rounded-lg">
              <p className="text-text-secondary mb-4">
                Manage access permissions for different user roles in your
                system.
              </p>
              <button
                onClick={() => setShowPermissionsModal(true)}
                className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Manage Permissions
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">
                  Current Permissions
                </h3>
                {Object.entries(permissions).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg"
                  >
                    <span className="text-text-primary capitalize">
                      {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        value
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {value ? "Allowed" : "Denied"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">
                  Role Overview
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-surface-secondary rounded-lg">
                    <h4 className="font-medium text-text-primary">Owner</h4>
                    <p className="text-sm text-text-secondary">
                      Full system access
                    </p>
                  </div>
                  <div className="p-3 bg-surface-secondary rounded-lg">
                    <h4 className="font-medium text-text-primary">Manager</h4>
                    <p className="text-sm text-text-secondary">
                      Restaurant management access
                    </p>
                  </div>
                  <div className="p-3 bg-surface-secondary rounded-lg">
                    <h4 className="font-medium text-text-primary">Staff</h4>
                    <p className="text-sm text-text-secondary">
                      Limited operational access
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === "integrations" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-text-primary">
              System Integrations
            </h2>

            <div className="bg-surface-secondary p-4 rounded-lg">
              <p className="text-text-secondary mb-4">
                Connect your BRMS with external services and platforms.
              </p>
              <button
                onClick={() => setShowIntegrationModal(true)}
                className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                Configure Integrations
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">
                  Active Integrations
                </h3>
                {Object.entries(integrations).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg"
                  >
                    <span className="text-text-primary capitalize">
                      {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">
                  Integration Status
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <h4 className="font-medium text-green-800">
                      Payment Gateway
                    </h4>
                    <p className="text-sm text-green-600">
                      Connected and active
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <h4 className="font-medium text-yellow-800">
                      Accounting Software
                    </h4>
                    <p className="text-sm text-yellow-600">
                      Connected, sync pending
                    </p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <h4 className="font-medium text-gray-800">CRM System</h4>
                    <p className="text-sm text-gray-600">Not connected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-text-primary">
              Notification Settings
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">
                  Email Notifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                    />
                    <span className="text-text-primary">
                      Order notifications
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                    />
                    <span className="text-text-primary">Financial reports</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                    />
                    <span className="text-text-primary">Staff updates</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                    />
                    <span className="text-text-primary">Marketing alerts</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">
                  SMS Notifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                    />
                    <span className="text-text-primary">Urgent alerts</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                    />
                    <span className="text-text-primary">
                      System maintenance
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">
                  Push Notifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                    />
                    <span className="text-text-primary">Real-time updates</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                    />
                    <span className="text-text-primary">
                      Performance alerts
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Notification Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface-card rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-primary hover:bg-surface-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {showPermissionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface-card rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Manage User Permissions
              </h3>
              <button
                onClick={() => setShowPermissionsModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(permissions).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg"
                >
                  <span className="text-text-primary capitalize">
                    {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                  </span>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        setPermissions({
                          ...permissions,
                          [key]: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                    />
                    <span className="text-text-secondary">Enable</span>
                  </label>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setShowPermissionsModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-text-primary hover:bg-surface-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePermissions}
                className="flex-1 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
              >
                Save Permissions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Integration Modal */}
      {showIntegrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface-card rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Configure Integrations
              </h3>
              <button
                onClick={() => setShowIntegrationModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Payment Gateway
                </label>
                <select
                  value={integrations.paymentGateway}
                  onChange={(e) =>
                    setIntegrations({
                      ...integrations,
                      paymentGateway: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                >
                  <option value="mobile_money">Mobile Money</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Accounting Software
                </label>
                <select
                  value={integrations.accountingSoftware}
                  onChange={(e) =>
                    setIntegrations({
                      ...integrations,
                      accountingSoftware: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                >
                  <option value="quickbooks">QuickBooks</option>
                  <option value="xero">Xero</option>
                  <option value="sage">Sage</option>
                  <option value="custom">Custom Solution</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Analytics Platform
                </label>
                <select
                  value={integrations.analyticsPlatform}
                  onChange={(e) =>
                    setIntegrations({
                      ...integrations,
                      analyticsPlatform: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                >
                  <option value="google_analytics">Google Analytics</option>
                  <option value="mixpanel">Mixpanel</option>
                  <option value="amplitude">Amplitude</option>
                  <option value="custom">Custom Analytics</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setShowIntegrationModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-text-primary hover:bg-surface-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveIntegrations}
                className="flex-1 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
              >
                Save Integrations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
