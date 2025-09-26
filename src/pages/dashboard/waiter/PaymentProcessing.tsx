import { useEffect, useMemo, useState } from "react";
import {
  CreditCard,
  DollarSign,
  Receipt,
  Printer,
  CheckCircle,
  AlertCircle,
  Clock,
  ShoppingCart,
  Banknote,
  Smartphone,
  Shield,
  Eye,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  X,
  Calendar,
  TrendingUp,
  Users,
} from "lucide-react";
import { useWaiterDashboard } from "./context";

export default function PaymentProcessing() {
  const { orders, addNotification } = useWaiterDashboard();
  const [activeTab, setActiveTab] = useState("payments");
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "cash" | "mobile_money"
  >("card");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
  type PaymentMethod = "card" | "cash" | "mobile_money";
  type Payment = {
    id: string;
    orderId: string;
    table?: number;
    customer: string;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    timestamp: string;
    completedAt?: string;
    receiptNumber?: string;
    items: { name: string; quantity: number; price: number }[];
  };

  const derivedPending: Payment[] = useMemo(
    () =>
      orders
        .filter((o) => o.status === "ready" || o.status === "served")
        .map((o) => ({
          id: `PAY-${o.id}`,
          orderId: o.orderNumber,
          table: o.tableNumber,
          customer: o.customerName,
          amount: o.total,
          method: paymentMethod,
          status: "pending",
          timestamp: o.createdAt,
          items: o.items.map((it) => ({
            name: it.name,
            quantity: it.quantity,
            price: it.price,
          })),
        })),
    [orders, paymentMethod]
  );

  const [completedPayments, setCompletedPayments] = useState<Payment[]>([
    {
      id: "PAY-COMPLETED-001",
      orderId: "ORD-003",
      table: 8,
      customer: "Alice Johnson",
      amount: 32000,
      method: "card",
      status: "completed",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      completedAt: new Date(Date.now() - 7000000).toISOString(),
      receiptNumber: "RCP-789123",
      items: [
        { name: "Steak Dinner", quantity: 1, price: 28000 },
        { name: "Wine", quantity: 1, price: 4000 },
      ],
    },
  ]);

  const [methodById, setMethodById] = useState<Record<string, PaymentMethod>>(
    {}
  );

  const allPayments: Payment[] = useMemo(() => {
    const pending = derivedPending.map((p) => ({
      ...p,
      method: (methodById[p.id] ?? p.method) as PaymentMethod,
    }));
    return [...pending, ...completedPayments].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [derivedPending, completedPayments, methodById]);

  const paymentMethods: {
    id: PaymentMethod;
    name: string;
    icon: any;
    color: string;
  }[] = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      color: "text-info bg-info/10",
    },
    {
      id: "cash",
      name: "Cash",
      icon: Banknote,
      color: "text-success bg-success/10",
    },
    {
      id: "mobile_money",
      name: "Mobile Money",
      icon: Smartphone,
      color: "text-accent bg-accent/10",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "failed":
        return "bg-error/10 text-error border-error/20";
      case "refunded":
        return "bg-surface-secondary text-text-secondary border-border-secondary";
      default:
        return "bg-surface-secondary text-text-secondary border-border-secondary";
    }
  };

  const getMethodColor = (method: PaymentMethod) => {
    switch (method) {
      case "card":
        return "text-info bg-info/10 border-info/20";
      case "cash":
        return "text-success bg-success/10 border-success/20";
      case "mobile_money":
        return "text-accent bg-accent/10 border-accent/20";
      default:
        return "text-text-secondary bg-surface-secondary border-border-secondary";
    }
  };

  const getMethodIcon = (method: PaymentMethod) => {
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
    const pay = allPayments.find(
      (p) => p.id === paymentId && p.status === "pending"
    );
    if (!pay) return;

    const completed: Payment = {
      ...pay,
      status: "completed",
      completedAt: new Date().toISOString(),
      receiptNumber: `RCP-${Date.now().toString().slice(-6)}`,
    };

    setCompletedPayments((prev) => [completed, ...prev]);
    addNotification({
      type: "table",
      title: "Payment Completed",
      message: `Payment for ${pay.orderId} by ${pay.customer} completed`,
      actionRequired: false,
      tableId: pay.table?.toString(),
    });
  };

  const handlePrintReceipt = (paymentId: string) => {
    // Print receipt functionality
  };

  // Auto-process served orders by default
  useEffect(() => {
    const servedOrderIds = new Set(
      orders.filter((o) => o.status === "served").map((o) => `PAY-${o.id}`)
    );
    const alreadyCompleted = new Set(completedPayments.map((p) => p.id));
    const toAutoProcess = derivedPending
      .filter((p) => servedOrderIds.has(p.id) && !alreadyCompleted.has(p.id))
      .map((p) => p.id);
    if (toAutoProcess.length > 0) {
      toAutoProcess.forEach((id) => handleProcessPayment(id));
    }
  }, [orders, derivedPending, completedPayments]);

  const stats = useMemo(() => {
    const pendingAmount = derivedPending.reduce((sum, p) => sum + p.amount, 0);
    const completedAmount = completedPayments.reduce(
      (sum, p) => sum + p.amount,
      0
    );
    const totalAmount = pendingAmount + completedAmount;

    return {
      pending: { count: derivedPending.length, amount: pendingAmount },
      completed: { count: completedPayments.length, amount: completedAmount },
      total: { amount: totalAmount },
      successRate: 98.5,
    };
  }, [derivedPending, completedPayments]);

  const filteredPayments = allPayments.filter(
    (p) =>
      searchQuery === "" ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.table?.toString() ?? "").includes(searchQuery)
  );

  const PaymentModal = () => {
    if (!showPaymentModal || !selectedPayment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full m-4 max-h-[90vh] overflow-auto">
          <div className="flex items-center justify-between p-6 border-b border-border-primary">
            <h2 className="text-lg font-semibold text-text-primary">
              Payment Details
            </h2>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="p-2 hover:bg-surface-secondary rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-4 bg-surface-secondary rounded-lg">
              <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">
                  {selectedPayment.orderId}
                </p>
                <p className="text-sm text-text-secondary">
                  {selectedPayment.customer} • Table {selectedPayment.table}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-text-primary">Items Ordered</h3>
              {selectedPayment.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-border-subtle last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {item.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-text-primary">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border-primary space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span>
                  {formatCurrency(Math.round(selectedPayment.amount / 1.28))}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tax (18%)</span>
                <span>
                  {formatCurrency(Math.round(selectedPayment.amount * 0.18))}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tip (10%)</span>
                <span>
                  {formatCurrency(Math.round(selectedPayment.amount * 0.1))}
                </span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-brand pt-2 border-t border-border-subtle">
                <span>Total</span>
                <span>{formatCurrency(selectedPayment.amount)}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              {selectedPayment.status === "pending" && (
                <button
                  onClick={() => {
                    handleProcessPayment(selectedPayment.id);
                    setShowPaymentModal(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Process Payment
                </button>
              )}
              <button
                onClick={() => {
                  handlePrintReceipt(selectedPayment.id);
                  setShowPaymentModal(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dashboard p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Payment Processing
            </h1>
            <p className="text-text-secondary mt-1">
              Process payments, print receipts, and manage transactions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-primary border border-border-primary text-text-primary rounded-lg hover:bg-surface-secondary transition-colors shadow-sm">
              <RefreshCw className="w-4 h-4 text-text-secondary" />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border-primary hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">
                  Pending Payments
                </p>
                <p className="text-3xl font-bold text-warning mt-1">
                  {stats.pending.count}
                </p>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-warning mr-1" />
                  <span className="text-text-secondary">
                    {formatCurrency(stats.pending.amount)} total
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 bg-warning/10 rounded-xl flex items-center justify-center">
                <Clock className="w-7 h-7 text-warning" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-border-primary hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">
                  Completed Today
                </p>
                <p className="text-3xl font-bold text-success mt-1">
                  {stats.completed.count}
                </p>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-success mr-1" />
                  <span className="text-text-secondary">
                    {formatCurrency(stats.completed.amount)} total
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 bg-success/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-success" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-border-primary hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-info mt-1">
                  {formatCurrency(stats.total.amount)}
                </p>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-info mr-1" />
                  <span className="text-text-secondary">Today's total</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-info/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-info" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-border-primary hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">
                  Success Rate
                </p>
                <p className="text-3xl font-bold text-accent mt-1">
                  {stats.successRate}%
                </p>
                <div className="flex items-center mt-2 text-sm">
                  <Shield className="w-4 h-4 text-accent mr-1" />
                  <span className="text-text-secondary">
                    Payment success rate
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-accent" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-border-primary overflow-x-hidden">
          <div className="border-b border-border-primary">
            <nav className="flex">
              {[
                {
                  id: "payments",
                  label: "Payment Processing",
                  icon: CreditCard,
                  count: allPayments.length,
                },
                {
                  id: "receipts",
                  label: "Receipt Management",
                  icon: Receipt,
                  count: completedPayments.length,
                },
                {
                  id: "refunds",
                  label: "Refunds",
                  icon: AlertCircle,
                  count: 0,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors relative ${
                    activeTab === tab.id
                      ? "border-brand text-brand bg-brand/5"
                      : "border-transparent text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span
                      className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        activeTab === tab.id
                          ? "bg-brand/10 text-brand"
                          : "bg-surface-secondary text-text-secondary"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "payments" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input
                      type="text"
                      placeholder="Search payments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-brand/50 focus:border-brand"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-text-secondary" />
                    <select className="border border-border-primary rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/50 focus:border-brand">
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>

                <div className="border border-border-primary rounded-lg">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border-subtle">
                      <thead className="bg-surface-secondary">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                            Payment
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                            Customer / Table
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                            Method
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-border-subtle">
                        {filteredPayments.map((payment) => (
                          <tr
                            key={payment.id}
                            className="hover:bg-surface-secondary transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                                  <ShoppingCart className="w-5 h-5 text-info" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-text-primary">
                                    {payment.orderId}
                                  </p>
                                  <p className="text-xs text-text-secondary font-mono">
                                    {payment.id}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <p className="text-sm font-medium text-text-primary">
                                  {payment.customer}
                                </p>
                                <p className="text-sm text-text-secondary">
                                  Table {payment.table ?? "-"}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">
                                <p className="font-semibold text-text-primary">
                                  {formatCurrency(payment.amount)}
                                </p>
                                <p className="text-text-secondary">
                                  {payment.items.length} items
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {payment.status === "pending" ? (
                                <select
                                  value={
                                    methodById[payment.id] ?? payment.method
                                  }
                                  onChange={(e) =>
                                    setMethodById((prev) => ({
                                      ...prev,
                                      [payment.id]: e.target
                                        .value as PaymentMethod,
                                    }))
                                  }
                                  className="text-sm border border-border-primary rounded-lg px-3 py-1 focus:ring-2 focus:ring-brand/50 focus:border-brand"
                                >
                                  <option value="card">Card</option>
                                  <option value="cash">Cash</option>
                                  <option value="mobile_money">
                                    Mobile Money
                                  </option>
                                </select>
                              ) : (
                                <span
                                  className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${getMethodColor(
                                    payment.method
                                  )}`}
                                >
                                  {getMethodIcon(payment.method)}
                                  {payment.method.replace("_", " ")}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                                  payment.status
                                )}`}
                              >
                                {payment.status.charAt(0).toUpperCase() +
                                  payment.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                              <div>
                                <div>
                                  {new Date(
                                    payment.timestamp
                                  ).toLocaleDateString()}
                                </div>
                                <div className="text-xs">
                                  {new Date(
                                    payment.timestamp
                                  ).toLocaleTimeString()}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end gap-2">
                                {payment.status === "pending" && (
                                  <button
                                    onClick={() =>
                                      handleProcessPayment(payment.id)
                                    }
                                    className="inline-flex items-center px-3 py-1 bg-success text-white text-xs font-medium rounded-lg hover:bg-success/90 transition-colors"
                                  >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Process
                                  </button>
                                )}
                                <button
                                  onClick={() => handlePrintReceipt(payment.id)}
                                  className="inline-flex items-center px-3 py-1 bg-brand text-white text-xs font-medium rounded-lg hover:bg-brand-hover transition-colors"
                                >
                                  <Printer className="w-3 h-3 mr-1" />
                                  Receipt
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedPayment(payment);
                                    setShowPaymentModal(true);
                                  }}
                                  className="p-2 text-text-secondary hover:text-brand hover:bg-brand/10 rounded-lg transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-surface-secondary p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Available Payment Methods
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? "border-brand bg-brand/5 shadow-sm"
                            : "border-border-primary bg-white hover:border-brand/50 hover:shadow-sm"
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${method.color}`}
                          >
                            <method.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">
                              {method.name}
                            </p>
                            <p className="text-sm text-success flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Available
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "receipts" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Receipt History
                  </h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-text-secondary" />
                    <select className="border border-border-primary rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/50 focus:border-brand">
                      <option value="all">All Receipts</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4">
                  {completedPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="bg-white p-6 rounded-lg border border-border-primary hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                            <Receipt className="w-6 h-6 text-success" />
                          </div>
                          <div>
                            <p className="font-semibold text-text-primary">
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
                            className={`px-3 py-1 text-xs font-medium rounded-full border ${getMethodColor(
                              payment.method
                            )}`}
                          >
                            {getMethodIcon(payment.method)}
                            {payment.method.replace("_", " ").toUpperCase()}
                          </span>
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                              payment.status
                            )}`}
                          >
                            {payment.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-text-primary">
                            {formatCurrency(payment.amount)}
                          </p>
                          <p className="text-sm text-text-secondary">
                            Completed:{" "}
                            {payment.completedAt
                              ? new Date(payment.completedAt).toLocaleString()
                              : "-"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePrintReceipt(payment.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
                          >
                            <Printer className="w-4 h-4" />
                            Re-print
                          </button>
                          <button
                            onClick={() => {
                              setSelectedPayment(payment);
                              setShowPaymentModal(true);
                            }}
                            className="p-2 text-text-secondary hover:text-brand hover:bg-brand/10 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border-subtle">
                        <p className="text-sm font-medium text-text-secondary mb-2">
                          Items ({payment.items.length})
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {payment.items.slice(0, 4).map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-text-secondary">
                                {item.quantity}x {item.name}
                              </span>
                              <span className="text-text-primary font-medium">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                          {payment.items.length > 4 && (
                            <div className="text-sm text-brand">
                              +{payment.items.length - 4} more items
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {completedPayments.length === 0 && (
                    <div className="text-center py-12">
                      <Receipt className="w-16 h-16 text-text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        No Receipts Yet
                      </h3>
                      <p className="text-text-secondary">
                        Completed payments will appear here with their receipts.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "refunds" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Refund Management
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors">
                    <Plus className="w-4 h-4" />
                    Process Refund
                  </button>
                </div>

                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-12 h-12 text-text-muted" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    No Refunds Pending
                  </h3>
                  <p className="text-text-secondary max-w-sm mx-auto">
                    All refunds have been processed successfully. Any new refund
                    requests will appear here.
                  </p>
                  <div className="mt-6 flex justify-center gap-4">
                    <button className="px-4 py-2 border border-border-primary text-text-primary rounded-lg hover:bg-surface-secondary transition-colors">
                      View Refund History
                    </button>
                    <button className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors">
                      Refund Policy
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-border-primary">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-error" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">
                          Total Refunds
                        </p>
                        <p className="text-2xl font-bold text-text-primary">
                          0
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-border-primary">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">
                          Refund Amount
                        </p>
                        <p className="text-2xl font-bold text-text-primary">
                          {formatCurrency(0)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-border-primary">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">
                          Refund Rate
                        </p>
                        <p className="text-2xl font-bold text-text-primary">
                          0%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <PaymentModal />
      </div>
    </div>
  );
}
