import React, { useState, useMemo } from "react";
import { useAccountantDashboard } from "./context";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Calendar,
  User,
  Building2,
  MoreVertical,
  X,
  Save,
  RefreshCw,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Receipt,
  CreditCard,
  Banknote,
  Calculator,
} from "lucide-react";

export default function FinancialRecords() {
  // DEBUG: Remove unused destructured values from context to fix lint errors
  const {} = useAccountantDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [businessFilter, setBusinessFilter] = useState("all");
  const [dateRange, setDateRange] = useState("month");
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  // Mock financial records data for demonstration
  const mockFinancialRecords = useMemo(
    () => [
      {
        id: "FR-001",
        businessId: 1,
        businessName: "Restaurant A",
        type: "income",
        category: "Food Sales",
        description: "Daily food sales revenue",
        amount: 250000,
        date: "2024-01-20",
        reference: "INV-001",
        status: "confirmed",
        notes: "Regular daily sales",
        attachments: [],
        createdBy: "John Manager",
        createdAt: "2024-01-20T10:00:00Z",
      },
      {
        id: "FR-002",
        businessId: 1,
        businessName: "Restaurant A",
        type: "expense",
        category: "Supplies",
        description: "Kitchen supplies purchase",
        amount: -45000,
        date: "2024-01-19",
        reference: "PO-001",
        status: "confirmed",
        notes: "Monthly kitchen supplies",
        attachments: ["receipt.pdf"],
        createdBy: "John Manager",
        createdAt: "2024-01-19T14:30:00Z",
      },
      {
        id: "FR-003",
        businessId: 2,
        businessName: "Restaurant B",
        type: "income",
        category: "Beverage Sales",
        description: "Bar sales revenue",
        amount: 180000,
        date: "2024-01-20",
        reference: "INV-002",
        status: "confirmed",
        notes: "Evening bar sales",
        attachments: [],
        createdBy: "Jane Manager",
        createdAt: "2024-01-20T22:00:00Z",
      },
      {
        id: "FR-004",
        businessId: 2,
        businessName: "Restaurant B",
        type: "expense",
        category: "Utilities",
        description: "Electricity bill payment",
        amount: -32000,
        date: "2024-01-18",
        reference: "UTIL-001",
        status: "confirmed",
        notes: "Monthly electricity bill",
        attachments: ["bill.pdf"],
        createdBy: "Jane Manager",
        createdAt: "2024-01-18T09:15:00Z",
      },
      {
        id: "FR-005",
        businessId: 3,
        businessName: "Restaurant C",
        type: "income",
        category: "Catering",
        description: "Corporate event catering",
        amount: 500000,
        date: "2024-01-17",
        reference: "CATER-001",
        status: "confirmed",
        notes: "Large corporate event",
        attachments: ["contract.pdf"],
        createdBy: "Mike Manager",
        createdAt: "2024-01-17T16:45:00Z",
      },
      {
        id: "FR-006",
        businessId: 3,
        businessName: "Restaurant C",
        type: "expense",
        category: "Staff",
        description: "Staff salary payments",
        amount: -280000,
        date: "2024-01-15",
        reference: "PAY-001",
        status: "confirmed",
        notes: "Monthly staff salaries",
        attachments: ["payroll.pdf"],
        createdBy: "Mike Manager",
        createdAt: "2024-01-15T08:00:00Z",
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "income":
        return "bg-green-100 text-green-800";
      case "expense":
        return "bg-red-100 text-red-800";
      case "transfer":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Food Sales":
      case "Beverage Sales":
      case "Catering":
        return <Receipt className="w-4 h-4" />;
      case "Supplies":
      case "Utilities":
        return <Calculator className="w-4 h-4" />;
      case "Staff":
        return <User className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // Calculate financial statistics
  const totalIncome = mockFinancialRecords
    .filter((record) => record.type === "income")
    .reduce((sum, record) => sum + record.amount, 0);
  const totalExpenses = Math.abs(
    mockFinancialRecords
      .filter((record) => record.type === "expense")
      .reduce((sum, record) => sum + record.amount, 0)
  );
  const netIncome = totalIncome - totalExpenses;
  const totalRecords = mockFinancialRecords.length;
  const confirmedRecords = mockFinancialRecords.filter(
    (record) => record.status === "confirmed"
  ).length;

  // Filter financial records
  const filteredRecords = useMemo(() => {
    return mockFinancialRecords.filter((record) => {
      const matchesSearch =
        record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "all" || record.type === typeFilter;
      const matchesBusiness =
        businessFilter === "all" ||
        record.businessId.toString() === businessFilter;

      return matchesSearch && matchesType && matchesBusiness;
    });
  }, [mockFinancialRecords, searchQuery, typeFilter, businessFilter]);

  const handleAddRecord = () => {
    setEditingRecord({
      businessId: 1,
      type: "income",
      category: "Food Sales",
      description: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      reference: "",
      notes: "",
    });
    setShowAddRecord(true);
  };

  const handleEditRecord = (record: any) => {
    setEditingRecord({ ...record });
    setShowAddRecord(true);
  };

  const handleSaveRecord = () => {
    // In a real app, this would save to the backend
    setShowAddRecord(false);
    setEditingRecord(null);
  };

  const getCategoryOptions = (type: string) => {
    if (type === "income") {
      return ["Food Sales", "Beverage Sales", "Catering", "Other Income"];
    } else if (type === "expense") {
      return ["Supplies", "Utilities", "Staff", "Rent", "Other Expenses"];
    }
    return ["Transfer", "Adjustment", "Other"];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Financial Records
          </h1>
          <p className="text-text-secondary">
            Manage and track all financial transactions
          </p>
        </div>
        <button
          onClick={handleAddRecord}
          className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Record</span>
        </button>
      </div>

      {/* Financial Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Income</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(totalIncome)}
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
              <p className="text-sm text-text-secondary">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Net Income</p>
              <p
                className={`text-2xl font-bold ${
                  netIncome >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatCurrency(netIncome)}
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
              <p className="text-sm text-text-secondary">Total Records</p>
              <p className="text-2xl font-bold text-text-primary">
                {totalRecords}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {confirmedRecords} confirmed
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
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
                placeholder="Search records by description, reference, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="transfer">Transfer</option>
            </select>
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
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button className="px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Financial Records Table */}
      <div className="bg-dashboard border border-border-primary rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Record
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Category
                </th>
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
            <tbody className="divide-y divide-border-primary">
              {filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-surface-secondary transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text-primary">
                      {record.reference}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {record.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {record.businessName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                        record.type
                      )}`}
                    >
                      {record.type === "income"
                        ? "Income"
                        : record.type === "expense"
                        ? "Expense"
                        : "Transfer"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(record.category)}
                      <span className="text-sm text-text-primary">
                        {record.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm font-medium ${
                        record.amount >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(Math.abs(record.amount))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedRecord(record)}
                        className="text-brand hover:text-brand-dark transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditRecord(record)}
                        className="text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-text-secondary hover:text-text-primary transition-colors">
                        <Download className="w-4 h-4" />
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

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dashboard rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">
                Financial Record Details
              </h2>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-surface-secondary rounded-lg p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Record Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Reference
                    </label>
                    <p className="text-text-primary">
                      {selectedRecord.reference}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Type
                    </label>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        selectedRecord.type
                      )}`}
                    >
                      {selectedRecord.type === "income"
                        ? "Income"
                        : selectedRecord.type === "expense"
                        ? "Expense"
                        : "Transfer"}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Category
                    </label>
                    <p className="text-text-primary">
                      {selectedRecord.category}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Status
                    </label>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedRecord.status
                      )}`}
                    >
                      {selectedRecord.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Date
                    </label>
                    <p className="text-text-primary">{selectedRecord.date}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Amount
                    </label>
                    <p
                      className={`font-medium ${
                        selectedRecord.amount >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(Math.abs(selectedRecord.amount))}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description and Notes */}
              <div className="bg-surface-secondary rounded-lg p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Description
                    </label>
                    <p className="text-text-primary">
                      {selectedRecord.description}
                    </p>
                  </div>
                  {selectedRecord.notes && (
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Notes
                      </label>
                      <p className="text-text-primary">
                        {selectedRecord.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className="bg-surface-secondary rounded-lg p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Metadata
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Business
                    </label>
                    <p className="text-text-primary">
                      {selectedRecord.businessName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Created By
                    </label>
                    <p className="text-text-primary">
                      {selectedRecord.createdBy}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Created At
                    </label>
                    <p className="text-text-primary">
                      {new Date(selectedRecord.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {selectedRecord.attachments.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Attachments
                      </label>
                      <div className="space-y-1">
                        {selectedRecord.attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <FileText className="w-4 h-4 text-text-secondary" />
                            <span className="text-sm text-text-primary">
                              {attachment}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-border-primary">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors">
                Edit Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Record Modal */}
      {showAddRecord && editingRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dashboard rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">
                {editingRecord.id
                  ? "Edit Financial Record"
                  : "Add Financial Record"}
              </h2>
              <button
                onClick={() => {
                  setShowAddRecord(false);
                  setEditingRecord(null);
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
                    value={editingRecord.businessId}
                    onChange={(e) =>
                      setEditingRecord({
                        ...editingRecord,
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
                    Type
                  </label>
                  <select
                    value={editingRecord.type}
                    onChange={(e) =>
                      setEditingRecord({
                        ...editingRecord,
                        type: e.target.value,
                        category: getCategoryOptions(e.target.value)[0],
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Category
                  </label>
                  <select
                    value={editingRecord.category}
                    onChange={(e) =>
                      setEditingRecord({
                        ...editingRecord,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    {getCategoryOptions(editingRecord.type).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Amount (RWF)
                  </label>
                  <input
                    type="number"
                    value={editingRecord.amount}
                    onChange={(e) =>
                      setEditingRecord({
                        ...editingRecord,
                        amount: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editingRecord.date}
                    onChange={(e) =>
                      setEditingRecord({
                        ...editingRecord,
                        date: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Reference
                  </label>
                  <input
                    type="text"
                    value={editingRecord.reference}
                    onChange={(e) =>
                      setEditingRecord({
                        ...editingRecord,
                        reference: e.target.value,
                      })
                    }
                    placeholder="e.g., INV-001, PO-001"
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={editingRecord.description}
                  onChange={(e) =>
                    setEditingRecord({
                      ...editingRecord,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Notes
                </label>
                <textarea
                  value={editingRecord.notes}
                  onChange={(e) =>
                    setEditingRecord({
                      ...editingRecord,
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
                  setShowAddRecord(false);
                  setEditingRecord(null);
                }}
                className="px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRecord}
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
