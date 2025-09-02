import React, { useState, useMemo } from "react";
import { useManagerDashboard } from "./context";
import {
  Users,
  Search,
  Filter,
  Eye,
  Edit,
  MessageSquare,
  Star,
  Calendar,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  Clock,
  TrendingUp,
  Heart,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Download,
  MoreVertical,
  X,
} from "lucide-react";

export default function CustomerManagement() {
  const { staff, inventory } = useManagerDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  // Mock customer data (in real app, this would come from context/API)
  const customers = useMemo(
    () => [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+250 123 456 789",
        tier: "Gold",
        status: "active",
        totalSpent: 125000,
        totalOrders: 15,
        lastVisit: "2024-01-15",
        joinDate: "2023-03-10",
        preferences: ["Italian", "Seafood", "Wine"],
        allergies: ["Nuts"],
        loyaltyPoints: 1250,
        address: "Kigali, Rwanda",
        avatar: null,
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "+250 987 654 321",
        tier: "Silver",
        status: "active",
        totalSpent: 89000,
        totalOrders: 12,
        lastVisit: "2024-01-10",
        joinDate: "2023-06-15",
        preferences: ["Asian", "Vegetarian", "Tea"],
        allergies: [],
        loyaltyPoints: 890,
        address: "Kigali, Rwanda",
        avatar: null,
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike.johnson@email.com",
        phone: "+250 555 123 456",
        tier: "Bronze",
        status: "inactive",
        totalSpent: 45000,
        totalOrders: 8,
        lastVisit: "2023-12-20",
        joinDate: "2023-09-20",
        preferences: ["American", "Burgers", "Beer"],
        allergies: ["Dairy"],
        loyaltyPoints: 450,
        address: "Kigali, Rwanda",
        avatar: null,
      },
      {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        phone: "+250 777 888 999",
        tier: "Platinum",
        status: "active",
        totalSpent: 200000,
        totalOrders: 25,
        lastVisit: "2024-01-18",
        joinDate: "2022-11-05",
        preferences: ["French", "Fine Dining", "Champagne"],
        allergies: ["Shellfish"],
        loyaltyPoints: 2000,
        address: "Kigali, Rwanda",
        avatar: null,
      },
    ],
    []
  );

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery);
      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter;
      const matchesTier = tierFilter === "all" || customer.tier === tierFilter;

      return matchesSearch && matchesStatus && matchesTier;
    });
  }, [customers, searchQuery, statusFilter, tierFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "suspended":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Platinum":
        return "bg-purple-100 text-purple-800";
      case "Gold":
        return "bg-yellow-100 text-yellow-800";
      case "Silver":
        return "bg-gray-100 text-gray-800";
      case "Bronze":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCustomerStats = () => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(
      (c) => c.status === "active"
    ).length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const averageOrderValue =
      totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0);

    return { totalCustomers, activeCustomers, totalRevenue, averageOrderValue };
  };

  const stats = getCustomerStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Customer Management
          </h1>
          <p className="text-text-secondary">
            Manage customer relationships and data
          </p>
        </div>
        <button
          onClick={() => setShowAddCustomer(true)}
          className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Customer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Customers</p>
              <p className="text-2xl font-bold text-text-primary">
                {stats.totalCustomers}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active Customers</p>
              <p className="text-2xl font-bold text-text-primary">
                {stats.activeCustomers}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {((stats.activeCustomers / stats.totalCustomers) * 100).toFixed(
                  1
                )}
                % of total
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Avg Order Value</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(Math.round(stats.averageOrderValue))}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-dashboard border border-border-primary rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search customers by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary"
            >
              <option value="all">All Tiers</option>
              <option value="Platinum">Platinum</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
            <button className="px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-dashboard border border-border-primary rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-surface-secondary transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-surface-primary rounded-full flex items-center justify-center">
                        {customer.avatar ? (
                          <img
                            src={customer.avatar}
                            alt={customer.name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <Users className="w-5 h-5 text-text-secondary" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-text-primary">
                          {customer.name}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {customer.email}
                        </div>
                        <div className="text-sm text-text-secondary flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {customer.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierColor(
                        customer.tier
                      )}`}
                    >
                      {customer.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        customer.status
                      )}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {formatCurrency(customer.totalSpent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {customer.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowCustomerDetails(true);
                        }}
                        className="text-brand hover:text-brand-dark transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-text-secondary hover:text-text-primary transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-text-secondary hover:text-text-primary transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="text-text-secondary hover:text-text-primary transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {showCustomerDetails && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dashboard rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">
                Customer Details
              </h2>
              <button
                onClick={() => setShowCustomerDetails(false)}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-surface-secondary rounded-lg p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Name
                    </label>
                    <p className="text-text-primary">{selectedCustomer.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Email
                    </label>
                    <p className="text-text-primary">
                      {selectedCustomer.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Phone
                    </label>
                    <p className="text-text-primary">
                      {selectedCustomer.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Address
                    </label>
                    <p className="text-text-primary">
                      {selectedCustomer.address}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Join Date
                    </label>
                    <p className="text-text-primary">
                      {selectedCustomer.joinDate}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Last Visit
                    </label>
                    <p className="text-text-primary">
                      {selectedCustomer.lastVisit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Preferences & Allergies */}
              <div className="bg-surface-secondary rounded-lg p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Preferences & Allergies
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Cuisine Preferences
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedCustomer.preferences.map((pref, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-brand text-white text-xs rounded-full"
                        >
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Allergies
                    </label>
                    {selectedCustomer.allergies.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedCustomer.allergies.map((allergy, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                          >
                            {allergy}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-text-secondary text-sm">
                        No allergies recorded
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-surface-secondary rounded-lg p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Statistics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-brand">
                      {selectedCustomer.totalOrders}
                    </p>
                    <p className="text-sm text-text-secondary">Total Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(selectedCustomer.totalSpent)}
                    </p>
                    <p className="text-sm text-text-secondary">Total Spent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {selectedCustomer.loyaltyPoints}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Loyalty Points
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {selectedCustomer.tier}
                    </p>
                    <p className="text-sm text-text-secondary">Tier</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-border-primary">
              <button
                onClick={() => setShowCustomerDetails(false)}
                className="px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors">
                Edit Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
