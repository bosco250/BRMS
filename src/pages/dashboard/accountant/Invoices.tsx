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
  Send,
  Printer,
} from "lucide-react";

export default function Invoices() {
  // DEBUG: Remove unused destructured values from context to fix lint errors
  const {} = useAccountantDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [businessFilter, setBusinessFilter] = useState("all");
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);

  // Mock invoice data for demonstration
  const mockInvoices = useMemo(
    () => [
      {
        id: "INV-001",
        businessId: 1,
        businessName: "Restaurant A",
        customerName: "John Doe",
        customerEmail: "john.doe@email.com",
        invoiceNumber: "INV-001",
        issueDate: "2024-01-15",
        dueDate: "2024-02-15",
        amount: 125000,
        tax: 18750,
        total: 143750,
        status: "paid",
        paymentDate: "2024-01-20",
        items: [
          {
            name: "Grilled Chicken Breast",
            quantity: 2,
            price: 18990,
            total: 37980,
          },
          { name: "Caesar Salad", quantity: 1, price: 12990, total: 12990 },
          { name: "Fresh Coffee", quantity: 3, price: 3990, total: 11970 },
        ],
        notes: "Thank you for your business!",
      },
      {
        id: "INV-002",
        businessId: 1,
        businessName: "Restaurant A",
        customerName: "Jane Smith",
        customerEmail: "jane.smith@email.com",
        invoiceNumber: "INV-002",
        issueDate: "2024-01-16",
        dueDate: "2024-02-16",
        amount: 89000,
        tax: 13350,
        total: 102350,
        status: "pending",
        paymentDate: null,
        items: [
          { name: "Fish & Chips", quantity: 2, price: 16990, total: 33980 },
          { name: "Premium Red Wine", quantity: 1, price: 25990, total: 25990 },
          { name: "Chocolate Cake", quantity: 1, price: 8990, total: 8990 },
        ],
        notes: "Please pay within 30 days",
      },
      {
        id: "INV-003",
        businessId: 2,
        businessName: "Restaurant B",
        customerName: "Mike Johnson",
        customerEmail: "mike.johnson@email.com",
        invoiceNumber: "INV-003",
        issueDate: "2024-01-14",
        dueDate: "2024-02-14",
        amount: 45000,
        tax: 6750,
        total: 51750,
        status: "overdue",
        paymentDate: null,
        items: [{ name: "Burgers", quantity: 3, price: 15000, total: 45000 }],
        notes: "Payment overdue - please contact us",
      },
      {
        id: "INV-004",
        businessId: 3,
        businessName: "Restaurant C",
        customerName: "Sarah Wilson",
        customerEmail: "sarah.wilson@email.com",
        invoiceNumber: "INV-004",
        issueDate: "2024-01-18",
        dueDate: "2024-02-18",
        amount: 200000,
        tax: 30000,
        total: 230000,
        status: "draft",
        paymentDate: null,
        items: [
          {
            name: "Fine Dining Package",
            quantity: 1,
            price: 200000,
            total: 200000,
          },
        ],
        notes: "Draft invoice - not yet sent",
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
      case "draft":
        return "bg-gray-100 text-gray-800";
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
      case "draft":
        return <FileText className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Calculate invoice statistics
  const totalInvoices = mockInvoices.length;
  const totalAmount = mockInvoices.reduce(
    (sum, invoice) => sum + invoice.total,
    0
  );
  const paidInvoices = mockInvoices.filter(
    (invoice) => invoice.status === "paid"
  ).length;
  const pendingInvoices = mockInvoices.filter(
    (invoice) => invoice.status === "pending"
  ).length;
  const overdueInvoices = mockInvoices.filter(
    (invoice) => invoice.status === "overdue"
  ).length;
  const draftInvoices = mockInvoices.filter(
    (invoice) => invoice.status === "draft"
  ).length;

  // Filter invoices
  const filteredInvoices = useMemo(() => {
    return mockInvoices.filter((invoice) => {
      const matchesSearch =
        invoice.invoiceNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        invoice.customerName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        invoice.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || invoice.status === statusFilter;
      const matchesBusiness =
        businessFilter === "all" ||
        invoice.businessId.toString() === businessFilter;

      return matchesSearch && matchesStatus && matchesBusiness;
    });
  }, [mockInvoices, searchQuery, statusFilter, businessFilter]);

  const handleAddInvoice = () => {
    setEditingInvoice({
      businessId: 1,
      customerName: "",
      customerEmail: "",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      items: [{ name: "", quantity: 1, price: 0, total: 0 }],
      notes: "",
    });
    setShowAddInvoice(true);
  };

  const handleEditInvoice = (invoice: any) => {
    setEditingInvoice({ ...invoice });
    setShowAddInvoice(true);
  };

  const handleSaveInvoice = () => {
    // In a real app, this would save to the backend
    setShowAddInvoice(false);
    setEditingInvoice(null);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // DEBUG: Add explicit type for prev to fix lint error
  const addInvoiceItem = () => {
    setEditingInvoice((prev: any) => ({
      ...prev,
      items: [...(prev?.items || []), { name: "", quantity: 1, price: 0, total: 0 }],
    }));
  };

  // DEBUG: Add explicit types for prev, _, and i to fix lint errors
  const removeInvoiceItem = (index: number) => {
    setEditingInvoice((prev: any) => ({
      ...prev,
      items: prev.items.filter((_: any, i: number) => i !== index),
    }));
  };

  const updateInvoiceItem = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setEditingInvoice((prev: any) => {
      // DEBUG: Ensure prev is not undefined and items is an array
      if (!prev || !Array.isArray(prev.items)) return prev;

      const newItems = [...prev.items];
      // DEBUG: Defensive check for index bounds
      if (index < 0 || index >= newItems.length) return prev;

      newItems[index] = { ...newItems[index], [field]: value };

      // Recalculate total for this item
      if (field === "quantity" || field === "price") {
        // DEBUG: Ensure numeric values for calculation
        const quantity = Number(newItems[index].quantity) || 0;
        const price = Number(newItems[index].price) || 0;
        newItems[index].total = quantity * price;
      }

      return { ...prev, items: newItems };
    });
  };

  const calculateInvoiceTotals = (items: any[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.15; // 15% VAT
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Invoice Management
          </h1>
          <p className="text-text-secondary">
            Create, manage, and track customer invoices
          </p>
        </div>
        <button
          onClick={handleAddInvoice}
          className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Invoice</span>
        </button>
      </div>

      {/* Invoice Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Invoices</p>
              <p className="text-2xl font-bold text-text-primary">
                {totalInvoices}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Amount</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalAmount)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Paid</p>
              <p className="text-2xl font-bold text-green-600">
                {paidInvoices}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {((paidInvoices / totalInvoices) * 100).toFixed(1)}%
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
              <p className="text-sm text-text-secondary">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {pendingInvoices}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {((pendingInvoices / totalInvoices) * 100).toFixed(1)}%
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
              <p className="text-sm text-text-secondary">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                {overdueInvoices}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {((overdueInvoices / totalInvoices) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
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
                placeholder="Search invoices by number, customer name, or email..."
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
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="draft">Draft</option>
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
            <button className="px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-dashboard border border-border-primary rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Issue Date
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
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-surface-secondary transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text-primary">
                      {invoice.invoiceNumber}
                    </div>
                    <div className="text-sm text-text-secondary">
                      ID: {invoice.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text-primary">
                      {invoice.customerName}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {invoice.customerEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {invoice.businessName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {invoice.issueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">
                      {invoice.dueDate}
                    </div>
                    {invoice.status === "pending" && (
                      <div className="text-xs text-text-secondary">
                        {getDaysUntilDue(invoice.dueDate)} days left
                      </div>
                    )}
                    {invoice.status === "overdue" && (
                      <div className="text-xs text-red-600">
                        {Math.abs(getDaysUntilDue(invoice.dueDate))} days
                        overdue
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text-primary">
                      {formatCurrency(invoice.total)}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {formatCurrency(invoice.amount)} +{" "}
                      {formatCurrency(invoice.tax)} tax
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {getStatusIcon(invoice.status)}
                      <span className="ml-1">{invoice.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-brand hover:text-brand-dark transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditInvoice(invoice)}
                        className="text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-text-secondary hover:text-text-primary transition-colors">
                        <Download className="w-4 h-4" />
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

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dashboard rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">
                Invoice Details
              </h2>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors flex items-center space-x-2">
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button className="px-3 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="bg-surface-secondary rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Invoice Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">
                          Invoice Number:
                        </span>
                        <span className="font-medium text-text-primary">
                          {selectedInvoice.invoiceNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Issue Date:</span>
                        <span className="font-medium text-text-primary">
                          {selectedInvoice.issueDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Due Date:</span>
                        <span className="font-medium text-text-primary">
                          {selectedInvoice.dueDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Status:</span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            selectedInvoice.status
                          )}`}
                        >
                          {getStatusIcon(selectedInvoice.status)}
                          <span className="ml-1">{selectedInvoice.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Customer Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Name:</span>
                        <span className="font-medium text-text-primary">
                          {selectedInvoice.customerName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Email:</span>
                        <span className="font-medium text-text-primary">
                          {selectedInvoice.customerEmail}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Business:</span>
                        <span className="font-medium text-text-primary">
                          {selectedInvoice.businessName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Items */}
              <div className="bg-surface-secondary rounded-lg p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Invoice Items
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-primary">
                        <th className="text-left py-2 text-sm font-medium text-text-secondary">
                          Item
                        </th>
                        <th className="text-right py-2 text-sm font-medium text-text-secondary">
                          Quantity
                        </th>
                        <th className="text-right py-2 text-sm font-medium text-text-secondary">
                          Price
                        </th>
                        <th className="text-right py-2 text-sm font-medium text-text-secondary">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map(
                        (item: { name: string; quantity: number; price: number; total: number }, index: number) => (
                          <tr
                          key={index}
                          className="border-b border-border-primary"
                        >
                          <td className="py-2 text-sm text-text-primary">
                            {item.name}
                          </td>
                          <td className="py-2 text-sm text-text-primary text-right">
                            {item.quantity}
                          </td>
                          <td className="py-2 text-sm text-text-primary text-right">
                            {formatCurrency(item.price)}
                          </td>
                          <td className="py-2 text-sm font-medium text-text-primary text-right">
                            {formatCurrency(item.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Invoice Summary */}
              <div className="bg-surface-secondary rounded-lg p-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Subtotal:</span>
                      <span className="font-medium text-text-primary">
                        {formatCurrency(selectedInvoice.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Tax (15%):</span>
                      <span className="font-medium text-text-primary">
                        {formatCurrency(selectedInvoice.tax)}
                      </span>
                    </div>
                    <div className="border-t border-border-primary pt-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-text-primary">
                          Total:
                        </span>
                        <span className="text-lg font-bold text-text-primary">
                          {formatCurrency(selectedInvoice.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedInvoice.notes && (
                <div className="bg-surface-secondary rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Notes
                  </h3>
                  <p className="text-text-secondary">{selectedInvoice.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Invoice Modal */}
      {showAddInvoice && editingInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dashboard rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">
                {editingInvoice.id ? "Edit Invoice" : "Create Invoice"}
              </h2>
              <button
                onClick={() => {
                  setShowAddInvoice(false);
                  setEditingInvoice(null);
                }}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Business
                  </label>
                  <select
                    value={editingInvoice.businessId}
                    onChange={(e) =>
                      setEditingInvoice({
                        ...editingInvoice,
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
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={editingInvoice.customerName}
                    onChange={(e) =>
                      setEditingInvoice({
                        ...editingInvoice,
                        customerName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Customer Email
                  </label>
                  <input
                    type="email"
                    value={editingInvoice.customerEmail}
                    onChange={(e) =>
                      setEditingInvoice({
                        ...editingInvoice,
                        customerEmail: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={editingInvoice.issueDate}
                    onChange={(e) =>
                      setEditingInvoice({
                        ...editingInvoice,
                        issueDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={editingInvoice.dueDate}
                    onChange={(e) =>
                      setEditingInvoice({
                        ...editingInvoice,
                        dueDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
              </div>

              {/* Invoice Items */}
              <div className="bg-surface-secondary rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Invoice Items
                  </h3>
                  <button
                    onClick={addInvoiceItem}
                    className="px-3 py-1 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors text-sm"
                  >
                    Add Item
                  </button>
                </div>
                <div className="space-y-3">
                  {editingInvoice.items.map(
                    (
                      item: { name: string; quantity: number; price: number; total: number },
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="grid grid-cols-12 gap-2 items-center"
                      >
                        <div className="col-span-5">
                          <input
                            type="text"
                            placeholder="Item name"
                          value={item.name}
                          onChange={(e) =>
                            updateInvoiceItem(index, "name", e.target.value)
                          }
                          className="w-full px-2 py-1 border border-border-primary rounded bg-dashboard text-text-primary text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) =>
                            updateInvoiceItem(
                              index,
                              "quantity",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full px-2 py-1 border border-border-primary rounded bg-dashboard text-text-primary text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          placeholder="Price"
                          value={item.price}
                          onChange={(e) =>
                            updateInvoiceItem(
                              index,
                              "price",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full px-2 py-1 border border-border-primary rounded bg-dashboard text-text-primary text-sm"
                        />
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="text-sm font-medium text-text-primary">
                          {formatCurrency(item.total)}
                        </span>
                      </div>
                      <div className="col-span-1">
                        <button
                          onClick={() => removeInvoiceItem(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoice Summary */}
              <div className="bg-surface-secondary rounded-lg p-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    {(() => {
                      const { subtotal, tax, total } = calculateInvoiceTotals(
                        editingInvoice.items
                      );
                      return (
                        <>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">
                              Subtotal:
                            </span>
                            <span className="font-medium text-text-primary">
                              {formatCurrency(subtotal)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">
                              Tax (15%):
                            </span>
                            <span className="font-medium text-text-primary">
                              {formatCurrency(tax)}
                            </span>
                          </div>
                          <div className="border-t border-border-primary pt-2">
                            <div className="flex justify-between">
                              <span className="text-lg font-semibold text-text-primary">
                                Total:
                              </span>
                              <span className="text-lg font-bold text-text-primary">
                                {formatCurrency(total)}
                              </span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Notes
                </label>
                <textarea
                  value={editingInvoice.notes}
                  onChange={(e) =>
                    setEditingInvoice({
                      ...editingInvoice,
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
                  setShowAddInvoice(false);
                  setEditingInvoice(null);
                }}
                className="px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveInvoice}
                className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
