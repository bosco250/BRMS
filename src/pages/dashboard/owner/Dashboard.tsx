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
} from "lucide-react";

export default function Dashboard() {
  const { owner, restaurants, financialData, staff, notifications } = useOwnerDashboard();

  // Calculate totals
  const totalRevenue = restaurants.reduce((sum, restaurant) => sum + restaurant.revenue, 0);
  const totalStaff = staff.length;
  const averageRating = restaurants.reduce((sum, restaurant) => sum + restaurant.rating, 0) / restaurants.length;
  const activeRestaurants = restaurants.filter(restaurant => restaurant.status === "active").length;
  const urgentNotifications = notifications.filter(notification => 
    notification.priority === "urgent" || notification.priority === "high"
  ).length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Owner Dashboard</h1>
        <p className="text-text-secondary">
          Welcome back, {owner.name}. Here's an overview of your business empire.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-text-primary">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Restaurants</p>
              <p className="text-2xl font-bold text-text-primary">{restaurants.length}</p>
              <p className="text-xs text-text-muted">{activeRestaurants} active</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Staff</p>
              <p className="text-2xl font-bold text-text-primary">{totalStaff}</p>
              <p className="text-xs text-text-muted">Across all locations</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Avg Rating</p>
              <p className="text-2xl font-bold text-text-primary">{averageRating.toFixed(1)}</p>
              <p className="text-xs text-text-muted">Customer satisfaction</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Financial Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {financialData.slice(0, 3).map((data) => (
            <div key={data.id} className="bg-white p-4 rounded-lg border border-border-secondary">
              <h3 className="text-sm font-medium text-text-primary mb-2">{data.month}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Revenue:</span>
                  <span className="text-text-primary font-medium">{formatCurrency(data.revenue)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Expenses:</span>
                  <span className="text-text-primary font-medium">{formatCurrency(data.expenses)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Profit:</span>
                  <span className="text-success font-medium">{formatCurrency(data.profit)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Orders:</span>
                  <span className="text-text-primary font-medium">{data.orders}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurant Performance */}
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Restaurant Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white p-4 rounded-lg border border-border-secondary">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-text-primary">{restaurant.name}</h3>
                  <p className="text-sm text-text-secondary">{restaurant.location}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  restaurant.status === "active" 
                    ? "bg-green-100 text-green-800" 
                    : restaurant.status === "maintenance"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Revenue:</span>
                  <span className="text-text-primary font-medium">{formatCurrency(restaurant.revenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Staff:</span>
                  <span className="text-text-primary font-medium">{restaurant.staffCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Rating:</span>
                  <span className="text-text-primary font-medium">{restaurant.rating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Type:</span>
                  <span className="text-text-primary font-medium capitalize">{restaurant.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Notifications</h2>
        <div className="space-y-3">
          {notifications.slice(0, 5).map((notification) => (
            <div key={notification.id} className={`flex items-start gap-3 p-3 rounded-lg ${
              notification.read ? "bg-white" : "bg-blue-50"
            } border border-border-secondary`}>
              <div className={`w-2 h-2 rounded-full mt-2 ${
                notification.priority === "urgent" ? "bg-red-500" :
                notification.priority === "high" ? "bg-orange-500" :
                notification.priority === "medium" ? "bg-yellow-500" : "bg-blue-500"
              }`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-text-primary">{notification.title}</h4>
                  <span className="text-xs text-text-muted">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
                {notification.actionRequired && (
                  <span className="inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    Action Required
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Building2 className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-text-primary">Add Restaurant</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Users className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium text-text-primary">Hire Staff</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium text-text-primary">View Reports</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Calendar className="w-6 h-6 text-orange-600" />
            <span className="text-sm font-medium text-text-primary">Schedule Meeting</span>
          </button>
        </div>
      </div>
    </div>
  );
}
