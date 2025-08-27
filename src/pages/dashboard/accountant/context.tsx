import React, { createContext, useContext, useMemo, useState } from "react";

export type Accountant = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string | null;
  joinDate: string;
  permissions: string[];
  department: string;
  reportsGenerated: number;
};

export type FinancialRecord = {
  id: string;
  date: string;
  type: "income" | "expense" | "transfer" | "adjustment";
  category: string;
  description: string;
  amount: number;
  reference: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvedAt?: string;
  restaurantId: string;
  restaurantName: string;
};

export type TaxRecord = {
  id: string;
  period: string;
  type: "VAT" | "Income Tax" | "Payroll Tax" | "Property Tax";
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  paymentDate?: string;
  reference: string;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  restaurantId: string;
  restaurantName: string;
};

export type ExpenseCategory = {
  id: string;
  name: string;
  budget: number;
  spent: number;
  remaining: number;
  color: string;
};

export type FinancialReport = {
  id: string;
  title: string;
  type: "daily" | "weekly" | "monthly" | "quarterly" | "annual";
  period: string;
  generatedAt: string;
  generatedBy: string;
  data: {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    taxObligations: number;
    outstandingInvoices: number;
    overduePayments: number;
  };
};

const mockAccountant: Accountant = {
  id: 1,
  name: "Emma Thompson",
  email: "emma.thompson@brms.com",
  phone: "+250 788 555 123",
  role: "Accountant",
  avatar: null,
  joinDate: "2022-03-10",
  permissions: ["financial", "reports", "tax", "invoices"],
  department: "Finance",
  reportsGenerated: 47,
};

const mockFinancialRecords: FinancialRecord[] = [
  {
    id: "FIN-001",
    date: "2024-08-20",
    type: "income",
    category: "Food Sales",
    description: "Daily restaurant sales",
    amount: 2500.00,
    reference: "SALES-2024-08-20",
    status: "approved",
    approvedBy: "Sarah Johnson",
    approvedAt: "2024-08-20T16:00:00Z",
    restaurantId: "REST-001",
    restaurantName: "La Casa Italiana",
  },
  {
    id: "FIN-002",
    date: "2024-08-20",
    type: "expense",
    category: "Supplies",
    description: "Kitchen supplies and ingredients",
    amount: 450.00,
    reference: "SUPPLIES-2024-08-20",
    status: "approved",
    approvedBy: "Sarah Johnson",
    approvedAt: "2024-08-20T14:30:00Z",
    restaurantId: "REST-001",
    restaurantName: "La Casa Italiana",
  },
  {
    id: "FIN-003",
    date: "2024-08-20",
    type: "expense",
    category: "Utilities",
    description: "Electricity and water bills",
    amount: 180.00,
    reference: "UTILITIES-2024-08-20",
    status: "pending",
    restaurantId: "REST-002",
    restaurantName: "Sky Lounge Bar",
  },
  {
    id: "FIN-004",
    date: "2024-08-19",
    type: "income",
    category: "Beverage Sales",
    description: "Bar sales for the day",
    amount: 1200.00,
    reference: "BAR-SALES-2024-08-19",
    status: "approved",
    approvedBy: "Maria Garcia",
    approvedAt: "2024-08-19T23:00:00Z",
    restaurantId: "REST-002",
    restaurantName: "Sky Lounge Bar",
  },
];

const mockTaxRecords: TaxRecord[] = [
  {
    id: "TAX-001",
    period: "August 2024",
    type: "VAT",
    amount: 4500.00,
    dueDate: "2024-09-20",
    status: "pending",
    reference: "VAT-AUG-2024",
  },
  {
    id: "TAX-002",
    period: "July 2024",
    type: "VAT",
    amount: 4200.00,
    dueDate: "2024-08-20",
    status: "paid",
    paymentDate: "2024-08-18",
    reference: "VAT-JUL-2024",
  },
  {
    id: "TAX-003",
    period: "Q2 2024",
    type: "Income Tax",
    amount: 15000.00,
    dueDate: "2024-09-30",
    status: "pending",
    reference: "INCOME-TAX-Q2-2024",
  },
  {
    id: "TAX-004",
    period: "August 2024",
    type: "Payroll Tax",
    amount: 2800.00,
    dueDate: "2024-09-15",
    status: "pending",
    reference: "PAYROLL-TAX-AUG-2024",
  },
];

const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    invoiceNumber: "INV-2024-001",
    customerName: "Corporate Event Ltd",
    customerEmail: "accounts@corporateevent.com",
    amount: 2500.00,
    tax: 250.00,
    total: 2750.00,
    status: "paid",
    issueDate: "2024-08-15",
    dueDate: "2024-08-30",
    paidDate: "2024-08-20",
    restaurantId: "REST-001",
    restaurantName: "La Casa Italiana",
  },
  {
    id: "INV-002",
    invoiceNumber: "INV-2024-002",
    customerName: "Wedding Planner Pro",
    customerEmail: "finance@weddingplanner.com",
    amount: 1800.00,
    tax: 180.00,
    total: 1980.00,
    status: "sent",
    issueDate: "2024-08-18",
    dueDate: "2024-09-02",
    restaurantId: "REST-001",
    restaurantName: "La Casa Italiana",
  },
  {
    id: "INV-003",
    invoiceNumber: "INV-2024-003",
    customerName: "Tech Startup Inc",
    customerEmail: "payables@techstartup.com",
    amount: 1200.00,
    tax: 120.00,
    total: 1320.00,
    status: "overdue",
    issueDate: "2024-08-01",
    dueDate: "2024-08-15",
    restaurantId: "REST-002",
    restaurantName: "Sky Lounge Bar",
  },
];

