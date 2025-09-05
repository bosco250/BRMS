import { useState, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Download,
  Calendar,
  RefreshCw,
  FileText,
  Calculator,
  FileSpreadsheet,
  X,
  Clock,
  ShoppingCart,
  Utensils,
} from "lucide-react";
import { toast } from "react-toastify";

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  status: "active" | "inactive";
  establishedDate: string;
  totalTables: number;
  totalStaff: number;
}

interface DailyOperation {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
  orders: number;
  customers: number;
  averageOrderValue: number;
  tableOccupancy: number;
  staffHours: number;
}

interface ReportData {
  title: string;
  period: string;
  generatedDate: string;
  restaurant: Restaurant;
  summary: {
    totalRevenue: number;
    totalExpenses: number;
    totalProfit: number;
    profitMargin: string;
    totalOrders: number;
    totalCustomers: number;
    expenseRatio: string;
    averageOrderValue: number;
    tableOccupancy: number;
  };
  dailyData: DailyOperation[];
  operations: {
    peakHours: string[];
    popularItems: Array<{ name: string; orders: number; revenue: number }>;
    staffPerformance: Array<{
      name: string;
      role: string;
      hours: number;
      efficiency: number;
    }>;
    tableUtilization: Array<{
      tableNumber: string;
      occupancy: number;
      revenue: number;
    }>;
  };
}

// ============================================================================
// MOCK DATA - ACCOUNTANT'S RESTAURANT
// ============================================================================

