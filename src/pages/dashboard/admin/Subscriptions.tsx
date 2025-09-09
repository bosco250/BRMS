import { useState } from "react";
import { useAdminDashboard } from "./context";
import {
  CreditCard,
  Building2,
  DollarSign,
  CheckCircle,
  Search,
  MoreHorizontal,
  Plus,
  TrendingUp,
  BarChart3,
  Settings,
  X,
  Check,
  Pause,
  Play,
  Trash2,
} from "lucide-react";

export default function Subscriptions() {
  const {
    subscriptions,
    subscriptionPlans,
    subscriptionAnalytics,
    cancelSubscription,
    suspendSubscription,
    reactivateSubscription,
  } = useAdminDashboard();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<
    string | null
  >(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Filter subscriptions based on search and filters
  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch = subscription.businessName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || subscription.status === statusFilter;
    const matchesPlan =
      planFilter === "all" || subscription.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-yellow-100 text-yellow-800";
      case "trial":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "basic":
        return "bg-blue-100 text-blue-800";
      case "premium":
        return "bg-purple-100 text-purple-800";
      case "enterprise":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysUntilExpiry = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryStatus = (endDate: string) => {
    const daysUntilExpiry = getDaysUntilExpiry(endDate);
    if (daysUntilExpiry < 0) return "expired";
    if (daysUntilExpiry <= 30) return "expiring-soon";
    return "active";
  };

  const handleSubscriptionAction = (action: string, subscriptionId: string) => {
    switch (action) {
      case "cancel":
        cancelSubscription(subscriptionId, "Cancelled by admin");
        break;
      case "suspend":
        suspendSubscription(subscriptionId, "Suspended by admin");
        break;
      case "reactivate":
        reactivateSubscription(subscriptionId);
        break;
      default:
        break;
    }
    setShowActionsModal(false);
    setSelectedSubscription(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Subscription Management
          </h1>
          <p className="text-text-secondary">
            Monitor and manage all business subscriptions
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-hover transition-colors">
            <Plus className="w-4 h-4" />
            New Subscription
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-primary">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "overview", name: "Overview", icon: BarChart3 },
            { id: "subscriptions", name: "Subscriptions", icon: CreditCard },
            { id: "plans", name: "Plans", icon: Settings },
            { id: "analytics", name: "Analytics", icon: TrendingUp },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-brand text-brand"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">
                    Total Subscriptions
                  </p>
                  <p className="text-2xl font-bold text-text-primary">
                    {subscriptions.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Active</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {subscriptions.filter((s) => s.status === "active").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">MRR</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {formatCurrency(
                      subscriptionAnalytics.monthlyRecurringRevenue
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Growth</p>
                  <p className="text-2xl font-bold text-text-primary">
                    +{subscriptionAnalytics.subscriptionGrowth}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Chart Placeholder */}
          <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Revenue Trend
            </h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-text-secondary">
                Revenue chart would be displayed here
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subscriptions Tab */}
      {activeTab === "subscriptions" && (
        <div className="space-y-6">
          {/* Filters and Search */}
          <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search business names..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="suspended">Suspended</option>
                  <option value="trial">Trial</option>
                </select>

                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="px-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                >
                  <option value="all">All Plans</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
            </div>
          </div>

          {/* Subscriptions List */}
          <div className="bg-surface-card rounded-lg border border-border-primary overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-secondary border-b border-border-primary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Next Billing
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-border-secondary">
                  {filteredSubscriptions.map((subscription) => {
                    const expiryStatus = getExpiryStatus(subscription.endDate);
                    const daysUntilExpiry = getDaysUntilExpiry(
                      subscription.endDate
                    );

                    return (
                      <tr
                        key={subscription.id}
                        className="hover:bg-surface-secondary/50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-brand" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-text-primary">
                                {subscription.businessName}
                              </div>
                              <div className="text-xs text-text-secondary">
                                ID: {subscription.businessId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(
                              subscription.plan
                            )}`}
                          >
                            {subscription.plan.charAt(0).toUpperCase() +
                              subscription.plan.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                subscription.status
                              )}`}
                            >
                              {subscription.status.charAt(0).toUpperCase() +
                                subscription.status.slice(1)}
                            </span>
                            {expiryStatus === "expiring-soon" && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                {daysUntilExpiry} days
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                          {formatCurrency(subscription.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                          {formatDate(subscription.nextBillingDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedSubscription(subscription.id);
                                setShowActionsModal(true);
                              }}
                              className="p-1 text-text-secondary hover:text-brand transition-colors"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Plans Tab */}
      {activeTab === "plans" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-surface-card p-6 rounded-lg border border-border-primary ${
                  plan.isPopular ? "ring-2 ring-brand" : ""
                }`}
              >
                {plan.isPopular && (
                  <div className="bg-brand text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {plan.name}
                </h3>
                <p className="text-text-secondary mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-text-primary">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-text-secondary">
                    /{plan.billingCycle}
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-brand text-white py-2 px-4 rounded-lg hover:bg-brand-hover transition-colors">
                  Edit Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Plan Distribution
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Basic</span>
                  <span className="font-semibold">
                    {subscriptionAnalytics.planDistribution.basic}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Premium</span>
                  <span className="font-semibold">
                    {subscriptionAnalytics.planDistribution.premium}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Enterprise</span>
                  <span className="font-semibold">
                    {subscriptionAnalytics.planDistribution.enterprise}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Key Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Churn Rate</span>
                  <span className="font-semibold text-red-600">
                    {subscriptionAnalytics.churnRate}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">ARPU</span>
                  <span className="font-semibold">
                    {formatCurrency(
                      subscriptionAnalytics.averageRevenuePerUser
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Total Revenue</span>
                  <span className="font-semibold">
                    {formatCurrency(subscriptionAnalytics.totalRevenue)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions Modal */}
      {showActionsModal && selectedSubscription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Subscription Actions</h3>
              <button
                onClick={() => setShowActionsModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <button
                onClick={() =>
                  handleSubscriptionAction("suspend", selectedSubscription)
                }
                className="w-full flex items-center gap-2 p-3 text-left hover:bg-gray-50 rounded-lg"
              >
                <Pause className="w-4 h-4 text-yellow-600" />
                Suspend Subscription
              </button>
              <button
                onClick={() =>
                  handleSubscriptionAction("reactivate", selectedSubscription)
                }
                className="w-full flex items-center gap-2 p-3 text-left hover:bg-gray-50 rounded-lg"
              >
                <Play className="w-4 h-4 text-green-600" />
                Reactivate Subscription
              </button>
              <button
                onClick={() =>
                  handleSubscriptionAction("cancel", selectedSubscription)
                }
                className="w-full flex items-center gap-2 p-3 text-left hover:bg-gray-50 rounded-lg text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