const mockExpenseCategories: ExpenseCategory[] = [
  {
    id: "CAT-001",
    name: "Food & Beverages",
    budget: 15000.00,
    spent: 12500.00,
    remaining: 2500.00,
    color: "bg-blue-500",
  },
  {
    id: "CAT-002",
    name: "Supplies",
    budget: 5000.00,
    spent: 3200.00,
    remaining: 1800.00,
    color: "bg-green-500",
  },
  {
    id: "CAT-003",
    name: "Utilities",
    budget: 3000.00,
    spent: 2800.00,
    remaining: 200.00,
    color: "bg-yellow-500",
  },
  {
    id: "CAT-004",
    name: "Maintenance",
    budget: 2000.00,
    spent: 1800.00,
    remaining: 200.00,
    color: "bg-purple-500",
  },
];

const mockFinancialReports: FinancialReport[] = [
  {
    id: "REP-001",
    title: "August 2024 Financial Summary",
    type: "monthly",
    period: "August 2024",
    generatedAt: "2024-08-20T09:00:00Z",
    generatedBy: "Emma Thompson",
    data: {
      totalRevenue: 95000.00,
      totalExpenses: 65000.00,
      netProfit: 30000.00,
      taxObligations: 4500.00,
      outstandingInvoices: 3300.00,
      overduePayments: 1320.00,
    },
  },
  {
    id: "REP-002",
    title: "Q2 2024 Financial Report",
    type: "quarterly",
    period: "Q2 2024 (Apr-Jun)",
    generatedAt: "2024-07-01T09:00:00Z",
    generatedBy: "Emma Thompson",
    data: {
      totalRevenue: 280000.00,
      totalExpenses: 190000.00,
      netProfit: 90000.00,
      taxObligations: 15000.00,
      outstandingInvoices: 8500.00,
      overduePayments: 2100.00,
    },
  },
];

interface AccountantDashboardContextType {
  accountant: Accountant;
  financialRecords: FinancialRecord[];
  taxRecords: TaxRecord[];
  invoices: Invoice[];
  expenseCategories: ExpenseCategory[];
  financialReports: FinancialReport[];
  updateFinancialRecordStatus: (recordId: string, status: FinancialRecord["status"], approvedBy?: string) => void;
  updateTaxRecordStatus: (recordId: string, status: TaxRecord["status"], paymentDate?: string) => void;
  updateInvoiceStatus: (invoiceId: string, status: Invoice["status"], paidDate?: string) => void;
  addFinancialRecord: (record: Omit<FinancialRecord, "id" | "date" | "status">) => void;
  generateFinancialReport: (type: FinancialReport["type"], period: string) => void;
}

const AccountantDashboardContext = createContext<AccountantDashboardContextType | undefined>(undefined);

export function AccountantDashboardProvider({ children }: { children: React.ReactNode }) {
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>(mockFinancialRecords);
  const [taxRecords, setTaxRecords] = useState<TaxRecord[]>(mockTaxRecords);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);

  const updateFinancialRecordStatus = (recordId: string, status: FinancialRecord["status"], approvedBy?: string) => {
    setFinancialRecords(prev => prev.map(record => 
      record.id === recordId 
        ? { 
            ...record, 
            status, 
            approvedBy: approvedBy || record.approvedBy,
            approvedAt: status === "approved" ? new Date().toISOString() : record.approvedAt
          }
        : record
    ));
  };

  const updateTaxRecordStatus = (recordId: string, status: TaxRecord["status"], paymentDate?: string) => {
    setTaxRecords(prev => prev.map(record => 
      record.id === recordId 
        ? { 
            ...record, 
            status, 
            paymentDate: status === "paid" ? (paymentDate || new Date().toISOString()) : record.paymentDate
          }
        : record
    ));
  };

  const updateInvoiceStatus = (invoiceId: string, status: Invoice["status"], paidDate?: string) => {
    setInvoices(prev => prev.map(invoice => 
      invoice.id === invoiceId 
        ? { 
            ...invoice, 
            status, 
            paidDate: status === "paid" ? (paidDate || new Date().toISOString()) : invoice.paidDate
          }
        : invoice
    ));
  };

  const addFinancialRecord = (record: Omit<FinancialRecord, "id" | "date" | "status">) => {
    const newRecord: FinancialRecord = {
      ...record,
      id: `FIN-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: "pending",
    };
    setFinancialRecords(prev => [newRecord, ...prev]);
  };

  const generateFinancialReport = (type: FinancialReport["type"], period: string) => {
    // This would typically call an API to generate a report
    console.log(`Generating ${type} report for ${period}`);
  };

  const value = useMemo(() => ({
    accountant: mockAccountant,
    financialRecords,
    taxRecords,
    invoices,
    expenseCategories: mockExpenseCategories,
    financialReports: mockFinancialReports,
    updateFinancialRecordStatus,
    updateTaxRecordStatus,
    updateInvoiceStatus,
    addFinancialRecord,
    generateFinancialReport,
  }), [financialRecords, taxRecords, invoices]);

  return (
    <AccountantDashboardContext.Provider value={value}>
      {children}
    </AccountantDashboardContext.Provider>
  );
}

export function useAccountantDashboard() {
  const context = useContext(AccountantDashboardContext);
  if (context === undefined) {
    throw new Error("useAccountantDashboard must be used within an AccountantDashboardProvider");
  }
  return context;
}
