import { useState } from "react";
import { Mail, Bell, Smartphone, Save } from "lucide-react";
import { useCustomerDashboard } from "./context";
import { toast } from "react-toastify";

export default function Communication() {
  const { customer, setCustomer } = useCustomerDashboard();
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    reservationReminders: true,
    promotionalOffers: false,
    loyaltyUpdates: true,
    newMenuItems: true,
    specialEvents: false,
  });

  const [communicationChannels, setCommunicationChannels] = useState({
    email: true,
    sms: true,
    push: true,
  });

  const [contactInfo, setContactInfo] = useState({
    email: customer.email || "",
    phone: customer.phone || "",
  });

  const handleNotificationToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChannelToggle = (key: keyof typeof communicationChannels) => {
    setCommunicationChannels((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveSettings = () => {
    setCustomer({
      ...customer,
      ...contactInfo,
    });
    toast.success("Communication settings saved successfully!");
  };

  const handleTestNotification = (type: string) => {
    toast.success(`${type} test notification sent!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Communication</h2>
        <p className="text-text-secondary">
          Manage how you receive notifications and updates from us
        </p>
      </div>

      {/* Notification Preferences */}
      <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary"
            >
              <div>
                <p className="text-sm font-medium text-text-primary capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-xs text-text-secondary">
                  {key === "orderUpdates" &&
                    "Get notified about order status changes"}
                  {key === "reservationReminders" &&
                    "Receive reminders for upcoming reservations"}
                  {key === "promotionalOffers" &&
                    "Receive special deals and discounts"}
                  {key === "loyaltyUpdates" &&
                    "Get updates about your loyalty points and rewards"}
                  {key === "newMenuItems" &&
                    "Be notified when new menu items are available"}
                  {key === "specialEvents" &&
                    "Receive information about special events and promotions"}
                </p>
              </div>
              <button
                onClick={() =>
                  handleNotificationToggle(
                    key as keyof typeof notificationSettings
                  )
                }
                className={`w-12 h-6 rounded-full relative transition-colors border ${
                  value
                    ? "bg-brand border-brand-dark"
                    : "bg-surface-card border-border-secondary"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                    value ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Communication Channels */}
      <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Communication Channels
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-text-secondary" />
              <div>
                <span className="text-sm font-medium text-text-primary">
                  Email
                </span>
                <p className="text-xs text-text-secondary">
                  Receive notifications via email
                </p>
              </div>
            </div>
            <button
              onClick={() => handleChannelToggle("email")}
              className={`w-12 h-6 rounded-full relative transition-colors border ${
                communicationChannels.email
                  ? "bg-brand border-brand-dark"
                  : "bg-surface-card border-border-secondary"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                  communicationChannels.email ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-text-secondary" />
              <div>
                <span className="text-sm font-medium text-text-primary">
                  SMS
                </span>
                <p className="text-xs text-text-secondary">
                  Receive notifications via text message
                </p>
              </div>
            </div>
            <button
              onClick={() => handleChannelToggle("sms")}
              className={`w-12 h-6 rounded-full relative transition-colors border ${
                communicationChannels.sms
                  ? "bg-brand border-brand-dark"
                  : "bg-surface-card border-border-secondary"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                  communicationChannels.sms ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-text-secondary" />
              <div>
                <span className="text-sm font-medium text-text-primary">
                  Push Notifications
                </span>
                <p className="text-xs text-text-secondary">
                  Receive in-app notifications
                </p>
              </div>
            </div>
            <button
              onClick={() => handleChannelToggle("push")}
              className={`w-12 h-6 rounded-full relative transition-colors border ${
                communicationChannels.push
                  ? "bg-brand border-brand-dark"
                  : "bg-surface-card border-border-secondary"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                  communicationChannels.push ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, email: e.target.value })
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
              value={contactInfo.phone}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, phone: e.target.value })
              }
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>
        <button
          onClick={handleSaveSettings}
          className="bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2 border border-brand-dark"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>

      {/* Test Notifications */}
      <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Test Notifications
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          Test your notification settings to ensure everything is working
          correctly
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleTestNotification("Email")}
            className="bg-surface-secondary text-text-primary px-4 py-2 rounded-lg hover:bg-surface-card transition-colors flex items-center gap-2 border border-border-secondary"
          >
            <Mail className="w-4 h-4" />
            Test Email
          </button>
          <button
            onClick={() => handleTestNotification("SMS")}
            className="bg-surface-secondary text-text-primary px-4 py-2 rounded-lg hover:bg-surface-card transition-colors flex items-center gap-2 border border-border-secondary"
          >
            <Smartphone className="w-4 h-4" />
            Test SMS
          </button>
          <button
            onClick={() => handleTestNotification("Push")}
            className="bg-surface-secondary text-text-primary px-4 py-2 rounded-lg hover:bg-surface-card transition-colors flex items-center gap-2 border border-border-secondary"
          >
            <Bell className="w-4 h-4" />
            Test Push
          </button>
        </div>
      </div>
    </div>
  );
}