// The accountant works for this specific restaurant
const accountantRestaurant: Restaurant = {
  id: "1",
  name: "Kigali City Restaurant",
  address: "KN 4 Ave, Kigali, Rwanda",
  phone: "+250 788 123 456",
  email: "info@kigalicity.rw",
  manager: "Jean Paul Nkurunziza",
  status: "active",
  establishedDate: "2020-01-15",
  totalTables: 25,
  totalStaff: 12,
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

const generateDailyOperations = (days: number): DailyOperation[] => {
  const operations: DailyOperation[] = [];
  const now = new Date();

  // Base metrics for Kigali City Restaurant
  const baseRevenue = 80000;
  const baseExpenses = baseRevenue * 0.65;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    operations.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      revenue: Math.floor(baseRevenue + (Math.random() - 0.5) * 20000),
      expenses: Math.floor(baseExpenses + (Math.random() - 0.5) * 10000),
      profit: 0, // Will be calculated
      orders: Math.floor(Math.random() * 40) + 20,
      customers: Math.floor(Math.random() * 35) + 15,
      averageOrderValue: 0, // Will be calculated
      tableOccupancy: Math.floor(Math.random() * 40) + 50,
      staffHours: Math.floor(Math.random() * 8) + 8,
    });
  }

  // Calculate derived values
  return operations.map((op) => ({
    ...op,
    profit: op.revenue - op.expenses,
    averageOrderValue: op.orders > 0 ? Math.floor(op.revenue / op.orders) : 0,
  }));
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Reports() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [timeRange, setTimeRange] = useState("month");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState("pdf");
  const [customDateRange, setCustomDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // ============================================================================
  // DATA GENERATION
  // ============================================================================

  const timeRangeOptions = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
    { value: "year", label: "This Year" },
    { value: "custom", label: "Custom Range" },
  ];

  const getFilteredData = (): DailyOperation[] => {
    const days =
      timeRange === "today"
        ? 1
        : timeRange === "week"
        ? 7
        : timeRange === "month"
        ? 30
        : timeRange === "quarter"
        ? 90
        : timeRange === "year"
        ? 365
        : 30;

    return generateDailyOperations(days);
  };

  const filteredData = useMemo(() => getFilteredData(), [timeRange]);

  // ============================================================================
  // CALCULATIONS
  // ============================================================================

  const totalRevenue = filteredData.reduce((sum, day) => sum + day.revenue, 0);
  const totalExpenses = filteredData.reduce(
    (sum, day) => sum + day.expenses,
    0
  );
  const totalProfit = filteredData.reduce((sum, day) => sum + day.profit, 0);
  const totalOrders = filteredData.reduce((sum, day) => sum + day.orders, 0);
  const totalCustomers = filteredData.reduce(
    (sum, day) => sum + day.customers,
    0
  );
  const averageOrderValue =
    totalOrders > 0 ? Math.floor(totalRevenue / totalOrders) : 0;
  const averageTableOccupancy =
    filteredData.length > 0
      ? Math.floor(
          filteredData.reduce((sum, day) => sum + day.tableOccupancy, 0) /
            filteredData.length
        )
      : 0;

  const currentRevenue = filteredData[filteredData.length - 1]?.revenue || 0;
  const previousRevenue = filteredData[filteredData.length - 2]?.revenue || 0;
  const revenueGrowth = getGrowthRate(currentRevenue, previousRevenue);

  const currentProfit = filteredData[filteredData.length - 1]?.profit || 0;
  const previousProfit = filteredData[filteredData.length - 2]?.profit || 0;
  const profitGrowth = getGrowthRate(currentProfit, previousProfit);

  // ============================================================================
  // REPORT DATA GENERATION
  // ============================================================================

  const generateReportData = (): ReportData => {
    const period =
      timeRange === "custom"
        ? `${customDateRange.startDate} to ${customDateRange.endDate}`
        : timeRangeOptions.find((opt) => opt.value === timeRange)?.label ||
          "This Month";

    return {
      title: `${accountantRestaurant.name} - Financial Report`,
      period,
      generatedDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      restaurant: accountantRestaurant,
      summary: {
        totalRevenue,
        totalExpenses,
        totalProfit,
        profitMargin:
          totalRevenue > 0
            ? ((totalProfit / totalRevenue) * 100).toFixed(1)
            : "0.0",
        totalOrders,
        totalCustomers,
        expenseRatio:
          totalRevenue > 0
            ? ((totalExpenses / totalRevenue) * 100).toFixed(1)
            : "0.0",
        averageOrderValue,
        tableOccupancy: averageTableOccupancy,
      },
      dailyData: filteredData,
      operations: {
        peakHours: ["12:00-14:00", "18:00-20:00", "20:00-22:00"],
        popularItems: [
          { name: "Grilled Chicken", orders: 45, revenue: 225000 },
          { name: "Beef Steak", orders: 32, revenue: 192000 },
          { name: "Fish Fillet", orders: 28, revenue: 168000 },
          { name: "Vegetable Pasta", orders: 25, revenue: 125000 },
        ],
        staffPerformance: [
          {
            name: "Jean Paul Nkurunziza",
            role: "Manager",
            hours: 40,
            efficiency: 95,
          },
          {
            name: "Marie Uwimana",
            role: "Head Chef",
            hours: 38,
            efficiency: 92,
          },
          {
            name: "Patrick Habimana",
            role: "Waiter",
            hours: 35,
            efficiency: 88,
          },
          {
            name: "Claire Mukamana",
            role: "Cashier",
            hours: 32,
            efficiency: 90,
          },
        ],
        tableUtilization: Array.from(
          { length: accountantRestaurant.totalTables },
          (_, i) => ({
            tableNumber: `T${i + 1}`,
            occupancy: Math.floor(Math.random() * 40) + 50,
            revenue: Math.floor(Math.random() * 50000) + 20000,
          })
        ),
      },
    };
  };

  // ============================================================================
  // EXPORT FUNCTIONS
  // ============================================================================

  const handleExportReport = async (format: string) => {
    try {
      setIsGenerating(true);
      const reportData = generateReportData();
      const baseFileName = `${accountantRestaurant.name
        .toLowerCase()
        .replace(/\s+/g, "-")}-report-${timeRange}-${
        new Date().toISOString().split("T")[0]
      }`;

      if (format === "pdf") {
        await exportToPDF(reportData);
      } else if (format === "excel") {
        await exportToExcel(reportData, `${baseFileName}.csv`);
      }

      toast.success(`${format.toUpperCase()} report exported successfully!`);
      setShowExportModal(false);
    } catch (error) {
      toast.error(`Failed to export ${format.toUpperCase()} report`);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportToPDF = async (data: ReportData) => {
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${data.title}</title>
          <style>
            @page { 
              size: A4; 
              margin: 15mm; 
              @bottom-center { content: "Page " counter(page) " of " counter(pages); }
            }
            body { 
              font-family: 'Arial', sans-serif; 
              margin: 0; 
              padding: 0; 
              color: #333; 
              line-height: 1.4;
              font-size: 12px;
            }
            .header { 
              text-align: center; 
              margin-bottom: 25px; 
              border-bottom: 3px solid #2563eb; 
              padding-bottom: 15px; 
            }
            .header h1 { 
              color: #1e40af; 
              margin: 0; 
              font-size: 24px;
              font-weight: bold;
            }
            .restaurant-info {
              background: #f8fafc;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #2563eb;
            }
            .summary { 
              display: grid; 
              grid-template-columns: repeat(3, 1fr); 
              gap: 15px; 
              margin: 20px 0; 
            }
            .summary-card { 
              background: #f8fafc; 
              padding: 15px; 
              border-radius: 6px; 
              text-align: center; 
              border: 1px solid #e5e7eb;
              border-left: 4px solid #2563eb;
            }
            .summary-card h3 { 
              margin: 0 0 8px 0; 
              color: #1e40af; 
              font-size: 11px;
              font-weight: 600;
            }
            .summary-card .value { 
              font-size: 18px; 
              font-weight: bold; 
              color: #1f2937; 
              margin: 0;
            }
            .data-table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 15px 0; 
              font-size: 10px;
            }
            .data-table th, .data-table td { 
              border: 1px solid #d1d5db; 
              padding: 6px; 
              text-align: left; 
            }
            .data-table th { 
              background: #2563eb; 
              color: white; 
              font-weight: 600;
              font-size: 9px;
            }
            .data-table tr:nth-child(even) { 
              background: #f9fafb; 
            }
            .currency { 
              text-align: right; 
              font-weight: 600;
            }
            .positive { color: #059669; font-weight: 600; }
            .negative { color: #dc2626; font-weight: 600; }
            .page-break { page-break-before: always; }
            @media print {
              body { -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${data.title}</h1>
            <p>Generated: ${data.generatedDate}</p>
            <p>Period: ${data.period}</p>
          </div>

          <div class="restaurant-info">
            <h2>${data.restaurant.name}</h2>
            <p><strong>Address:</strong> ${data.restaurant.address}</p>
            <p><strong>Phone:</strong> ${data.restaurant.phone}</p>
            <p><strong>Manager:</strong> ${data.restaurant.manager}</p>
            <p><strong>Tables:</strong> ${
              data.restaurant.totalTables
            } | <strong>Staff:</strong> ${data.restaurant.totalStaff}</p>
          </div>

          <div class="summary">
            <div class="summary-card">
              <h3>Total Revenue</h3>
              <div class="value">${formatCurrency(
                data.summary.totalRevenue
              )}</div>
            </div>
            <div class="summary-card">
              <h3>Total Expenses</h3>
              <div class="value">${formatCurrency(
                data.summary.totalExpenses
              )}</div>
            </div>
            <div class="summary-card">
              <h3>Net Profit</h3>
              <div class="value">${formatCurrency(
                data.summary.totalProfit
              )}</div>
            </div>
            <div class="summary-card">
              <h3>Profit Margin</h3>
              <div class="value">${data.summary.profitMargin}%</div>
            </div>
            <div class="summary-card">
              <h3>Total Orders</h3>
              <div class="value">${data.summary.totalOrders.toLocaleString()}</div>
            </div>
            <div class="summary-card">
              <h3>Avg Order Value</h3>
              <div class="value">${formatCurrency(
                data.summary.averageOrderValue
              )}</div>
            </div>
          </div>

          <h2>Daily Operations</h2>
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Revenue</th>
                <th>Expenses</th>
                <th>Profit</th>
                <th>Orders</th>
                <th>Customers</th>
                <th>Avg Order</th>
                <th>Table Occupancy</th>
              </tr>
            </thead>
            <tbody>
              ${data.dailyData
                .map(
                  (day: DailyOperation) => `
                <tr>
                  <td>${day.date}</td>
                  <td class="currency">${formatCurrency(day.revenue)}</td>
                  <td class="currency">${formatCurrency(day.expenses)}</td>
                  <td class="currency ${
                    day.profit >= 0 ? "positive" : "negative"
                  }">${formatCurrency(day.profit)}</td>
                  <td>${day.orders}</td>
                  <td>${day.customers}</td>
                  <td class="currency">${formatCurrency(
                    day.averageOrderValue
                  )}</td>
                  <td>${day.tableOccupancy}%</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
        </html>
      `;

      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();

        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print();
            setTimeout(() => {
              printWindow.close();
            }, 1000);
          }, 500);
        };
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const exportToExcel = async (data: ReportData, fileName: string) => {
    try {
      let csvContent = "";

      // Restaurant Information
      csvContent += `${data.restaurant.name} - Financial Report\n`;
      csvContent += `Generated: ${data.generatedDate}\n`;
      csvContent += `Period: ${data.period}\n`;
      csvContent += `Address: ${data.restaurant.address}\n`;
      csvContent += `Manager: ${data.restaurant.manager}\n\n`;

      // Financial Summary
      csvContent += `Financial Summary\n`;
      csvContent += `Metric,Value\n`;
      csvContent += `Total Revenue,${data.summary.totalRevenue}\n`;
      csvContent += `Total Expenses,${data.summary.totalExpenses}\n`;
      csvContent += `Net Profit,${data.summary.totalProfit}\n`;
      csvContent += `Profit Margin,${data.summary.profitMargin}%\n`;
      csvContent += `Total Orders,${data.summary.totalOrders}\n`;
      csvContent += `Total Customers,${data.summary.totalCustomers}\n`;
      csvContent += `Average Order Value,${data.summary.averageOrderValue}\n`;
      csvContent += `Table Occupancy,${data.summary.tableOccupancy}%\n\n`;

      // Daily Operations
      csvContent += `Daily Operations\n`;
      csvContent += `Date,Revenue,Expenses,Profit,Orders,Customers,Avg Order Value,Table Occupancy\n`;
      data.dailyData.forEach((day: DailyOperation) => {
        csvContent += `${day.date},${day.revenue},${day.expenses},${day.profit},${day.orders},${day.customers},${day.averageOrderValue},${day.tableOccupancy}\n`;
      });

      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating Excel file:", error);
      toast.error("Failed to generate Excel file. Please try again.");
    }
  };

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  // Restaurant Information section hidden as requested
  const renderRestaurantInfo = () => null;

  const renderTimeRangeSelector = () => (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-text-secondary" />
        <span className="text-text-secondary">Time Range:</span>
      </div>
      <select
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
        className="px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary focus:ring-2 focus:ring-brand/20 focus:border-brand"
      >
        {timeRangeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {timeRange === "custom" && (
        <div className="flex items-center space-x-2">
          <input
            type="date"
            value={customDateRange.startDate}
            onChange={(e) =>
              setCustomDateRange((prev) => ({
                ...prev,
                startDate: e.target.value,
              }))
            }
            className="px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary"
          />
          <span className="text-text-secondary">to</span>
          <input
            type="date"
            value={customDateRange.endDate}
            onChange={(e) =>
              setCustomDateRange((prev) => ({
                ...prev,
                endDate: e.target.value,
              }))
            }
            className="px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary"
          />
        </div>
      )}
    </div>
  );

  const renderFinancialMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-dashboard border border-border-primary rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Total Revenue</p>
            <p className="text-2xl font-bold text-text-primary">
              {formatCurrency(totalRevenue)}
            </p>
            <div className="flex items-center mt-2">
              {revenueGrowth >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              )}
              <span
                className={`text-sm ${
                  revenueGrowth >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.abs(revenueGrowth).toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-dashboard border border-border-primary rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Total Expenses</p>
            <p className="text-2xl font-bold text-text-primary">
              {formatCurrency(totalExpenses)}
            </p>
            <p className="text-sm text-text-secondary mt-2">
              {((totalExpenses / totalRevenue) * 100).toFixed(1)}% of revenue
            </p>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <Calculator className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-dashboard border border-border-primary rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Net Profit</p>
            <p className="text-2xl font-bold text-text-primary">
              {formatCurrency(totalProfit)}
            </p>
            <div className="flex items-center mt-2">
              {profitGrowth >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              )}
              <span
                className={`text-sm ${
                  profitGrowth >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.abs(profitGrowth).toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-dashboard border border-border-primary rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Operations</p>
            <p className="text-2xl font-bold text-text-primary">
              {totalOrders.toLocaleString()}
            </p>
            <p className="text-sm text-text-secondary mt-2">
              {totalCustomers.toLocaleString()} customers
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderOperationsOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-dashboard border border-border-primary rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Utensils className="w-5 h-5 mr-2 text-brand" />
          Daily Operations Trend
        </h3>
        <div className="space-y-3">
          {filteredData.slice(-7).map((day, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-text-secondary w-16">
                {day.date}
              </span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-surface-primary rounded-full h-2">
                  <div
                    className="bg-brand h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (day.revenue /
                          Math.max(...filteredData.map((d) => d.revenue))) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-text-primary w-20 text-right">
                {formatCurrency(day.revenue)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dashboard border border-border-primary rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-brand" />
          Restaurant Performance
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Average Order Value</span>
            <span className="font-semibold text-text-primary">
              {formatCurrency(averageOrderValue)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Table Occupancy</span>
            <span className="font-semibold text-text-primary">
              {averageTableOccupancy}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Total Tables</span>
            <span className="font-semibold text-text-primary">
              {accountantRestaurant.totalTables}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Staff Members</span>
            <span className="font-semibold text-text-primary">
              {accountantRestaurant.totalStaff}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExportModal = () =>
    showExportModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-dashboard border border-border-primary rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Export Report
            </h3>
            <button
              onClick={() => setShowExportModal(false)}
              className="text-text-secondary hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-text-secondary mb-2">
              Restaurant: {accountantRestaurant.name}
            </p>
            <p className="text-sm text-text-secondary">
              Period:{" "}
              {timeRangeOptions.find((opt) => opt.value === timeRange)?.label}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="pdf"
                name="exportFormat"
                value="pdf"
                checked={exportFormat === "pdf"}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-4 h-4 text-brand focus:ring-brand"
              />
              <label htmlFor="pdf" className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-red-600" />
                <span>PDF Document (.pdf)</span>
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="excel"
                name="exportFormat"
                value="excel"
                checked={exportFormat === "excel"}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-4 h-4 text-brand focus:ring-brand"
              />
              <label htmlFor="excel" className="flex items-center space-x-2">
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
                <span>Excel Spreadsheet (.csv)</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowExportModal(false)}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleExportReport(exportFormat)}
              disabled={isGenerating}
              className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Restaurant Reports
          </h1>
          <p className="text-text-secondary">
            Generate comprehensive financial reports for restaurant operations
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Restaurant Information */}
      {renderRestaurantInfo()}

      {/* Time Range Selector */}
      {renderTimeRangeSelector()}

      {/* Financial Metrics */}
      {renderFinancialMetrics()}

      {/* Operations Overview */}
      {renderOperationsOverview()}

      {/* Export Modal */}
      {renderExportModal()}
    </div>
  );
}
