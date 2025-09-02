import React, { useState, useMemo } from "react";
import { useAccountantDashboard } from "./context";
import {
  Calculator,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  FileText,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  RefreshCw,
  BarChart3,
  PieChart,
} from "lucide-react";

export default function TaxManagement() {
  const { financialData, transactions, businesses } = useAccountantDashboard();
  const [timeRange, setTimeRange] = useState("quarter");
  const [businessFilter, setBusinessFilter] = useState("all");
  const [showAddTaxRecord, setShowAddTaxRecord] = useState(false);
  const [selectedTaxRecord, setSelectedTaxRecord] = useState<any>(null);
  const [editingTaxRecord, setEditingTaxRecord] = useState<any>(null);

  // Mock tax data for demonstration
  const mockTaxData = useMemo(
    () => [
      {
        id: 1,
        businessId: 1,
        businessName: "Restaurant A",
        taxType: "VAT",
        period: "Q4 2024",
        dueDate: "2025-01-31",
        amount: 450000,
        paid: 450000,
        status: "paid",
        paymentDate: "2025-01-15",
        lateFees: 0,
        notes: "VAT for Q4 2024",
      },
      {
        id: 2,
        businessId: 1,
        businessName: "Restaurant A",
        taxType: "Income Tax",
        period: "2024",
        dueDate: "2025-03-31",
        amount: 1200000,
        paid: 0,
        status: "pending",
        paymentDate: null,
        lateFees: 0,
        notes: "Annual income tax for 2024",
      },
      {
        id: 3,
        businessId: 2,
        businessName: "Restaurant B",
        taxType: "VAT",
        period: "Q4 2024",
        dueDate: "2025-01-31",
        amount: 320000,
        paid: 0,
        status: "overdue",
        paymentDate: null,
        lateFees: 16000,
        notes: "VAT for Q4 2024 - Overdue",
      },
      {
        id: 4,
        businessId: 3,
        businessName: "Restaurant C",
        taxType: "VAT",
        period: "Q4 2024",
        dueDate: "2025-01-31",
        amount: 580000,
        paid: 580000,
        status: "paid",
        paymentDate: "2025-01-10",
        lateFees: 0,
        notes: "VAT for Q4 2024",
      },
      {
        id: 5,
        businessId: 3,
        businessName: "Restaurant C",
        taxType: "Withholding Tax",
        period: "Q4 2024",
        dueDate: "2025-01-31",
        amount: 180000,
        paid: 0,
        status: "pending",
        paymentDate: null,
        lateFees: 0,
        notes: "Withholding tax for Q4 2024",
      },
    ],
    []
  );

  const mockBusinesses = useMemo(
    () => [
      { id: 1, name: "Restaurant A" },
      { id: 2, name: "Restaurant B" },
      { id: 3, name: "Restaurant C" },
    ],
    []
  );

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
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTaxTypeColor = (taxType: string) => {
    switch (taxType) {
      case "VAT":
        return "bg-blue-100 text-blue-800";
      case "Income Tax":
        return "bg-purple-100 text-purple-800";
      case "Withholding Tax":
        return "bg-orange-100 text-orange-800";
      case "Corporate Tax":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate tax statistics
  const totalTaxObligations = mockTaxData.reduce(
    (sum, tax) => sum + tax.amount,
    0
  );
  const totalTaxPaid = mockTaxData.reduce((sum, tax) => sum + tax.paid, 0);
  const totalTaxPending = totalTaxObligations - totalTaxPaid;
  const totalLateFees = mockTaxData.reduce((sum, tax) => sum + tax.lateFees, 0);
  const overdueTaxes = mockTaxData.filter(
    (tax) => tax.status === "overdue"
  ).length;
  const pendingTaxes = mockTaxData.filter(
    (tax) => tax.status === "pending"
  ).length;

  // Filter tax records
  const filteredTaxData = useMemo(() => {
    return mockTaxData.filter((tax) => {
      const matchesBusiness =
        businessFilter === "all" ||
        tax.businessId.toString() === businessFilter;
      return matchesBusiness;
    });
  }, [mockTaxData, businessFilter]);

  const handleAddTaxRecord = () => {
    setEditingTaxRecord({
      businessId: 1,
      taxType: "VAT",
      period: "Q1 2025",
      dueDate: "2025-04-30",
      amount: 0,
      notes: "",
    });
    setShowAddTaxRecord(true);
  };

  const handleEditTaxRecord = (taxRecord: any) => {
    setEditingTaxRecord({ ...taxRecord });
    setShowAddTaxRecord(true);
  };

  const handleSaveTaxRecord = () => {
    // In a real app, this would save to the backend
    setShowAddTaxRecord(false);
    setEditingTaxRecord(null);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Tax Management
          </h1>
          <p className="text-text-secondary">
            Monitor tax obligations and manage tax payments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary"
          >
            <option value="month">Current Month</option>
            <option value="quarter">Current Quarter</option>
            <option value="year">Current Year</option>
          </select>
          <button
            onClick={handleAddTaxRecord}
            className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Tax Record</span>
          </button>
        </div>
      </div>

      {/* Tax Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">
                Total Tax Obligations
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalTaxObligations)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Tax Paid</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(totalTaxPaid)}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {((totalTaxPaid / totalTaxObligations) * 100).toFixed(1)}% of
                total
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
              <p className="text-sm text-text-secondary">Tax Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {formatCurrency(totalTaxPending)}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {pendingTaxes} pending taxes
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Late Fees</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(totalLateFees)}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {overdueTaxes} overdue taxes
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tax Records Table */}
      <div className="bg-dashboard border border-border-primary rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border-primary">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search tax records..."
                  className="w-full pl-10 pr-4 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={businessFilter}
                onChange={(e) => setBusinessFilter(e.target.value)}
                className="px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary"
              >
                <option value="all">All Businesses</option>
                {mockBusinesses.map((business) => (
                  <option key={business.id} value={business.id}>
                    {business.name}
                  </option>
                ))}
              </select>
              <button className="px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Tax Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Due Date
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
            <tbody className="divide-y divide-border-primary">
              {filteredTaxData.map((tax) => (
                <tr
                  key={tax.id}
                  className="hover:bg-surface-secondary transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text-primary">
                      {tax.businessName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTaxTypeColor(
                        tax.taxType
                      )}`}
                    >
                      {tax.taxType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {tax.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">
                      {tax.dueDate}
                    </div>
                    {tax.status === "pending" && (
                      <div className="text-xs text-text-secondary">
                        {getDaysUntilDue(tax.dueDate)} days left
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text-primary">
                      {formatCurrency(tax.amount)}
                    </div>
                    {tax.lateFees > 0 && (
                      <div className="text-xs text-red-600">
                        +{formatCurrency(tax.lateFees)} late fees
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        tax.status
                      )}`}
                    >
                      {getStatusIcon(tax.status)}
                      <span className="ml-1">{tax.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditTaxRecord(tax)}
                        className="text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-text-secondary hover:text-text-primary transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-text-secondary hover:text-text-primary transition-colors">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-700 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Calendar & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Upcoming Tax Deadlines
          </h3>
          <div className="space-y-3">
            {filteredTaxData
              .filter((tax) => tax.status === "pending")
              .sort(
                (a, b) =>
                  new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
              )
              .slice(0, 5)
              .map((tax) => (
                <div
                  key={tax.id}
                  className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTaxTypeColor(
                          tax.taxType
                        )}`}
                      >
                        {tax.taxType}
                      </span>
                      <span className="text-sm font-medium text-text-primary">
                        {tax.businessName}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">{tax.period}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">
                      {formatCurrency(tax.amount)}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Due in {getDaysUntilDue(tax.dueDate)} days
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Tax Summary by Type
          </h3>
          <div className="space-y-4">
            {["VAT", "Income Tax", "Withholding Tax"].map((taxType) => {
              const typeTaxes = filteredTaxData.filter(
                (tax) => tax.taxType === taxType
              );
              const totalAmount = typeTaxes.reduce(
                (sum, tax) => sum + tax.amount,
                0
              );
              const totalPaid = typeTaxes.reduce(
                (sum, tax) => sum + tax.paid,
                0
              );
              const pendingAmount = totalAmount - totalPaid;

              return (
                <div
                  key={taxType}
                  className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTaxTypeColor(
                        taxType
                      )}`}
                    >
                      {taxType}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">
                      {formatCurrency(totalAmount)}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {pendingAmount > 0
                        ? `${formatCurrency(pendingAmount)} pending`
                        : "All paid"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add/Edit Tax Record Modal */}
      {showAddTaxRecord && editingTaxRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dashboard rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">
                {editingTaxRecord.id ? "Edit Tax Record" : "Add Tax Record"}
              </h2>
              <button
                onClick={() => {
                  setShowAddTaxRecord(false);
                  setEditingTaxRecord(null);
                }}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Business
                  </label>
                  <select
                    value={editingTaxRecord.businessId}
                    onChange={(e) =>
                      setEditingTaxRecord({
                        ...editingTaxRecord,
                        businessId: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    {mockBusinesses.map((business) => (
                      <option key={business.id} value={business.id}>
                        {business.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Tax Type
                  </label>
                  <select
                    value={editingTaxRecord.taxType}
                    onChange={(e) =>
                      setEditingTaxRecord({
                        ...editingTaxRecord,
                        taxType: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    <option value="VAT">VAT</option>
                    <option value="Income Tax">Income Tax</option>
                    <option value="Withholding Tax">Withholding Tax</option>
                    <option value="Corporate Tax">Corporate Tax</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Period
                  </label>
                  <input
                    type="text"
                    value={editingTaxRecord.period}
                    onChange={(e) =>
                      setEditingTaxRecord({
                        ...editingTaxRecord,
                        period: e.target.value,
                      })
                    }
                    placeholder="e.g., Q1 2025"
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={editingTaxRecord.dueDate}
                    onChange={(e) =>
                      setEditingTaxRecord({
                        ...editingTaxRecord,
                        dueDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Amount (RWF)
                  </label>
                  <input
                    type="number"
                    value={editingTaxRecord.amount}
                    onChange={(e) =>
                      setEditingTaxRecord({
                        ...editingTaxRecord,
                        amount: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Notes
                </label>
                <textarea
                  value={editingTaxRecord.notes}
                  onChange={(e) =>
                    setEditingTaxRecord({
                      ...editingTaxRecord,
                      notes: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-border-primary">
              <button
                onClick={() => {
                  setShowAddTaxRecord(false);
                  setEditingTaxRecord(null);
                }}
                className="px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTaxRecord}
                className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Record</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
