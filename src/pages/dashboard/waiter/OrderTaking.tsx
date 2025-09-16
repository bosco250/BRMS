import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useWaiterDashboard } from "./context";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Plus,
  Minus,
  ShoppingCart,
  Clock,
  Search,
  Trash2,
  CheckCircle,
  Utensils,
  Coffee,
  Wine,
  IceCream,
  RefreshCw,
  X,
  Calculator,
  Send,
  ArrowUp,
  ArrowDown,
  Filter,
  Users,
  Timer,
  DollarSign,
} from "lucide-react";

export default function OrderTaking() {
  type Category =
    | "All"
    | "Main Course"
    | "Salad"
    | "Dessert"
    | "Beverage"
    | "Alcohol";
  type OrderStatus = "new" | "sent";
  type ContextOrderStatus = "preparing" | "ready" | "served";
  type SortBy = "timestamp" | "table" | "total" | "urgency";
  type SortOrder = "asc" | "desc";
  type FilterStatus = "all" | OrderStatus;

  type MenuItem = {
    id: number;
    name: string;
    category: Exclude<Category, "All">;
    price: number;
    description: string;
    available: boolean;
    prepTime: number;
    calories: number;
  };

  type CartItem = MenuItem & { quantity: number; notes: string };

  type OrderItem = {
    name: string;
    quantity: number;
    price: number;
    notes?: string;
  };

  type Order = {
    id: string;
    orderNumber: string;
    table: string;
    customerName: string;
    items: OrderItem[];
    total: number;
    timestamp: string;
    status: OrderStatus;
    urgency: "high" | "normal" | "low";
    notes: string;
  };

  const [activeTab, setActiveTab] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [cart, setLocalCart] = useState<CartItem[]>([]);
  const [orderNotes, setOrderNotes] = useState<string>("");
  const [newOrders, setNewOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      orderNumber: "ORD-001",
      table: "Table 5",
      customerName: "John Smith",
      items: [
        { name: "Grilled Chicken", quantity: 2, price: 15000 },
        { name: "Caesar Salad", quantity: 1, price: 8000 },
      ],
      total: 38000,
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      status: "new",
      urgency: "normal",
      notes: "Medium rare chicken, extra dressing on the side",
    },
    {
      id: "ORD-002",
      orderNumber: "ORD-002",
      table: "Table 3",
      customerName: "Sarah Wilson",
      items: [
        { name: "Red Wine", quantity: 1, price: 12000 },
        { name: "Chocolate Cake", quantity: 2, price: 6000 },
      ],
      total: 24000,
      timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
      status: "new",
      urgency: "high",
      notes: "",
    },
    {
      id: "ORD-003",
      orderNumber: "ORD-003",
      table: "Takeaway",
      customerName: "Michael Lee",
      items: [{ name: "Coca Cola", quantity: 3, price: 2000 }],
      total: 6000,
      timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
      status: "new",
      urgency: "normal",
      notes: "Customer waiting outside",
    },
  ]);
  const [sortBy, setSortBy] = useState<SortBy>("timestamp");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [showNewOrderForm, setShowNewOrderForm] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { openNewOrder?: boolean } | undefined;
    if (state?.openNewOrder) {
      setShowNewOrderForm(true);
    }
  }, [location.state]);
  // Checkout state removed
  const {
    tables: waiterTables,
    addOrder,
    addNotification,
  } = useWaiterDashboard();
  // Checkout functionality removed per request

  // Mock menu data
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Grilled Chicken",
      category: "Main Course",
      price: 15000,
      description: "Tender grilled chicken with herbs and spices",
      available: true,
      prepTime: 20,
      calories: 350,
    },
    {
      id: 2,
      name: "Caesar Salad",
      category: "Salad",
      price: 8000,
      description: "Fresh romaine lettuce with caesar dressing",
      available: true,
      prepTime: 10,
      calories: 250,
    },
    {
      id: 3,
      name: "Chocolate Cake",
      category: "Dessert",
      price: 6000,
      description: "Rich chocolate cake with ganache",
      available: false,
      prepTime: 30,
      calories: 450,
    },
    {
      id: 4,
      name: "Coca Cola",
      category: "Beverage",
      price: 2000,
      description: "Refreshing cola drink",
      available: true,
      prepTime: 2,
      calories: 140,
    },
    {
      id: 5,
      name: "Red Wine",
      category: "Alcohol",
      price: 12000,
      description: "Premium red wine",
      available: true,
      prepTime: 5,
      calories: 120,
    },
    {
      id: 6,
      name: "Fish & Chips",
      category: "Main Course",
      price: 18000,
      description: "Fresh fish with crispy chips",
      available: true,
      prepTime: 25,
      calories: 520,
    },
    {
      id: 7,
      name: "Greek Salad",
      category: "Salad",
      price: 9000,
      description: "Fresh vegetables with feta cheese",
      available: true,
      prepTime: 8,
      calories: 180,
    },
    {
      id: 8,
      name: "Coffee",
      category: "Beverage",
      price: 1500,
      description: "Freshly brewed coffee",
      available: true,
      prepTime: 3,
      calories: 5,
    },
  ];

  const categories: Category[] = [
    "All",
    "Main Course",
    "Salad",
    "Dessert",
    "Beverage",
    "Alcohol",
  ];

  const tables = [
    ...waiterTables.map((t) => `Table ${t.number}`),
    "Takeaway",
    "Delivery",
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryIcon = (category: Category | string) => {
    switch (category) {
      case "Main Course":
        return <Utensils className="w-4 h-4" />;
      case "Salad":
        return <Utensils className="w-4 h-4" />;
      case "Dessert":
        return <IceCream className="w-4 h-4" />;
      case "Beverage":
        return <Coffee className="w-4 h-4" />;
      case "Alcohol":
        return <Wine className="w-4 h-4" />;
      default:
        return <Utensils className="w-4 h-4" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ago`;
  };

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setLocalCart(
        cart.map(
          (cartItem): CartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
        )
      );
    } else {
      setLocalCart([...cart, { ...item, quantity: 1, notes: "" }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setLocalCart(cart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setLocalCart(
        cart.map(
          (item): CartItem =>
            item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const updateItemNotes = (itemId: number, notes: string) => {
    setLocalCart(
      cart.map(
        (item): CartItem => (item.id === itemId ? { ...item, notes } : item)
      )
    );
  };

  const getTotalAmount = () => {
    return cart.reduce(
      (total: number, item: CartItem) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cart.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0
    );
  };

  const handleSendToKitchen = (orderId: string) => {
    const orderToSend = newOrders.find((order) => order.id === orderId);
    if (orderToSend) {
      // Convert to context Order format and add to context
      const contextOrder = {
        id: orderToSend.id,
        orderNumber: orderToSend.orderNumber,
        tableNumber: orderToSend.table.includes("Table")
          ? parseInt(orderToSend.table.replace("Table ", ""))
          : undefined,
        customerName: orderToSend.customerName,
        orderType: (orderToSend.table === "Takeaway"
          ? "takeaway"
          : orderToSend.table === "Delivery"
          ? "delivery"
          : "dine-in") as "dine-in" | "takeaway" | "delivery",
        status: "preparing" as ContextOrderStatus,
        items: orderToSend.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          notes: item.notes,
        })),
        subtotal: orderToSend.total,
        tax: orderToSend.total * 0.18,
        tip: orderToSend.total * 0.1,
        total: orderToSend.total * 1.28,
        createdAt: new Date().toISOString(),
        estimatedTime: new Date(Date.now() + 30 * 60000).toISOString(),
        waiterId: 1,
        waiterName: "Sarah Johnson",
        notes: orderToSend.notes,
      };

      // Add to context orders
      addOrder(contextOrder);

      // Remove from new orders
      setNewOrders((prev) => prev.filter((order) => order.id !== orderId));

      // Add notification
      addNotification({
        type: "table",
        title: "Order Sent to Kitchen",
        message: `Order ${orderToSend.orderNumber} has been sent to kitchen`,
        actionRequired: false,
        tableId: orderToSend.table.includes("Table")
          ? orderToSend.table.replace("Table ", "")
          : undefined,
      });
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    setNewOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  const handleCreateOrder = () => {
    if (!selectedTable || cart.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      orderNumber: `ORD-${String(newOrders.length + 4).padStart(3, "0")}`,
      table: selectedTable,
      customerName: "Walk-in Customer",
      items: cart.map(
        (item): OrderItem => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          notes: item.notes,
        })
      ),
      total: getTotalAmount(),
      timestamp: new Date().toISOString(),
      status: "new",
      urgency: "normal",
      notes: orderNotes,
    };

    setNewOrders((prev) => [newOrder, ...prev]);
    setLocalCart([]);
    setOrderNotes("");
    setSelectedTable("");
    setShowNewOrderForm(false);
    setActiveTab("All");
  };

  // Checkout functionality removed per request

  const sortedAndFilteredOrders = newOrders
    .filter((order) => filterStatus === "all" || order.status === filterStatus)
    .sort((a, b) => {
      let aVal: number | string = "";
      let bVal: number | string = "";

      if (sortBy === "timestamp") {
        aVal = new Date(a.timestamp).getTime();
        bVal = new Date(b.timestamp).getTime();
      } else if (sortBy === "table") {
        aVal = a.table;
        bVal = b.table;
      } else if (sortBy === "total") {
        aVal = a.total;
        bVal = b.total;
      } else if (sortBy === "urgency") {
        aVal = a.urgency;
        bVal = b.urgency;
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === "All" || item.category === activeTab;
    return matchesSearch && matchesCategory && item.available;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage new orders
            </h1>
            <p className="text-gray-600">
              Manage incoming orders and create new ones
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNewOrderForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-app-brand text-white rounded-lg hover:bg-app-brand-dark transition-colors font-medium shadow-sm"
            >
              <Plus className="w-5 h-5" />
              New Order
            </button>
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* New Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                New Orders ({newOrders.length})
              </h2>
              <div className="flex items-center gap-4">
                {/* Filter Controls */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filterStatus}
                    onChange={(e) =>
                      setFilterStatus(e.target.value as FilterStatus)
                    }
                    className="text-sm border border-gray-300 rounded px-3 py-1"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="sent">Sent to Kitchen</option>
                  </select>
                </div>

                {/* Sort Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className="text-sm border border-gray-300 rounded px-3 py-1"
                  >
                    <option value="timestamp">Time</option>
                    <option value="table">Table</option>
                    <option value="total">Amount</option>
                    <option value="urgency">Priority</option>
                  </select>
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {sortOrder === "asc" ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ border: "1px solid #e5e7eb" }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="orders table">
                <TableHead sx={{ backgroundColor: "#f9fafb" }}>
                  <TableRow>
                    <TableCell className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Order Details
                    </TableCell>
                    <TableCell className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Items
                    </TableCell>
                    <TableCell className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Amount
                    </TableCell>
                    <TableCell className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Status
                    </TableCell>
                    <TableCell className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedAndFilteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="px-6 py-12 text-center text-text-secondary"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <ShoppingCart className="w-12 h-12 text-text-muted mx-auto mb-3" />
                          <p className="text-text-secondary">No orders found</p>
                          <p className="text-sm text-text-muted">
                            New orders will appear here
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedAndFilteredOrders.map((order) => (
                      <TableRow
                        key={order.id}
                        className="hover:bg-surface-secondary"
                      >
                        <TableCell className="px-6 py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-medium text-text-primary">
                                {order.orderNumber}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  order.urgency === "high"
                                    ? "text-priority-high bg-priority-high/10"
                                    : order.urgency === "normal"
                                    ? "text-info bg-info/10"
                                    : "text-success bg-success/10"
                                }`}
                              >
                                {order.urgency}
                              </span>
                            </div>
                            <div className="text-sm text-text-secondary space-y-1">
                              <p className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {order.table} • {order.customerName}
                              </p>
                              <p className="flex items-center gap-1">
                                <Timer className="w-3 h-3" />
                                {getTimeAgo(order.timestamp)}
                              </p>
                              {order.notes && (
                                <p className="text-xs italic text-text-muted">
                                  {order.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="text-sm">
                            <p className="font-medium text-text-primary">
                              {order.items.length} items
                            </p>
                            <div className="text-text-secondary space-y-1">
                              {order.items.slice(0, 2).map((item, idx) => (
                                <p key={idx}>
                                  {item.quantity}× {item.name}
                                  {item.notes && (
                                    <span className="italic text-xs">
                                      {" "}
                                      ({item.notes})
                                    </span>
                                  )}
                                </p>
                              ))}
                              {order.items.length > 2 && (
                                <p className="text-xs text-text-muted">
                                  +{order.items.length - 2} more...
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-success" />
                            <span className="font-semibold text-success">
                              {formatCurrency(order.total)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                              order.status === "new"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.status === "new"
                              ? "New Order"
                              : "Sent to Kitchen"}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {order.status === "new" && (
                              <button
                                onClick={() => handleSendToKitchen(order.id)}
                                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg shadow bg-app-brand text-white border border-app-brand hover:bg-app-brand-dark hover:shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-app-brand focus:ring-offset-2"
                              >
                                <Send className="w-4 h-4 mr-2 text-white" />
                                <span className="tracking-wide text-white">
                                  Send to Kitchen
                                </span>
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="px-2 py-1.5 text-xs font-medium border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        {/* New Order Creation Modal */}
        {showNewOrderForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Create New Order
                </h3>
                <button
                  onClick={() => setShowNewOrderForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex h-[calc(90vh-80px)]">
                {/* Menu Section */}
                <div className="flex-1 p-6 overflow-y-auto border-r border-gray-200">
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search menu items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-app-brand focus:border-app-brand"
                          />
                        </div>
                      </div>
                      <select
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-app-brand focus:border-app-brand"
                      >
                        <option value="">Select Table</option>
                        {tables.map((table) => (
                          <option key={table} value={table}>
                            {table}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setActiveTab(category)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === category
                              ? "bg-app-brand text-white border border-app-brand"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredMenuItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border">
                            {getCategoryIcon(item.category)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">
                                {item.name}
                              </h4>
                              <span className="text-sm font-semibold text-app-brand">
                                <span className="text-app-brand">
                                  {formatCurrency(item.price)}
                                </span>
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.prepTime} min
                              </span>
                              <span className="flex items-center gap-1">
                                <Calculator className="w-3 h-3" />
                                {item.calories} cal
                              </span>
                            </div>
                            <button
                              onClick={() => addToCart(item)}
                              className="w-full px-3 py-2 bg-app-brand text-white text-sm rounded-lg border border-app-brand hover:bg-app-brand-dark transition-colors font-medium"
                            >
                              Add to Order
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart Section */}
                <div className="w-80 p-6 bg-gray-50 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order Items
                    </h3>
                    {cart.length > 0 && (
                      <span className="px-2 py-1 bg-app-brand text-white text-xs rounded-full border border-app-brand">
                        {getTotalItems()} items
                      </span>
                    )}
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No items added</p>
                      <p className="text-sm text-gray-400">
                        Select items from menu
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 mb-6">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-sm font-semibold text-app-brand">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>

                          <input
                            type="text"
                            placeholder="Special instructions..."
                            value={item.notes || ""}
                            onChange={(e) =>
                              updateItemNotes(item.id, e.target.value)
                            }
                            className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 ring-app-brand focus:border-app-brand"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {cart.length > 0 && (
                    <div className="space-y-4">
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Order notes..."
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 ring-app-brand focus:border-app-brand"
                        rows={3}
                      />

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-semibold text-gray-900">
                            Total
                          </span>
                          <span className="text-xl font-bold text-app-brand">
                            {formatCurrency(getTotalAmount())}
                          </span>
                        </div>

                        <button
                          onClick={handleCreateOrder}
                          disabled={!selectedTable}
                          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                          <CheckCircle className="w-4 h-4 mr-2 inline" />
                          Create Order
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout modal removed per request */}
      </div>
    </div>
  );
}
