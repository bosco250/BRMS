import { useState } from "react";
import { useWaiterDashboard } from "./context";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Coffee,
  Clock,
  Star,
  DollarSign,
} from "lucide-react";

export default function Settings() {
  const { waiter } = useWaiterDashboard();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: SettingsIcon },
    { id: "security", label: "Security", icon: Shield },
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={waiter.name}
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue={waiter.email}
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Role
            </label>
            <input
              type="text"
              defaultValue={waiter.role}
              disabled
              className="w-full px-3 py-2 border border-border-secondary rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Status
            </label>
            <select
              defaultValue={waiter.status}
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="offline">Offline</option>
              <option value="busy">Busy</option>
            </select>
          </div>
        </div>
        <button className="mt-4 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand/90 transition-colors">
          Update Profile
        </button>
      </div>

      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Performance Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-border-secondary">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Coffee className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {waiter.totalOrders}
            </p>
            <p className="text-sm text-text-secondary">Total Orders</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-border-secondary">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {waiter.rating}
            </p>
            <p className="text-sm text-text-secondary">Rating</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-border-secondary">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-text-primary">
              ${waiter.totalTips.toFixed(2)}
            </p>
            <p className="text-sm text-text-secondary">Total Tips</p>
          </div>
        </div>
      </div>

      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Shift Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Shift Start Time
            </label>
            <input
              type="time"
              defaultValue={new Date(waiter.shiftStart)
                .toTimeString()
                .slice(0, 5)}
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Shift End Time
            </label>
            <input
              type="time"
              defaultValue={new Date(waiter.shiftEnd)
                .toTimeString()
                .slice(0, 5)}
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
        </div>
        <button className="mt-4 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand/90 transition-colors">
          Update Shift Times
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary">
            <div>
              <p className="font-medium text-text-primary">
                Order Ready Notifications
              </p>
              <p className="text-sm text-text-secondary">
                Get notified when orders are ready to serve
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary">
            <div>
              <p className="font-medium text-text-primary">
                Table Assignment Notifications
              </p>
              <p className="text-sm text-text-secondary">
                Get notified when assigned to new tables
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary">
            <div>
              <p className="font-medium text-text-primary">
                Reservation Updates
              </p>
              <p className="text-sm text-text-secondary">
                Get notified about reservation changes
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary">
            <div>
              <p className="font-medium text-text-primary">Shift Reminders</p>
              <p className="text-sm text-text-secondary">
                Get reminded about upcoming shifts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Notification Schedule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Quiet Hours Start
            </label>
            <input
              type="time"
              defaultValue="22:00"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Quiet Hours End
            </label>
            <input
              type="time"
              defaultValue="08:00"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
        </div>
        <p className="text-sm text-text-secondary mt-2">
          During quiet hours, only urgent notifications will be sent
        </p>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Work Preferences
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Preferred Table Types
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-text-secondary">
                  Small tables (2-4 people)
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-secondary">
                  Medium tables (4-6 people)
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-text-secondary">
                  Large tables (6+ people)
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Maximum Tables to Handle
            </label>
            <select className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent">
              <option value="3">3 tables</option>
              <option value="4" selected>
                4 tables
              </option>
              <option value="5">5 tables</option>
              <option value="6">6 tables</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Auto-assign New Tables
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Display Preferences
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Theme
            </label>
            <select className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Language
            </label>
            <select className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Time Format
            </label>
            <select className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent">
              <option value="12">12-hour (AM/PM)</option>
              <option value="24">24-hour</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <button className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand/90 transition-colors">
            Change Password
          </button>
        </div>
      </div>

      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Two-Factor Authentication
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary">
            <div>
              <p className="font-medium text-text-primary">Enable 2FA</p>
              <p className="text-sm text-text-secondary">
                Add an extra layer of security to your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
          <button className="bg-surface-secondary text-text-primary px-4 py-2 rounded-lg hover:bg-surface-tertiary transition-colors">
            Setup 2FA
          </button>
        </div>
      </div>

      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Session Management
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary">
            <div>
              <p className="font-medium text-text-primary">Current Session</p>
              <p className="text-sm text-text-secondary">
                Active on this device
              </p>
            </div>
            <span className="text-sm text-green-600 font-medium">Active</span>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            Sign Out All Devices
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary">
          Manage your account preferences and settings
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-surface-card rounded-lg border border-border-primary">
        <div className="flex border-b border-border-primary">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
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
          {activeTab === "profile" && renderProfileTab()}
          {activeTab === "notifications" && renderNotificationsTab()}
          {activeTab === "preferences" && renderPreferencesTab()}
          {activeTab === "security" && renderSecurityTab()}
        </div>
      </div>
    </div>
  );
}
