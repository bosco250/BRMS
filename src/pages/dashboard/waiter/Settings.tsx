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
  Save,
  Eye,
  EyeOff,
  Camera,
  Upload,
  Download,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info,
  Phone,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Users,
  Utensils,
  ShoppingCart,
  Zap,
  Moon,
  Sun,
  Globe,
  Lock,
  Key,
  Smartphone,
  Monitor,
  LogOut,
  Trash2,
  Edit,
  Plus,
  Minus,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

export default function Settings() {
  const { waiter } = useWaiterDashboard();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: waiter.name,
    email: waiter.email,
    phone: "+250 788 123 456",
    address: "Kigali, Rwanda",
    bio: "Experienced waiter with 5+ years in fine dining",
    avatar: waiter.avatar,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderReady: true,
    tableAssignment: true,
    reservationUpdates: true,
    shiftReminders: false,
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
  });

  const [workPreferences, setWorkPreferences] = useState({
    maxTables: 4,
    autoAssign: true,
    preferredTableTypes: ["small", "medium"],
    theme: "light",
    language: "en",
    timeFormat: "12",
  });

  // Handler functions
  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Notification settings saved");
    } catch (error) {
      toast.error("Failed to save notification settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Preferences saved");
    } catch (error) {
      toast.error("Failed to save preferences");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          avatar: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: SettingsIcon },
    { id: "security", label: "Security", icon: Shield },
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-brand/10 to-brand/5 rounded-lg border border-brand/20 p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <label className="absolute bottom-0 right-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-dark transition-colors border-2 border-white">
              <Camera className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-text-primary">
              {profileData.name}
            </h2>
            <p className="text-text-secondary">{profileData.email}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium border border-green-200">
                {waiter.role}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${
                  waiter.status === "active"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : waiter.status === "busy"
                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                    : "bg-gray-100 text-gray-800 border-gray-200"
                }`}
              >
                {waiter.status.charAt(0).toUpperCase() + waiter.status.slice(1)}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-brand border border-brand rounded-lg hover:bg-brand/5 transition-colors"
          >
            <Edit className="w-4 h-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg border border-border-primary p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Personal Information
          </h3>
          {isEditing && (
            <button
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 border border-brand-dark"
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, name: e.target.value }))
              }
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:bg-gray-50 disabled:text-gray-500"
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
                setProfileData((prev) => ({ ...prev, email: e.target.value }))
              }
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:bg-gray-50 disabled:text-gray-500"
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
                setProfileData((prev) => ({ ...prev, phone: e.target.value }))
              }
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Address
            </label>
            <input
              type="text"
              value={profileData.address}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, address: e.target.value }))
              }
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Bio
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, bio: e.target.value }))
              }
              disabled={!isEditing}
              rows={3}
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Performance Statistics */}
      <div className="bg-white rounded-lg border border-border-primary p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Performance Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-text-primary">247</p>
            <p className="text-sm text-text-secondary">Total Orders</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600">+12% this month</span>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {waiter.rating}
            </p>
            <p className="text-sm text-text-secondary">Average Rating</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Award className="w-4 h-4 text-yellow-600" />
              <span className="text-xs text-yellow-600">Top Performer</span>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {waiter.totalTips.toFixed(0)} RWF
            </p>
            <p className="text-sm text-text-secondary">Total Tips</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600">+8% this week</span>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-text-primary">1,234</p>
            <p className="text-sm text-text-secondary">Customers Served</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-blue-600">Fast Service</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shift Information */}
      <div className="bg-white rounded-lg border border-border-primary p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Shift Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Shift Start Time
            </label>
            <input
              type="time"
              value={new Date(waiter.shiftStart).toTimeString().slice(0, 5)}
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Shift End Time
            </label>
            <input
              type="time"
              value={new Date(waiter.shiftEnd).toTimeString().slice(0, 5)}
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>
        <div className="mt-4 p-4 bg-surface-secondary rounded-lg border border-border-secondary">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-brand" />
            <span className="text-sm font-medium text-text-primary">
              Current Shift Status
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">
              Duration:{" "}
              {Math.floor(
                (new Date().getTime() - new Date(waiter.shiftStart).getTime()) /
                  (1000 * 60 * 60)
              )}
              h{" "}
              {Math.floor(
                ((new Date().getTime() -
                  new Date(waiter.shiftStart).getTime()) %
                  (1000 * 60 * 60)) /
                  (1000 * 60)
              )}
              m
            </span>
            <span className="text-sm text-text-secondary">
              Remaining:{" "}
              {Math.floor(
                (new Date(waiter.shiftEnd).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60)
              )}
              h{" "}
              {Math.floor(
                ((new Date(waiter.shiftEnd).getTime() - new Date().getTime()) %
                  (1000 * 60 * 60)) /
                  (1000 * 60)
              )}
              m
            </span>
          </div>
        </div>
        <button className="mt-4 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors border border-brand-dark">
          Update Shift Times
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-border-primary p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-surface-secondary rounded-lg border border-border-secondary">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">
                Order completed for Table 5
              </p>
              <p className="text-xs text-text-secondary">2 minutes ago</p>
            </div>
            <span className="text-xs text-green-600 font-medium">
              +150 RWF tip
            </span>
          </div>

          <div className="flex items-center gap-4 p-3 bg-surface-secondary rounded-lg border border-border-secondary">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">
                Assigned to Table 3
              </p>
              <p className="text-xs text-text-secondary">15 minutes ago</p>
            </div>
            <span className="text-xs text-blue-600 font-medium">
              4 customers
            </span>
          </div>

          <div className="flex items-center gap-4 p-3 bg-surface-secondary rounded-lg border border-border-secondary">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">
                Received 5-star rating
              </p>
              <p className="text-xs text-text-secondary">1 hour ago</p>
            </div>
            <span className="text-xs text-yellow-600 font-medium">
              Excellent service
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <div className="bg-white rounded-lg border border-border-primary p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Notification Preferences
          </h3>
          <button
            onClick={handleSaveNotifications}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 border border-brand-dark"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Saving..." : "Save Settings"}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-text-primary">
                  Order Ready Notifications
                </p>
                <p className="text-sm text-text-secondary">
                  Get notified when orders are ready to serve
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.orderReady}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    orderReady: e.target.checked,
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-text-primary">
                  Table Assignment Notifications
                </p>
                <p className="text-sm text-text-secondary">
                  Get notified when assigned to new tables
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.tableAssignment}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    tableAssignment: e.target.checked,
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-text-primary">
                  Reservation Updates
                </p>
                <p className="text-sm text-text-secondary">
                  Get notified about reservation changes
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.reservationUpdates}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    reservationUpdates: e.target.checked,
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Shift Reminders</p>
                <p className="text-sm text-text-secondary">
                  Get reminded about upcoming shifts
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.shiftReminders}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    shiftReminders: e.target.checked,
                  }))
                }
                className="sr-only peer"
              />
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
