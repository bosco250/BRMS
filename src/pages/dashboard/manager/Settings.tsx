import React, { useState } from "react";
import { useManagerDashboard } from "./context";
import {
  Settings as SettingsIcon,
  Building2,
  Users,
  Bell,
  Shield,
  Palette,
  Globe,
  Clock,
  Save,
  X,
  Check,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function Settings() {
  const { staff, inventory } = useManagerDashboard();
  const [activeTab, setActiveTab] = useState("general");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Form states
  const [restaurantSettings, setRestaurantSettings] = useState({
    name: "Sample Restaurant",
    address: "123 Main Street, Kigali, Rwanda",
    phone: "+250 123 456 789",
    email: "info@samplerestaurant.com",
    openingHours: {
      monday: { open: "08:00", close: "22:00", closed: false },
      tuesday: { open: "08:00", close: "22:00", closed: false },
      wednesday: { open: "08:00", close: "22:00", closed: false },
      thursday: { open: "08:00", close: "22:00", closed: false },
      friday: { open: "08:00", close: "23:00", closed: false },
      saturday: { open: "09:00", close: "23:00", closed: false },
      sunday: { open: "10:00", close: "21:00", closed: false },
    },
    currency: "RWF",
    timezone: "Africa/Kigali",
    language: "en",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    reservationNotifications: true,
    inventoryAlerts: true,
    staffUpdates: false,
    marketingEmails: false,
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const [staffPermissions, setStaffPermissions] = useState({
    canManageOrders: true,
    canManageInventory: true,
    canManageStaff: false,
    canViewReports: true,
    canManageMenu: true,
    canManageReservations: true,
    canManageSettings: false,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    primaryColor: "#3B82F6",
    accentColor: "#10B981",
    fontSize: "medium",
    compactMode: false,
    showAnimations: true,
  });

  const handleSave = () => {
    // In a real app, this would save to the backend
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const updateOpeningHours = (
    day: string,
    field: string,
    value: string | boolean
  ) => {
    setRestaurantSettings((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day as keyof typeof prev.openingHours],
          [field]: value,
        },
      },
    }));
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateStaffPermission = (key: string, value: boolean) => {
    setStaffPermissions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateAppearanceSetting = (key: string, value: string | boolean) => {
    setAppearanceSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const tabs = [
    { id: "general", label: "General", icon: Building2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "permissions", label: "Permissions", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
          <p className="text-text-secondary">
            Manage restaurant and system settings
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Success Message */}
      {showSaveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
          <Check className="w-5 h-5 text-green-600" />
          <span className="text-green-800">Settings saved successfully!</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-border-primary">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-brand text-brand"
                    : "border-transparent text-text-secondary hover:text-text-primary hover:border-border-primary"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* General Settings */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <div className="bg-dashboard border border-border-primary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Restaurant Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    value={restaurantSettings.name}
                    onChange={(e) =>
                      setRestaurantSettings((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={restaurantSettings.phone}
                    onChange={(e) =>
                      setRestaurantSettings((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={restaurantSettings.address}
                    onChange={(e) =>
                      setRestaurantSettings((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={restaurantSettings.email}
                    onChange={(e) =>
                      setRestaurantSettings((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Currency
                  </label>
                  <select
                    value={restaurantSettings.currency}
                    onChange={(e) =>
                      setRestaurantSettings((prev) => ({
                        ...prev,
                        currency: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    <option value="RWF">RWF - Rwandan Franc</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-dashboard border border-border-primary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Opening Hours
              </h3>
              <div className="space-y-4">
                {Object.entries(restaurantSettings.openingHours).map(
                  ([day, hours]) => (
                    <div key={day} className="flex items-center space-x-4">
                      <div className="w-24">
                        <span className="text-sm font-medium text-text-primary capitalize">
                          {day}
                        </span>
                      </div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={!hours.closed}
                          onChange={(e) =>
                            updateOpeningHours(day, "closed", !e.target.checked)
                          }
                          className="w-4 h-4 text-brand border-border-primary rounded focus:ring-brand"
                        />
                        <span className="text-sm text-text-secondary">
                          Open
                        </span>
                      </label>
                      {!hours.closed && (
                        <>
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) =>
                              updateOpeningHours(day, "open", e.target.value)
                            }
                            className="px-2 py-1 border border-border-primary rounded bg-dashboard text-text-primary"
                          />
                          <span className="text-text-secondary">to</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) =>
                              updateOpeningHours(day, "close", e.target.value)
                            }
                            className="px-2 py-1 border border-border-primary rounded bg-dashboard text-text-primary"
                          />
                        </>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <div className="bg-dashboard border border-border-primary rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">
                      Order Notifications
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Get notified of new orders
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.orderNotifications}
                      onChange={(e) =>
                        updateNotificationSetting(
                          "orderNotifications",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">
                      Reservation Notifications
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Get notified of new reservations
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.reservationNotifications}
                      onChange={(e) =>
                        updateNotificationSetting(
                          "reservationNotifications",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">
                      Inventory Alerts
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Get notified of low stock items
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.inventoryAlerts}
                      onChange={(e) =>
                        updateNotificationSetting(
                          "inventoryAlerts",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">
                      Push Notifications
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Receive push notifications
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) =>
                        updateNotificationSetting(
                          "pushNotifications",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Staff Permissions */}
        {activeTab === "permissions" && (
          <div className="bg-dashboard border border-border-primary rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Staff Permissions
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(staffPermissions).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-text-primary">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Allow staff to{" "}
                        {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          updateStaffPermission(key, e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Appearance Settings */}
        {activeTab === "appearance" && (
          <div className="space-y-6">
            <div className="bg-dashboard border border-border-primary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Theme & Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Theme
                  </label>
                  <select
                    value={appearanceSettings.theme}
                    onChange={(e) =>
                      updateAppearanceSetting("theme", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Font Size
                  </label>
                  <select
                    value={appearanceSettings.fontSize}
                    onChange={(e) =>
                      updateAppearanceSetting("fontSize", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Primary Color
                  </label>
                  <div className="flex space-x-2">
                    {[
                      "#3B82F6",
                      "#10B981",
                      "#F59E0B",
                      "#EF4444",
                      "#8B5CF6",
                    ].map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          updateAppearanceSetting("primaryColor", color)
                        }
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          appearanceSettings.primaryColor === color
                            ? "border-text-primary scale-110"
                            : "border-border-primary hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dashboard border border-border-primary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Display Options
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">
                      Compact Mode
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Reduce spacing for more content
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appearanceSettings.compactMode}
                      onChange={(e) =>
                        updateAppearanceSetting("compactMode", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">
                      Show Animations
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Enable smooth transitions and animations
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appearanceSettings.showAnimations}
                      onChange={(e) =>
                        updateAppearanceSetting(
                          "showAnimations",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
