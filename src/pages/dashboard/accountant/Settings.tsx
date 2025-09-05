import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  DollarSign,
  Calculator,
  FileText,
  CreditCard,
  Building,
  Globe,
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
  BarChart3,
  PieChart,
  LineChart,
  Zap,
  Moon,
  Sun,
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
  Database,
  Server,
  Cloud,
  HardDrive,
  Wifi,
  WifiOff,
  Activity,
  Clock,
  Mail,
  MessageSquare,
  HelpCircle,
  BookOpen,
  FileCheck,
  Receipt,
  Banknote,
  Coins,
  Wallet,
  PiggyBank,
  TrendingDown,
  Percent,
  Target,
  AlertCircle,
  CheckCircle2,
  XCircle,
  InfoIcon,
  ExternalLink,
  Copy,
  Share2,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Archive,
  Trash,
  Edit3,
  Save as SaveIcon,
  AtSign,
  Hash as HashIcon,
  DollarSign as DollarIcon,
  Percent as PercentIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  X as XIcon,
  Check as CheckIcon,
  AlertTriangle as AlertIcon,
  Info as InfoIcon2,
  HelpCircle as HelpIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  AlertCircle as AlertCircleIcon,
} from "lucide-react";
import { toast } from "react-toastify";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@brms.com",
    phone: "+250 788 123 456",
    address: "Kigali, Rwanda",
    bio: "Certified Public Accountant with 8+ years of experience in restaurant financial management",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    department: "Finance & Accounting",
    position: "Senior Accountant",
    employeeId: "ACC-001",
    joinDate: "2020-03-15",
    salary: 450000,
    currency: "RWF",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    paymentAlerts: true,
    invoiceReminders: true,
    taxDeadlines: true,
    reportGeneration: true,
    systemUpdates: false,
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
  });

  const [workPreferences, setWorkPreferences] = useState({
    defaultCurrency: "RWF",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24",
    language: "en",
    theme: "light",
    autoSave: true,
    backupFrequency: "daily",
    reportFormat: "PDF",
    emailReports: true,
  });

  const [financialSettings, setFinancialSettings] = useState({
    taxRate: 18,
    vatEnabled: true,
    invoicePrefix: "INV",
    invoiceNumbering: "sequential",
    paymentTerms: 30,
    lateFeeRate: 2.5,
    currencySymbol: "RWF",
    decimalPlaces: 0,
    roundingMethod: "round",
    fiscalYearStart: "01-01",
    reportingPeriod: "monthly",
  });

  // Handler functions
  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Preferences saved");
    } catch (error) {
      toast.error("Failed to save preferences");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFinancialSettings = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Financial settings saved");
    } catch (error) {
      toast.error("Failed to save financial settings");
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
    { id: "financial", label: "Financial", icon: DollarSign },
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
                {profileData.position}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium border border-blue-200">
                {profileData.department}
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
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Employee ID
            </label>
            <input
              type="text"
              value={profileData.employeeId}
              disabled
              className="w-full px-3 py-2 border border-border-secondary rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Join Date
            </label>
            <input
              type="date"
              value={profileData.joinDate}
              disabled
              className="w-full px-3 py-2 border border-border-secondary rounded-lg bg-gray-50 text-gray-500"
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-text-primary">1,247</p>
            <p className="text-sm text-text-secondary">Invoices Processed</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600">+15% this month</span>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {profileData.salary.toLocaleString()} {profileData.currency}
            </p>
            <p className="text-sm text-text-secondary">Monthly Salary</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Award className="w-4 h-4 text-yellow-600" />
              <span className="text-xs text-yellow-600">Top Performer</span>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-text-primary">98.5%</p>
            <p className="text-sm text-text-secondary">Accuracy Rate</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600">+2.1% this quarter</span>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-text-primary">4.2</p>
            <p className="text-sm text-text-secondary">Years Experience</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-blue-600">Expert Level</span>
            </div>
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
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Payment Alerts</p>
                <p className="text-sm text-text-secondary">
                  Get notified about payment confirmations and issues
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.paymentAlerts}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    paymentAlerts: e.target.checked,
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
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-text-primary">
                  Invoice Reminders
                </p>
                <p className="text-sm text-text-secondary">
                  Get reminded about pending invoices and due dates
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.invoiceReminders}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    invoiceReminders: e.target.checked,
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Tax Deadlines</p>
                <p className="text-sm text-text-secondary">
                  Get notified about upcoming tax deadlines
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.taxDeadlines}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    taxDeadlines: e.target.checked,
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
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-text-primary">
                  Report Generation
                </p>
                <p className="text-sm text-text-secondary">
                  Get notified when reports are generated
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.reportGeneration}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    reportGeneration: e.target.checked,
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      {/* Work Preferences */}
      <div className="bg-white rounded-lg border border-border-primary p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Work Preferences
          </h3>
          <button
            onClick={handleSavePreferences}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 border border-brand-dark"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Saving..." : "Save Preferences"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Default Currency
            </label>
            <select
              value={workPreferences.defaultCurrency}
              onChange={(e) =>
                setWorkPreferences((prev) => ({
                  ...prev,
                  defaultCurrency: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="RWF">Rwandan Franc (RWF)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">British Pound (GBP)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Date Format
            </label>
            <select
              value={workPreferences.dateFormat}
              onChange={(e) =>
                setWorkPreferences((prev) => ({
                  ...prev,
                  dateFormat: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Time Format
            </label>
            <select
              value={workPreferences.timeFormat}
              onChange={(e) =>
                setWorkPreferences((prev) => ({
                  ...prev,
                  timeFormat: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="12">12-hour (AM/PM)</option>
              <option value="24">24-hour</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Language
            </label>
            <select
              value={workPreferences.language}
              onChange={(e) =>
                setWorkPreferences((prev) => ({
                  ...prev,
                  language: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="rw">Kinyarwanda</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Theme
            </label>
            <select
              value={workPreferences.theme}
              onChange={(e) =>
                setWorkPreferences((prev) => ({
                  ...prev,
                  theme: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Report Format
            </label>
            <select
              value={workPreferences.reportFormat}
              onChange={(e) =>
                setWorkPreferences((prev) => ({
                  ...prev,
                  reportFormat: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
              <option value="CSV">CSV</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinancialTab = () => (
    <div className="space-y-6">
      {/* Financial Settings */}
      <div className="bg-white rounded-lg border border-border-primary p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Financial Settings
          </h3>
          <button
            onClick={handleSaveFinancialSettings}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 border border-brand-dark"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Saving..." : "Save Settings"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              value={financialSettings.taxRate}
              onChange={(e) =>
                setFinancialSettings((prev) => ({
                  ...prev,
                  taxRate: parseFloat(e.target.value),
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Invoice Prefix
            </label>
            <input
              type="text"
              value={financialSettings.invoicePrefix}
              onChange={(e) =>
                setFinancialSettings((prev) => ({
                  ...prev,
                  invoicePrefix: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Payment Terms (Days)
            </label>
            <input
              type="number"
              value={financialSettings.paymentTerms}
              onChange={(e) =>
                setFinancialSettings((prev) => ({
                  ...prev,
                  paymentTerms: parseInt(e.target.value),
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Late Fee Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={financialSettings.lateFeeRate}
              onChange={(e) =>
                setFinancialSettings((prev) => ({
                  ...prev,
                  lateFeeRate: parseFloat(e.target.value),
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Currency Symbol
            </label>
            <input
              type="text"
              value={financialSettings.currencySymbol}
              onChange={(e) =>
                setFinancialSettings((prev) => ({
                  ...prev,
                  currencySymbol: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Decimal Places
            </label>
            <select
              value={financialSettings.decimalPlaces}
              onChange={(e) =>
                setFinancialSettings((prev) => ({
                  ...prev,
                  decimalPlaces: parseInt(e.target.value),
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value={0}>0 (RWF)</option>
              <option value={2}>2 (USD/EUR)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-white rounded-lg border border-border-primary p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 pr-10 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
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
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <button
            onClick={handleChangePassword}
            disabled={isLoading}
            className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 border border-brand-dark"
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-lg border border-border-primary p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Two-Factor Authentication
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary">
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
          <button className="bg-surface-secondary text-text-primary px-4 py-2 rounded-lg hover:bg-surface-tertiary transition-colors border border-border-secondary">
            Setup 2FA
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
          <p className="text-text-secondary">
            Configure your account preferences and financial settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.location.reload()}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors border border-border-secondary"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-border-primary">
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
          {activeTab === "financial" && renderFinancialTab()}
          {activeTab === "security" && renderSecurityTab()}
        </div>
      </div>
    </div>
  );
}
