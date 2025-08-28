import React, { useState } from "react";
import {
  Bell,
  Shield,
  User,
  Palette,
  Globe,
  Save,
  Eye,
  EyeOff,
  Lock,
  Smartphone,
  Mail,
} from "lucide-react";
import { useCustomerDashboard } from "./context";
import { toast } from "react-toastify";

export default function Settings() {
  const { customer, setCustomer } = useCustomerDashboard();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: customer.name || "",
    email: customer.email || "",
    phone: customer.phone || "",
    avatar: customer.avatar || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    reservationReminders: true,
    loyaltyUpdates: true,
    promotionalOffers: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    orderHistory: "private",
    preferences: "private",
    analytics: true,
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "RWF",
    timezone: "Africa/Kigali",
    theme: "light",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Palette },
  ];

  const handleProfileSave = () => {
    setCustomer({
      ...customer,
      ...profileData,
    });
    toast.success("Profile updated successfully!");
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    toast.success("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleNotificationSave = () => {
    toast.success("Notification settings updated!");
  };

  const handlePrivacySave = () => {
    toast.success("Privacy settings updated!");
  };

  const handlePreferencesSave = () => {
    toast.success("Preferences updated!");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Profile Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Avatar URL
                  </label>
                  <input
                    type="url"
                    value={profileData.avatar}
                    onChange={(e) =>
                      setProfileData({ ...profileData, avatar: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </div>
              </div>
              <button
                onClick={handleProfileSave}
                className="mt-6 bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Change Password
              </h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 pr-10 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 pr-10 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 pr-10 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="w-full bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand-dark transition-colors flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-text-secondary" />
                    <div>
                      <h4 className="font-medium text-text-primary">
                        Email Notifications
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Receive notifications via email
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          emailNotifications: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-card peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-text-secondary" />
                    <div>
                      <h4 className="font-medium text-text-primary">
                        SMS Notifications
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Receive notifications via SMS
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          smsNotifications: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-card peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-text-secondary" />
                    <div>
                      <h4 className="font-medium text-text-primary">
                        Push Notifications
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Receive push notifications in app
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          pushNotifications: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-card peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-text-secondary" />
                    <div>
                      <h4 className="font-medium text-text-primary">
                        Promotional Offers
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Receive special offers and promotions
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.promotionalOffers}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          promotionalOffers: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-card peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>
              </div>
              <button
                onClick={handleNotificationSave}
                className="mt-6 bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Notification Settings
              </button>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Privacy Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">
                      Profile Visibility
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Control who can see your profile
                    </p>
                  </div>
                  <select
                    value={privacySettings.profileVisibility}
                    onChange={(e) =>
                      setPrivacySettings({
                        ...privacySettings,
                        profileVisibility: e.target.value,
                      })
                    }
                    className="px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">
                      Order History
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Control order history visibility
                    </p>
                  </div>
                  <select
                    value={privacySettings.orderHistory}
                    onChange={(e) =>
                      setPrivacySettings({
                        ...privacySettings,
                        orderHistory: e.target.value,
                      })
                    }
                    className="px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">
                      Analytics & Tracking
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Allow analytics to improve service
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.analytics}
                      onChange={(e) =>
                        setPrivacySettings({
                          ...privacySettings,
                          analytics: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-card peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>
              </div>
              <button
                onClick={handlePrivacySave}
                className="mt-6 bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Privacy Settings
              </button>
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                App Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">Language</h4>
                    <p className="text-sm text-text-secondary">
                      Choose your preferred language
                    </p>
                  </div>
                  <select
                    value={preferences.language}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        language: e.target.value,
                      })
                    }
                    className="px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="en">English</option>
                    <option value="rw">Kinyarwanda</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">Currency</h4>
                    <p className="text-sm text-text-secondary">
                      Choose your preferred currency
                    </p>
                  </div>
                  <select
                    value={preferences.currency}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        currency: e.target.value,
                      })
                    }
                    className="px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="RWF">RWF (Rwandan Franc)</option>
                    <option value="USD">USD (US Dollar)</option>
                    <option value="EUR">EUR (Euro)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">Theme</h4>
                    <p className="text-sm text-text-secondary">
                      Choose your preferred theme
                    </p>
                  </div>
                  <select
                    value={preferences.theme}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        theme: e.target.value,
                      })
                    }
                    className="px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handlePreferencesSave}
                className="mt-6 bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Preferences
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Settings</h2>
        <p className="text-text-secondary">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="bg-dashboard border border-border-primary rounded-lg">
        <div className="border-b border-border-primary">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-brand text-brand"
                      : "border-transparent text-text-secondary hover:text-text-primary hover:border-border-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}
