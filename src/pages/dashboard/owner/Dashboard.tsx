import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useOwnerDashboard } from "./context";
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Star,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Plus,
  Eye,
  RefreshCw,
  Filter,
  Search,
  Clock,
  MapPin,
  Edit,
  Trash2,
  X,
  ArrowRight,
  BarChart3,
  Settings,
  Target,
  CreditCard,
  Bell,
  TrendingDown,
  Activity,
  Zap,
  ChevronDown,
  ChevronUp,
  Crown,
} from "lucide-react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    owner,
    restaurants,
    financialData,
    staff,
    notifications,
    addNotification,
  } = useOwnerDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Calculate totals
  const totalRevenue = restaurants.reduce(
    (sum, restaurant) => sum + restaurant.revenue,
    0
  );
  const totalStaff = staff.length;
  const averageRating =
    restaurants.reduce((sum, restaurant) => sum + restaurant.rating, 0) /
    restaurants.length;
  const activeRestaurants = restaurants.filter(
    (restaurant) => restaurant.status === "active"
  ).length;
  const urgentNotifications = notifications.filter(
    (notification) =>
      notification.priority === "urgent" || notification.priority === "high"
  ).length;

  // Filtered data
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || restaurant.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [restaurants, searchQuery, statusFilter]);

  const recentFinancialData = financialData.slice(0, 3);
  const revenueGrowth =
    recentFinancialData.length > 1
      ? ((recentFinancialData[0].revenue -
          recentFinancialData[recentFinancialData.length - 1].revenue) /
          recentFinancialData[recentFinancialData.length - 1].revenue) *
        100
      : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "inactive":
        return "text-red-600 bg-red-100";
      case "maintenance":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "inactive":
        return <X className="w-4 h-4" />;
      case "maintenance":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleQuickAction = (action: string) => {
    setShowQuickActions(false);

    switch (action) {
      case "add_restaurant":
        navigate("/dashboard/owner/business-management");
        toast.success("Navigating to Business Management");
        break;
      case "hire_staff":
        navigate("/dashboard/owner/staff");
        toast.success("Navigating to Staff Management");
        break;
      case "view_reports":
        navigate("/dashboard/owner/reports");
        toast.success("Navigating to Reports & Analytics");
        break;
      case "manage_finances":
        navigate("/dashboard/owner/financial");
        toast.success("Navigating to Financial Management");
        break;
      case "businesses":
        navigate("/dashboard/owner/businesses");
        toast.success("Navigating to Businesses");
        break;
      case "strategic_decisions":
        navigate("/dashboard/owner/strategic-decisions");
        toast.success("Navigating to Strategic Decisions");
        break;
      case "subscription":
        navigate("/dashboard/owner/subscription");
        toast.success("Navigating to Subscription Management");
        break;
      default:
        toast.info("Action not implemented yet");
        break;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Data refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh data");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRestaurantAction = (restaurant: any, action: string) => {
    switch (action) {
      case "view":
        setSelectedRestaurant(restaurant);
        setShowRestaurantModal(true);
        toast.info(`Viewing details for ${restaurant.name}`);
        break;
      case "edit":
        toast.info(`Editing ${restaurant.name}...`);
        addNotification({
          type: "restaurant",
          title: "Edit Restaurant",
          message: `Editing ${restaurant.name}...`,
          priority: "medium",
          actionRequired: false,
        });
        break;
      case "delete":
        if (
          window.confirm(`Are you sure you want to delete ${restaurant.name}?`)
        ) {
          toast.success(`${restaurant.name} has been removed`);
          addNotification({
            type: "restaurant",
            title: "Restaurant Deleted",
            message: `${restaurant.name} has been removed`,
            priority: "high",
            actionRequired: false,
          });
        }
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-surface-primary to-surface-secondary">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-success/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative space-y-8 p-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface-primary/80 backdrop-blur-sm rounded-3xl p-8 border border-border-subtle/20 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-brand to-brand-hover rounded-2xl">
                  <Crown className="w-8 h-8 text-text-inverted" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-text-primary bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
                    Owner Dashboard
                  </h1>
                  <p className="text-text-secondary text-lg">
                    Welcome back,{" "}
                    <span className="font-semibold text-brand">
                      {owner.name}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-text-secondary max-w-2xl">
                Here's a comprehensive overview of your business empire. Monitor
                performance, manage operations, and make strategic decisions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-brand-hover px-6 py-3 text-text-inverted font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-hover to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Quick Actions
                    {showQuickActions ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>
              </div>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-accent-hover px-6 py-3 text-text-inverted font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative flex items-center gap-2">
                  <RefreshCw
                    className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                  Refresh
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Quick Actions Dropdown */}
        <AnimatePresence>
          {showQuickActions && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-24 bg-surface-primary/95 backdrop-blur-sm border border-border-subtle/20 rounded-2xl shadow-2xl z-50 min-w-[280px] overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-brand" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    {
                      action: "add_restaurant",
                      icon: Building2,
                      label: "Add Business",
                      color: "text-blue-600",
                    },
                    {
                      action: "hire_staff",
                      icon: Users,
                      label: "Hire Staff",
                      color: "text-purple-600",
                    },
                    {
                      action: "view_reports",
                      icon: BarChart3,
                      label: "View Reports",
                      color: "text-green-600",
                    },
                    {
                      action: "manage_finances",
                      icon: DollarSign,
                      label: "Manage Finances",
                      color: "text-yellow-600",
                    },
                    {
                      action: "businesses",
                      icon: Building2,
                      label: "Businesses",
                      color: "text-orange-600",
                    },
                    {
                      action: "strategic_decisions",
                      icon: Target,
                      label: "Strategic Decisions",
                      color: "text-red-600",
                    },
                    {
                      action: "subscription",
                      icon: CreditCard,
                      label: "Subscription",
                      color: "text-indigo-600",
                    },
                  ].map((item) => (
                    <button
                      key={item.action}
                      onClick={() => handleQuickAction(item.action)}
                      className="group w-full text-left px-4 py-3 text-text-primary hover:bg-surface-secondary rounded-xl transition-all duration-200 flex items-center gap-3 hover:scale-105"
                    >
                      <div
                        className={`p-2 rounded-lg bg-surface-secondary group-hover:bg-surface-card transition-colors ${item.color}`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              title: "Total Revenue",
              value: formatCurrency(totalRevenue),
              change: `${revenueGrowth >= 0 ? "+" : ""}${revenueGrowth.toFixed(
                1
              )}%`,
              changeType: revenueGrowth >= 0 ? "positive" : "negative",
              subtitle: "from last month",
              icon: DollarSign,
              color: "from-green-500 to-emerald-600",
              bgColor: "bg-green-500/10",
              iconColor: "text-green-600",
            },
            {
              title: "Restaurants",
              value: restaurants.length.toString(),
              change: `${activeRestaurants} active`,
              changeType: "neutral",
              subtitle: "total locations",
              icon: Building2,
              color: "from-blue-500 to-cyan-600",
              bgColor: "bg-blue-500/10",
              iconColor: "text-blue-600",
            },
            {
              title: "Total Staff",
              value: totalStaff.toString(),
              change: "across all locations",
              changeType: "neutral",
              subtitle: "employees",
              icon: Users,
              color: "from-purple-500 to-violet-600",
              bgColor: "bg-purple-500/10",
              iconColor: "text-purple-600",
            },
            {
              title: "Avg Rating",
              value: averageRating.toFixed(1),
              change: "customer satisfaction",
              changeType: "positive",
              subtitle: "out of 5.0",
              icon: Star,
              color: "from-yellow-500 to-amber-600",
              bgColor: "bg-yellow-500/10",
              iconColor: "text-yellow-600",
            },
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="group relative overflow-hidden bg-surface-primary/80 backdrop-blur-sm rounded-2xl p-6 border border-border-subtle/20 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                  <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    metric.changeType === "positive"
                      ? "bg-green-500"
                      : metric.changeType === "negative"
                      ? "bg-red-500"
                      : "bg-gray-400"
                  }`}
                ></div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-text-secondary font-medium">
                  {metric.title}
                </p>
                <p className="text-3xl font-bold text-text-primary">
                  {metric.value}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      metric.changeType === "positive"
                        ? "text-green-600"
                        : metric.changeType === "negative"
                        ? "text-red-600"
                        : "text-text-secondary"
                    }`}
                  >
                    {metric.change}
                  </span>
                  {metric.changeType === "positive" && (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  )}
                  {metric.changeType === "negative" && (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-xs text-text-muted">{metric.subtitle}</p>
              </div>

              <div
                className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-surface-primary/80 backdrop-blur-sm rounded-2xl p-6 border border-border-subtle/20 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex-1">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5 group-focus-within:text-brand transition-colors" />
                <input
                  type="text"
                  placeholder="Search restaurants, locations, or types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200 text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-4 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4 pointer-events-none" />
              </div>

              <div className="text-sm text-text-secondary flex items-center gap-2">
                <Activity className="w-4 h-4" />
                {filteredRestaurants.length} of {restaurants.length} restaurants
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Financial Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-surface-primary/80 backdrop-blur-sm rounded-2xl p-8 border border-border-subtle/20 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-text-inverted" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  Financial Overview
                </h2>
                <p className="text-text-secondary">
                  Recent financial performance across all locations
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/dashboard/owner/financial")}
              className="group flex items-center gap-2 px-4 py-2 text-brand hover:text-brand-hover transition-colors"
            >
              <span className="font-medium">View Details</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentFinancialData.map((data, index) => (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group relative overflow-hidden bg-surface-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border-subtle/20 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-brand/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-brand" />
                  </div>
                  <div className="text-xs text-text-muted font-medium">
                    {data.month}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-text-primary">
                      {formatCurrency(data.revenue)}
                    </p>
                    <p className="text-sm text-text-secondary">Total Revenue</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border-subtle">
                    <div>
                      <p className="text-lg font-semibold text-green-600">
                        {formatCurrency(data.profit)}
                      </p>
                      <p className="text-xs text-text-secondary">Profit</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-blue-600">
                        {data.orders}
                      </p>
                      <p className="text-xs text-text-secondary">Orders</p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Restaurants Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-surface-primary/80 backdrop-blur-sm rounded-2xl border border-border-subtle/20 shadow-xl overflow-hidden"
        >
          <div className="p-8 border-b border-border-subtle/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
                  <Building2 className="w-6 h-6 text-text-inverted" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">
                    Restaurants Overview
                  </h2>
                  <p className="text-text-secondary">
                    Manage your restaurant locations and monitor their
                    performance
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/dashboard/owner/restaurants")}
                className="group flex items-center gap-2 px-4 py-2 text-brand hover:text-brand-hover transition-colors"
              >
                <span className="font-medium">Manage All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-secondary/50">
                <tr>
                  <th className="text-left py-4 px-6 text-text-secondary font-semibold">
                    Restaurant
                  </th>
                  <th className="text-left py-4 px-6 text-text-secondary font-semibold">
                    Location
                  </th>
                  <th className="text-left py-4 px-6 text-text-secondary font-semibold">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-text-secondary font-semibold">
                    Revenue
                  </th>
                  <th className="text-left py-4 px-6 text-text-secondary font-semibold">
                    Staff
                  </th>
                  <th className="text-left py-4 px-6 text-text-secondary font-semibold">
                    Rating
                  </th>
                  <th className="text-right py-4 px-6 text-text-secondary font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRestaurants.map((restaurant, index) => (
                  <motion.tr
                    key={restaurant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border-b border-border-subtle/20 hover:bg-surface-secondary/30 transition-all duration-200 group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-hover rounded-xl flex items-center justify-center text-text-inverted font-bold text-lg shadow-lg">
                          {restaurant.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary text-lg">
                            {restaurant.name}
                          </p>
                          <p className="text-sm text-text-secondary capitalize">
                            {restaurant.type}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <MapPin className="w-4 h-4 text-brand" />
                        <span className="font-medium">
                          {restaurant.location}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                          restaurant.status
                        )}`}
                      >
                        {getStatusIcon(restaurant.status)}
                        {restaurant.status.charAt(0).toUpperCase() +
                          restaurant.status.slice(1)}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-bold text-text-primary text-lg">
                        {formatCurrency(restaurant.revenue)}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-text-secondary" />
                        <span className="font-semibold text-text-primary">
                          {restaurant.staffCount}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="font-semibold text-text-primary text-lg">
                          {restaurant.rating}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            handleRestaurantAction(restaurant, "view")
                          }
                          className="p-2 text-text-secondary hover:text-brand hover:bg-brand/10 rounded-lg transition-all duration-200 group"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() =>
                            handleRestaurantAction(restaurant, "edit")
                          }
                          className="p-2 text-text-secondary hover:text-blue-600 hover:bg-blue-500/10 rounded-lg transition-all duration-200 group"
                          title="Edit Restaurant"
                        >
                          <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() =>
                            handleRestaurantAction(restaurant, "delete")
                          }
                          className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
                          title="Delete Restaurant"
                        >
                          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRestaurants.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-text-muted" />
              </div>
              <p className="text-text-secondary text-lg font-medium">
                No restaurants found matching your criteria
              </p>
              <p className="text-text-muted text-sm mt-2">
                Try adjusting your search or filter settings
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Recent Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-surface-primary/80 backdrop-blur-sm rounded-2xl p-8 border border-border-subtle/20 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                <Bell className="w-6 h-6 text-text-inverted" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  Recent Notifications
                </h2>
                <p className="text-text-secondary">
                  Stay updated with important alerts and updates
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-red-500/10 text-red-600 rounded-full text-sm font-semibold">
                {urgentNotifications} urgent
              </div>
              <button
                onClick={() => navigate("/dashboard/owner/settings")}
                className="group flex items-center gap-2 px-4 py-2 text-brand hover:text-brand-hover transition-colors"
              >
                <span className="font-medium">View All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {notifications.slice(0, 5).map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="group flex items-center gap-4 p-4 bg-surface-secondary/50 rounded-xl hover:bg-surface-secondary transition-all duration-200 border border-border-subtle/20"
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      notification.priority === "urgent"
                        ? "bg-red-500"
                        : notification.priority === "high"
                        ? "bg-orange-500"
                        : notification.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary text-lg truncate">
                    {notification.title}
                  </p>
                  <p className="text-text-secondary text-sm mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="text-xs text-text-muted font-medium">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </span>
                  <div className="text-xs text-text-muted mt-1">
                    {notification.priority}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Restaurant Details Modal */}
        <AnimatePresence>
          {showRestaurantModal && selectedRestaurant && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowRestaurantModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-surface-primary rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-border-subtle/20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand to-brand-hover rounded-2xl flex items-center justify-center text-text-inverted font-bold text-2xl shadow-lg">
                      {selectedRestaurant.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-text-primary">
                        {selectedRestaurant.name}
                      </h3>
                      <p className="text-text-secondary text-lg capitalize">
                        {selectedRestaurant.type}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowRestaurantModal(false)}
                    className="p-3 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded-full transition-all duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-brand" />
                        Basic Information
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-surface-secondary/50 rounded-xl">
                          <MapPin className="w-5 h-5 text-brand" />
                          <div>
                            <p className="text-sm text-text-secondary">
                              Location
                            </p>
                            <p className="font-semibold text-text-primary">
                              {selectedRestaurant.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-surface-secondary/50 rounded-xl">
                          <Building2 className="w-5 h-5 text-brand" />
                          <div>
                            <p className="text-sm text-text-secondary">Type</p>
                            <p className="font-semibold text-text-primary capitalize">
                              {selectedRestaurant.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-surface-secondary/50 rounded-xl">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <div>
                            <p className="text-sm text-text-secondary">
                              Rating
                            </p>
                            <p className="font-semibold text-text-primary">
                              {selectedRestaurant.rating} / 5.0
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        Performance Metrics
                      </h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                          <div className="flex justify-between items-center">
                            <span className="text-text-secondary font-medium">
                              Revenue
                            </span>
                            <span className="text-2xl font-bold text-green-600">
                              {formatCurrency(selectedRestaurant.revenue)}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                          <div className="flex justify-between items-center">
                            <span className="text-text-secondary font-medium">
                              Staff Count
                            </span>
                            <span className="text-2xl font-bold text-blue-600">
                              {selectedRestaurant.staffCount}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl border border-purple-500/20">
                          <div className="flex justify-between items-center">
                            <span className="text-text-secondary font-medium">
                              Last Updated
                            </span>
                            <span className="text-lg font-semibold text-purple-600">
                              {new Date(
                                selectedRestaurant.lastUpdated
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border-subtle">
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowRestaurantModal(false)}
                      className="flex-1 px-6 py-3 bg-surface-secondary text-text-primary rounded-xl font-semibold hover:bg-surface-card transition-all duration-200"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowRestaurantModal(false);
                        handleRestaurantAction(selectedRestaurant, "edit");
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-brand to-brand-hover text-text-inverted rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Edit Restaurant
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
