import { useAccountantDashboard } from "./context";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Calculator,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Receipt,
  ReceiptText,
  Building2,
} from "lucide-react";

export default function Dashboard() {
  const {
    accountant,
    financialRecords,
    taxRecords,
    invoices,
    expenseCategories,
    financialReports,
  } = useAccountantDashboard();

  // Calculate totals
  const totalIncome = financialRecords
    .filter(
      (record) => record.type === "income" && record.status === "approved"
    )
    .reduce((sum, record) => sum + record.amount, 0);

  const totalExpenses = financialRecords
    .filter(
      (record) => record.type === "expense" && record.status === "approved"
    )
    .reduce((sum, record) => sum + record.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  const pendingRecords = financialRecords.filter(
    (record) => record.status === "pending"
  ).length;
  const overdueTaxes = taxRecords.filter(
    (tax) => tax.status === "overdue"
  ).length;
  const overdueInvoices = invoices.filter(
    (invoice) => invoice.status === "overdue"
  ).length;

  const totalBudget = expenseCategories.reduce(
    (sum, category) => sum + category.budget,
    0
  );
  const totalSpent = expenseCategories.reduce(
    (sum, category) => sum + category.spent,
    0
  );
  const budgetUtilization = (totalSpent / totalBudget) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "paid":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "income":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "expense":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case "transfer":
        return <BarChart3 className="w-4 h-4 text-blue-600" />;
      case "adjustment":
        return <Calculator className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">
          Accountant Dashboard
        </h1>
        <p className="text-text-secondary">
          Welcome back, {accountant.name}. Here's your financial overview.
        </p>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Income</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalIncome)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Expenses</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Net Profit</p>
              <p
                className={`text-2xl font-bold ${
                  netProfit >= 0 ? "text-success" : "text-error"
                }`}
              >
                {formatCurrency(netProfit)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Budget Used</p>
              <p className="text-2xl font-bold text-text-primary">
                {budgetUtilization.toFixed(1)}%
              </p>
              <p className="text-xs text-text-muted">
                {formatCurrency(totalSpent)} / {formatCurrency(totalBudget)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts and Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {pendingRecords}
              </p>
              <p className="text-xs text-text-secondary">Pending Records</p>
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {overdueTaxes}
              </p>
              <p className="text-xs text-text-secondary">Overdue Taxes</p>
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {overdueInvoices}
              </p>
              <p className="text-xs text-text-secondary">Overdue Invoices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Financial Records */}
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Recent Financial Records
        </h2>
        <div className="space-y-3">
          {financialRecords.slice(0, 5).map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary"
            >
              <div className="flex items-center gap-3">
                {getTypeIcon(record.type)}
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {record.description}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {record.restaurantName} • {record.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-medium ${
                    record.type === "income" ? "text-success" : "text-error"
                  }`}
                >
                  {record.type === "income" ? "+" : "-"}
                  {formatCurrency(record.amount)}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    record.status
                  )}`}
                >
                  {record.status.charAt(0).toUpperCase() +
                    record.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax Overview */}
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Tax Obligations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {taxRecords.map((tax) => (
            <div
              key={tax.id}
              className="bg-white p-4 rounded-lg border border-border-secondary"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-medium text-text-primary">
                  {tax.type}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    tax.status
                  )}`}
                >
                  {tax.status.charAt(0).toUpperCase() + tax.status.slice(1)}
                </span>
              </div>
              <p className="text-xs text-text-secondary mb-2">{tax.period}</p>
              <p className="text-lg font-semibold text-text-primary mb-2">
                {formatCurrency(tax.amount)}
              </p>
              <p className="text-xs text-text-secondary">
                Due: {new Date(tax.dueDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Expense Categories */}
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Expense Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {expenseCategories.map((category) => {
            const utilization = (category.spent / category.budget) * 100;
            return (
              <div
                key={category.id}
                className="bg-white p-4 rounded-lg border border-border-secondary"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-text-primary">
                    {category.name}
                  </h3>
                  <div
                    className={`w-3 h-3 rounded-full ${category.color}`}
                  ></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Budget:</span>
                    <span className="text-text-primary font-medium">
                      {formatCurrency(category.budget)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Spent:</span>
                    <span className="text-text-primary font-medium">
                      {formatCurrency(category.spent)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Remaining:</span>
                    <span className="text-success font-medium">
                      {formatCurrency(category.remaining)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${Math.min(utilization, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-text-secondary text-center">
                    {utilization.toFixed(1)}% used
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Recent Financial Reports
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {financialReports.map((report) => (
            <div
              key={report.id}
              className="bg-white p-4 rounded-lg border border-border-secondary"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-text-primary">
                    {report.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{report.period}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}
                >
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-text-secondary">Revenue:</span>
                  <span className="text-text-primary font-medium ml-2">
                    {formatCurrency(report.data.totalRevenue)}
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary">Expenses:</span>
                  <span className="text-text-primary font-medium ml-2">
                    {formatCurrency(report.data.totalExpenses)}
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary">Net Profit:</span>
                  <span className="text-success font-medium ml-2">
                    {formatCurrency(report.data.netProfit)}
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary">Tax Obligations:</span>
                  <span className="text-text-primary font-medium ml-2">
                    {formatCurrency(report.data.taxObligations)}
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border-secondary">
                <p className="text-xs text-text-muted">
                  Generated by {report.generatedBy} on{" "}
                  {new Date(report.generatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-text-primary">
              Add Record
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Receipt className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium text-text-primary">
              Create Invoice
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <ReceiptText className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium text-text-primary">
              Tax Report
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <BarChart3 className="w-6 h-6 text-orange-600" />
            <span className="text-sm font-medium text-text-primary">
              Generate Report
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
