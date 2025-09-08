import React, { useState } from "react";
import {
  CreditCard,
  DollarSign,
  Receipt,
  Printer,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  ShoppingCart,
  Calculator,
  Banknote,
  Smartphone,
  Wifi,
  Shield,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";

export default function PaymentProcessing() {
  const [activeTab, setActiveTab] = useState("payments");
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Mock data for payment processing
  const pendingPayments = [
    {
      id: "PAY-001",
      orderId: "ORD-001",
      table: 5,
      customer: "John Smith",
      amount: 45000,
      method: "card",
      status: "pending",
      timestamp: "2024-01-15T14:30:00Z",
      items: [
        { name: "Grilled Chicken", quantity: 1, price: 15000 },
        { name: "Caesar Salad", quantity: 1, price: 8000 },
        { name: "Coca Cola", quantity: 2, price: 2000 },
      ],
    },
    {
      id: "PAY-002",
      orderId: "ORD-002",
      table: 2,
      customer: "Jane Doe",
      amount: 28000,
      method: "cash",
      status: "pending",
      timestamp: "2024-01-15T14:25:00Z",
      items: [
        { name: "Pasta Carbonara", quantity: 1, price: 12000 },
        { name: "Garlic Bread", quantity: 1, price: 4000 },
        { name: "Orange Juice", quantity: 1, price: 3000 },
      ],
    },
  ];

  const completedPayments = [
    {
      id: "PAY-003",
      orderId: "ORD-003",
      table: 7,
      customer: "Mike Johnson",
      amount: 62000,
      method: "mobile_money",
      status: "completed",
      timestamp: "2024-01-15T14:15:00Z",
      completedAt: "2024-01-15T14:20:00Z",
      receiptNumber: "RCP-001",
    },
    {
      id: "PAY-004",
      orderId: "ORD-004",
      table: 3,
      customer: "Sarah Wilson",
      amount: 35000,
      method: "card",
      status: "completed",
      timestamp: "2024-01-15T14:10:00Z",
      completedAt: "2024-01-15T14:12:00Z",
      receiptNumber: "RCP-002",
    },
  ];

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      color: "text-blue-600",
    },
    { id: "cash", name: "Cash", icon: Banknote, color: "text-green-600" },
    {
      id: "mobile_money",
      name: "Mobile Money",
      icon: Smartphone,
      color: "text-purple-600",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "card":
        return "text-blue-600 bg-blue-50";
      case "cash":
        return "text-green-600 bg-green-50";
      case "mobile_money":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="w-4 h-4" />;
      case "cash":
        return <Banknote className="w-4 h-4" />;
      case "mobile_money":
        return <Smartphone className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const handleProcessPayment = (paymentId: string) => {
    // Process payment logic
    // Processing payment
  };

  const handlePrintReceipt = (paymentId: string) => {
    // Print receipt logic
    // Printing receipt
  };

  const handleRefund = (paymentId: string) => {
    // Refund logic
    // Processing refund
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Payment Processing
          </h1>
          <p className="text-text-secondary">
            Process payments, print receipts, and manage transactions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border-primary text-text-primary rounded-lg hover:bg-surface-secondary transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-600">
                {pendingPayments.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            {formatCurrency(
              pendingPayments.reduce((sum, p) => sum + p.amount, 0)
            )}{" "}
            total
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Completed Today</p>
              <p className="text-2xl font-bold text-green-600">
                {completedPayments.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            {formatCurrency(
              completedPayments.reduce((sum, p) => sum + p.amount, 0)
            )}{" "}
            total
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(
                  pendingPayments.reduce((sum, p) => sum + p.amount, 0) +
                    completedPayments.reduce((sum, p) => sum + p.amount, 0)
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">Today's total</div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Success Rate</p>
              <p className="text-2xl font-bold text-purple-600">98.5%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            Payment success rate
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-primary">
        <nav className="flex space-x-8">
          {[
            { id: "payments", label: "Payment Processing", icon: CreditCard },
            { id: "receipts", label: "Receipt Management", icon: Receipt },
            { id: "refunds", label: "Refunds", icon: AlertCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-brand text-brand"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Payment Processing */}
        {activeTab === "payments" && (
          <div className="space-y-6">
            {/* Pending Payments */}
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Pending Payments
                </h3>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search payments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-sm border border-border-primary rounded px-3 py-1"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {pendingPayments
                  .filter(
                    (payment) =>
                      searchQuery === "" ||
                      payment.id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      payment.customer
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      payment.table.toString().includes(searchQuery)
                  )
                  .map((payment) => (
                    <div
                      key={payment.id}
                      className="p-4 bg-white rounded-lg border border-border-primary"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
                            <ShoppingCart className="w-6 h-6 text-brand" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">
                              {payment.customer}
                            </p>
                            <p className="text-sm text-text-secondary">
                              Table {payment.table} • {payment.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getMethodColor(
                              payment.method
                            )}`}
                          >
                            {getMethodIcon(payment.method)}
                            {payment.method.replace("_", " ").toUpperCase()}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              payment.status
                            )}`}
                          >
                            {payment.status}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-text-primary mb-2">
                          Order Items
                        </h4>
                        <div className="space-y-2">
                          {payment.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-text-primary">
                                {item.name} x{item.quantity}
                              </span>
                              <span className="text-text-secondary">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-border-primary">
                          <div className="flex items-center justify-between font-medium">
                            <span className="text-text-primary">
                              Total Amount
                            </span>
                            <span className="text-lg text-brand">
                              {formatCurrency(payment.amount)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-text-secondary">
                          {new Date(payment.timestamp).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleProcessPayment(payment.id)}
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                          >
                            Process Payment
                          </button>
                          <button
                            onClick={() => handlePrintReceipt(payment.id)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                          >
                            <Printer className="w-4 h-4 mr-1" />
                            Print Receipt
                          </button>
                          <button className="p-2 text-text-secondary hover:text-text-primary">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Available Payment Methods
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? "border-brand bg-brand/5"
                        : "border-border-primary hover:border-brand/50"
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${method.color}`}
                      >
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">
                          {method.name}
                        </p>
                        <p className="text-sm text-text-secondary">Available</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Receipt Management */}
        {activeTab === "receipts" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Receipt History
                </h3>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-text-secondary" />
                  <select className="text-sm border border-border-primary rounded px-2 py-1">
                    <option value="all">All Receipts</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                {completedPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="p-4 bg-white rounded-lg border border-border-primary"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Receipt className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {payment.customer}
                          </p>
                          <p className="text-sm text-text-secondary">
                            Table {payment.table} • Receipt{" "}
                            {payment.receiptNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getMethodColor(
                            payment.method
                          )}`}
                        >
                          {getMethodIcon(payment.method)}
                          {payment.method.replace("_", " ").toUpperCase()}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            payment.status
                          )}`}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-text-primary">
                          {formatCurrency(payment.amount)}
                        </p>
                        <p className="text-sm text-text-secondary">
                          Completed:{" "}
                          {new Date(payment.completedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePrintReceipt(payment.id)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          <Printer className="w-4 h-4 mr-1" />
                          Re-print
                        </button>
                        <button className="p-1 text-text-secondary hover:text-text-primary">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Refunds */}
        {activeTab === "refunds" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Refund Management
                </h3>
                <button className="flex items-center gap-2 px-3 py-1 bg-brand text-white text-sm rounded hover:bg-brand-dark transition-colors">
                  <Plus className="w-4 h-4" />
                  Process Refund
                </button>
              </div>
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  No Refunds Pending
                </h3>
                <p className="text-text-secondary">
                  All refunds have been processed successfully.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
