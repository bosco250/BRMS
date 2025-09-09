import { useState } from "react";
import {
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  BarChart3,
  Settings,
  X,
  Check,
  Pause,
  Play,
  RefreshCw,
  Download,
  Eye,
} from "lucide-react";

export default function SubscriptionManagement() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Mock subscription data for the business owner
  const currentSubscription = {
    id: "1",
    plan: "premium",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    amount: 299,
    billingCycle: "monthly",
    autoRenew: true,
    paymentMethod: "Visa ****1234",
    lastPaymentDate: "2024-12-15",
    nextBillingDate: "2025-01-15",
    features: [
      "Up to 25 users",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
      "API access",
      "Advanced reporting",
      "Inventory forecasting",
      "Multi-location support",
    ],
  };

  const availablePlans = [
    {
      id: "1",
      name: "Basic Plan",
      description: "Perfect for small restaurants and cafes",
      price: 99,
      billingCycle: "monthly",
      features: [
        "Up to 5 users",
        "Basic inventory management",
        "Order management",
        "Basic reporting",
        "Email support",
        "Mobile app access",
      ],
      limits: {
        users: 5,
        tables: 10,
        orders: 1000,
        storage: "5GB",
      },
      isPopular: false,
      isCurrent: false,
    },
    {
      id: "2",
      name: "Premium Plan",
      description: "Advanced features for growing businesses",
      price: 299,
      billingCycle: "monthly",
      features: [
        "Up to 25 users",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "API access",
        "Advanced reporting",
        "Inventory forecasting",
        "Multi-location support",
      ],
      limits: {
        users: 25,
        tables: 50,
        orders: 10000,
        storage: "50GB",
      },
      isPopular: true,
      isCurrent: true,
    },
    {
      id: "3",
      name: "Enterprise Plan",
      description: "Complete solution for large restaurant chains",
      price: 599,
      billingCycle: "monthly",
      features: [
        "Unlimited users",
        "All features included",
        "24/7 phone support",
        "Custom integrations",
        "White-label solution",
        "Advanced security",
        "Dedicated account manager",
        "Custom training",
      ],
      limits: {
        users: -1,
        tables: -1,
        orders: -1,
        storage: "Unlimited",
      },
      isPopular: false,
      isCurrent: false,
    },
  ];

  const paymentHistory = [
    {
      id: "1",
      amount: 299,
      currency: "RWF",
      status: "completed",
      paymentMethod: "Visa ****1234",
      paidAt: "2024-12-15T10:30:00Z",
      invoiceUrl: "#",
    },
    {
      id: "2",
      amount: 299,
      currency: "RWF",
      status: "completed",
      paymentMethod: "Visa ****1234",
      paidAt: "2024-11-15T10:30:00Z",
      invoiceUrl: "#",
    },
    {
      id: "3",
      amount: 299,
      currency: "RWF",
      status: "completed",
      paymentMethod: "Visa ****1234",
      paidAt: "2024-10-15T10:30:00Z",
      invoiceUrl: "#",
    },
  ];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Subscription Management
          </h1>
          <p className="text-text-secondary">
            Manage your subscription plan and billing
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            Download Invoice
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-primary">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "overview", name: "Overview", icon: BarChart3 },
            { id: "plans", name: "Plans", icon: Settings },
            { id: "billing", name: "Billing", icon: CreditCard },
            { id: "usage", name: "Usage", icon: TrendingUp },
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
          {/* Current Subscription */}
          <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Current Plan
                </h3>
                <p className="text-text-secondary">
                  Your active subscription details
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  currentSubscription.status
                )}`}
              >
                {currentSubscription.status.charAt(0).toUpperCase() +
                  currentSubscription.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Plan</p>
                    <p className="font-semibold text-text-primary capitalize">
                      {currentSubscription.plan}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Amount</p>
                    <p className="font-semibold text-text-primary">
                      {formatCurrency(currentSubscription.amount)}/
                      {currentSubscription.billingCycle}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Next Billing</p>
                    <p className="font-semibold text-text-primary">
                      {formatDate(currentSubscription.nextBillingDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border-primary">
              <h4 className="font-semibold text-text-primary mb-3">
                Plan Features
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentSubscription.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="bg-surface-card p-6 rounded-lg border border-border-primary hover:border-brand transition-colors text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-brand" />
                <h3 className="font-semibold text-text-primary">
                  Upgrade Plan
                </h3>
              </div>
              <p className="text-sm text-text-secondary">
                Get more features and higher limits
              </p>
            </button>

            <button className="bg-surface-card p-6 rounded-lg border border-border-primary hover:border-brand transition-colors text-left">
              <div className="flex items-center gap-3 mb-2">
                <Settings className="w-6 h-6 text-brand" />
                <h3 className="font-semibold text-text-primary">
                  Payment Method
                </h3>
              </div>
              <p className="text-sm text-text-secondary">
                Update your payment information
              </p>
            </button>

            <button
              onClick={() => setShowCancelModal(true)}
              className="bg-surface-card p-6 rounded-lg border border-border-primary hover:border-red-500 transition-colors text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <X className="w-6 h-6 text-red-500" />
                <h3 className="font-semibold text-text-primary">
                  Cancel Subscription
                </h3>
              </div>
              <p className="text-sm text-text-secondary">
                Cancel your subscription
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Plans Tab */}
      {activeTab === "plans" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-surface-card p-6 rounded-lg border border-border-primary ${
                  plan.isPopular ? "ring-2 ring-brand" : ""
                } ${plan.isCurrent ? "bg-brand/5" : ""}`}
              >
                {plan.isPopular && (
                  <div className="bg-brand text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                {plan.isCurrent && (
                  <div className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Current Plan
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
                <button
                  className={`w-full py-2 px-4 rounded-lg transition-colors ${
                    plan.isCurrent
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-brand text-white hover:bg-brand-hover"
                  }`}
                  disabled={plan.isCurrent}
                >
                  {plan.isCurrent ? "Current Plan" : "Upgrade Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          {/* Payment Method */}
          <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Payment Method
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-brand" />
                <div>
                  <p className="font-medium text-text-primary">
                    {currentSubscription.paymentMethod}
                  </p>
                  <p className="text-sm text-text-secondary">Expires 12/25</p>
                </div>
              </div>
              <button className="text-brand hover:text-brand-hover font-medium">
                Update
              </button>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-surface-card rounded-lg border border-border-primary overflow-hidden">
            <div className="p-6 border-b border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary">
                Payment History
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-border-secondary">
                  {paymentHistory.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-surface-secondary/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                        {formatDate(payment.paidAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            payment.status
                          )}`}
                        >
                          {payment.status.charAt(0).toUpperCase() +
                            payment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-brand hover:text-brand-hover mr-4">
                          <Eye className="w-4 h-4 inline mr-1" />
                          View
                        </button>
                        <button className="text-brand hover:text-brand-hover">
                          <Download className="w-4 h-4 inline mr-1" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Usage Tab */}
      {activeTab === "usage" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-text-primary">Users</h3>
              </div>
              <p className="text-2xl font-bold text-text-primary">12 / 25</p>
              <p className="text-sm text-text-secondary">48% of limit used</p>
            </div>

            <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-text-primary">Orders</h3>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                2,450 / 10,000
              </p>
              <p className="text-sm text-text-secondary">24.5% of limit used</p>
            </div>

            <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
              <div className="flex items-center gap-3 mb-2">
                <Settings className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-text-primary">Storage</h3>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                8.2 / 50 GB
              </p>
              <p className="text-sm text-text-secondary">16.4% of limit used</p>
            </div>
          </div>

          <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Usage Trends
            </h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-text-secondary">
                Usage charts would be displayed here
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upgrade Plan</h3>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-text-secondary mb-6">
              Choose a plan that better fits your business needs.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-brand text-white py-2 px-4 rounded-lg hover:bg-brand-hover transition-colors">
                Upgrade to Enterprise
              </button>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-600">
                Cancel Subscription
              </h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-text-secondary mb-6">
              Are you sure you want to cancel your subscription? You'll lose
              access to all premium features.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                Yes, Cancel Subscription
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Keep Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
