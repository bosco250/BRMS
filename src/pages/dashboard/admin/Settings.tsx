import { useState } from "react";
import { useAdminDashboard } from "./context";
import {
  Settings as SettingsIcon,
  Shield,
  Database,
  Server,
  Bell,
  Users,
  Building2,
  Globe,
  Key,
  Save,
  X,
} from "lucide-react";

export default function Settings() {
  const { admin } = useAdminDashboard();
  const [activeTab, setActiveTab] = useState("general");
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "security", label: "Security", icon: Shield },
    { id: "database", label: "Database", icon: Database },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "users", label: "User Management", icon: Users },
    { id: "businesses", label: "Business Settings", icon: Building2 },
  ];

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          System Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              System Name
            </label>
            <input
              type="text"
              defaultValue="BRMS Restaurant Management System"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Version
            </label>
            <input
              type="text"
              defaultValue="2.1.0"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Environment
            </label>
            <select className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent">
              <option>Production</option>
              <option>Staging</option>
              <option>Development</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Timezone
            </label>
            <select className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent">
              <option>UTC</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
              <option>Asia/Tokyo</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Maintenance Mode
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-primary font-medium">
              Enable Maintenance Mode
            </p>
            <p className="text-xs text-text-secondary">
              Temporarily disable access for all users
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Authentication Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Max Login Attempts
            </label>
            <input
              type="number"
              defaultValue="5"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-primary font-medium">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-text-secondary">
                Require 2FA for admin accounts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Password Policy
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Minimum Length
            </label>
            <input
              type="number"
              defaultValue="8"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-primary font-medium">
                Require Special Characters
              </p>
              <p className="text-xs text-text-secondary">
                Include symbols and numbers
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDatabaseTab = () => (
    <div className="space-y-6">
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Database Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Host
            </label>
            <input
              type="text"
              defaultValue="localhost"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Port
            </label>
            <input
              type="text"
              defaultValue="5432"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Database Name
            </label>
            <input
              type="text"
              defaultValue="brms_db"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Connection Pool
            </label>
            <input
              type="number"
              defaultValue="10"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Backup Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-primary font-medium">
                Automatic Backups
              </p>
              <p className="text-xs text-text-secondary">
                Daily database backups
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Backup Retention (days)
            </label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Email Notifications
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              SMTP Server
            </label>
            <input
              type="text"
              defaultValue="smtp.gmail.com"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              From Email
            </label>
            <input
              type="email"
              defaultValue="noreply@brms.com"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-primary font-medium">
                System Alerts
              </p>
              <p className="text-xs text-text-secondary">
                Send critical system notifications
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagementTab = () => (
    <div className="space-y-6">
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          User Registration
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-primary font-medium">
                Allow New Registrations
              </p>
              <p className="text-xs text-text-secondary">
                Enable user self-registration
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-primary font-medium">
                Email Verification
              </p>
              <p className="text-xs text-text-secondary">
                Require email verification for new users
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBusinessSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Business Limits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Max Users per Business
            </label>
            <input
              type="number"
              defaultValue="50"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Max Tables per Business
            </label>
            <input
              type="number"
              defaultValue="100"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Subscription Plans
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-primary font-medium">
                Enable Trial Period
              </p>
              <p className="text-xs text-text-secondary">
                Allow businesses to try before buying
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Trial Duration (days)
            </label>
            <input
              type="number"
              defaultValue="14"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralTab();
      case "security":
        return renderSecurityTab();
      case "database":
        return renderDatabaseTab();
      case "notifications":
        return renderNotificationsTab();
      case "users":
        return renderUserManagementTab();
      case "businesses":
        return renderBusinessSettingsTab();
      default:
        return renderGeneralTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">
          System Settings
        </h1>
        <p className="text-text-secondary">
          Configure system-wide settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-surface-card rounded-lg border border-border-primary">
        <div className="flex border-b border-border-primary overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-brand border-b-2 border-brand"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {renderTabContent()}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border-primary">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
