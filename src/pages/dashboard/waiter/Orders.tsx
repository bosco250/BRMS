import { useState } from "react";
import {
  Plus,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Users,
  Utensils,
  DollarSign,
  Printer,
  Bell,
  MapPin,
  ChefHat,
  ShoppingCart,
  X,
  Save,
  Minus,
} from "lucide-react";
import { useWaiterDashboard } from "./context";
import { toast } from "react-toastify";

// Utility function to format RWF currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Order types
type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "served"
  | "cancelled";
type OrderType = "dine-in" | "takeaway" | "delivery";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: "food" | "beverages" | "alcohol" | "desserts";
  specialInstructions?: string;
  modifiers?: string[];
}

interface Order {
  id: string;
  orderNumber: string;
  tableNumber?: number;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  orderType: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  specialRequests?: string;
  createdAt: string;
  estimatedTime?: string;
  waiterId: number;
  waiterName: string;
  notes?: string;
}

export default function Orders() {
  const { waiter, tables, addNotification } = useWaiterDashboard();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<OrderType | "all">("all");
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "status">(
    "newest"
  );

  // Mock menu items
  const menuItems = [
    {
      id: "1",
      name: "Grilled Chicken Breast",
      price: 18990,
      category: "food" as const,
    },
    { id: "2", name: "Caesar Salad", price: 12990, category: "food" as const },
    {
      id: "3",
      name: "Fresh Coffee",
      price: 3990,
      category: "beverages" as const,
    },
    {
      id: "4",
      name: "Premium Red Wine",
      price: 25990,
      category: "alcohol" as const,
    },
    {
      id: "5",
      name: "Chocolate Cake",
      price: 8990,
      category: "desserts" as const,
    },
    { id: "6", name: "Fish & Chips", price: 16990, category: "food" as const },
    { id: "7", name: "Green Tea", price: 2990, category: "beverages" as const },
    { id: "8", name: "Beef Burger", price: 18990, category: "food" as const },
    {
      id: "9",
      name: "Ice Cream Sundae",
      price: 6990,
      category: "desserts" as const,
    },
    {
      id: "10",
      name: "Fresh Juice",
      price: 4990,
      category: "beverages" as const,
    },
  ];

  // New order form state
  const [newOrder, setNewOrder] = useState({
    tableNumber: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    orderType: "dine-in" as OrderType,
    specialRequests: "",
    notes: "",
    items: [] as OrderItem[],
  });

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.tableNumber?.toString().includes(searchQuery);
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      const matchesType =
        typeFilter === "all" || order.orderType === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "status":
          const statusOrder = {
            pending: 0,
            confirmed: 1,
            preparing: 2,
            ready: 3,
            served: 4,
            cancelled: 5,
          };
          return statusOrder[a.status] - statusOrder[b.status];
        default:
          return 0;
      }
    });

  // Get status color
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "preparing":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "served":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get status icon
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "preparing":
        return <ChefHat className="w-4 h-4" />;
      case "ready":
        return <Bell className="w-4 h-4" />;
      case "served":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Get order type icon
  const getOrderTypeIcon = (type: OrderType) => {
    switch (type) {
      case "dine-in":
        return <Utensils className="w-4 h-4" />;
      case "takeaway":
        return <ShoppingCart className="w-4 h-4" />;
      case "delivery":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Utensils className="w-4 h-4" />;
    }
  };

  // Handle status update
  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    const order = orders.find((o) => o.id === orderId);
    if (order) {
      toast.success(
        `Order ${order.orderNumber} status updated to ${newStatus}`
      );

      // Add notification for status change
      addNotification({
        type: "table",
        title: "Order Status Updated",
        message: `Order ${order.orderNumber} is now ${newStatus}`,
        actionRequired: newStatus === "ready",
        tableId: order.tableNumber?.toString(),
      });
    }
  };

  // Handle add item to new order
  const handleAddItem = (menuItem: (typeof menuItems)[0]) => {
    const existingItem = newOrder.items.find((item) => item.id === menuItem.id);

    if (existingItem) {
      setNewOrder((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }));
    } else {
      const newItem: OrderItem = {
        id: menuItem.id,
        name: menuItem.name,
        quantity: 1,
        price: menuItem.price,
        category: menuItem.category,
      };

      setNewOrder((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
      }));
    }
  };

  // Handle remove item from new order
  const handleRemoveItem = (itemId: string) => {
    setNewOrder((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  };

  // Handle quantity update
  const handleQuantityUpdate = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    setNewOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }));
  };

  // Calculate totals
  const calculateTotals = (items: OrderItem[]) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.18; // 18% VAT
    const tip = subtotal * 0.1; // 10% tip
    const total = subtotal + tax + tip;

    return { subtotal, tax, tip, total };
  };

  // Handle create new order
  const handleCreateOrder = () => {
    if (newOrder.items.length === 0) {
      toast.error("Please add at least one item to the order");
      return;
    }

    if (!newOrder.customerName.trim()) {
      toast.error("Please enter customer name");
      return;
    }

    const { subtotal, tax, tip, total } = calculateTotals(newOrder.items);
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    const order: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      tableNumber: newOrder.tableNumber
        ? parseInt(newOrder.tableNumber)
        : undefined,
      customerName: newOrder.customerName,
      customerPhone: newOrder.customerPhone || undefined,
      customerEmail: newOrder.customerEmail || undefined,
      orderType: newOrder.orderType,
      status: "pending",
      items: newOrder.items,
      subtotal,
      tax,
      tip,
      total,
      specialRequests: newOrder.specialRequests || undefined,
      createdAt: new Date().toISOString(),
      estimatedTime: new Date(Date.now() + 30 * 60000).toISOString(), // 30 minutes from now
      waiterId: waiter.id,
      waiterName: waiter.name,
      notes: newOrder.notes || undefined,
    };

    setOrders((prev) => [order, ...prev]);

    // Reset form
    setNewOrder({
      tableNumber: "",
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      orderType: "dine-in",
      specialRequests: "",
      notes: "",
      items: [],
    });

    setShowNewOrderModal(false);
    toast.success(`Order ${orderNumber} created successfully`);

    // Add notification
    addNotification({
      type: "table",
      title: "New Order Created",
      message: `Order ${orderNumber} has been created`,
      actionRequired: true,
      tableId: newOrder.tableNumber,
    });
  };

  // Handle view order details
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Orders Management
          </h1>
          <p className="text-text-secondary">Manage and track all orders</p>
        </div>
        <button
          onClick={() => setShowNewOrderModal(true)}
          className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2 border border-brand-dark"
        >
          <Plus className="w-4 h-4" />
          New Order
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-border-primary p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders by number, customer, or table..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as OrderStatus | "all")
              }
              className="px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="served">Served</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as OrderType | "all")
              }
              className="px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="all">All Types</option>
              <option value="dine-in">Dine-in</option>
              <option value="takeaway">Takeaway</option>
              <option value="delivery">Delivery</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "newest" | "oldest" | "status")
              }
              className="px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="status">By Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-border-primary">
            <Utensils className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              No Orders Found
            </h3>
            <p className="text-text-secondary mb-4">
              Create your first order to get started
            </p>
            <button
              onClick={() => setShowNewOrderModal(true)}
              className="bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand-dark transition-colors border border-brand-dark"
            >
              Create New Order
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg border border-border-primary p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getOrderTypeIcon(order.orderType)}
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        {order.orderNumber}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {order.customerName}
                        {order.tableNumber && ` • Table ${order.tableNumber}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    <div className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </div>
                  </span>
                  <button
                    onClick={() => handleViewOrder(order)}
                    className="p-2 text-text-secondary hover:text-brand hover:bg-brand/10 rounded-lg transition-colors border border-transparent hover:border-brand/20"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Users className="w-4 h-4" />
                  <span>{order.items.length} items</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, "confirmed")}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors border border-blue-200"
                    >
                      Confirm
                    </button>
                  )}
                  {order.status === "confirmed" && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, "preparing")}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors border border-orange-200"
                    >
                      Start Preparing
                    </button>
                  )}
                  {order.status === "preparing" && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, "ready")}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors border border-green-200"
                    >
                      Mark Ready
                    </button>
                  )}
                  {order.status === "ready" && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, "served")}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors border border-purple-200"
                    >
                      Mark Served
                    </button>
                  )}
                </div>
                <div className="text-xs text-text-muted">
                  Waiter: {order.waiterName}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border-primary p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-primary">
                Create New Order
              </h2>
              <button
                onClick={() => setShowNewOrderModal(false)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Order Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Table Number
                      </label>
                      <select
                        value={newOrder.tableNumber}
                        onChange={(e) =>
                          setNewOrder((prev) => ({
                            ...prev,
                            tableNumber: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
                      >
                        <option value="">Select Table</option>
                        {tables.map((table) => (
                          <option key={table.id} value={table.number}>
                            Table {table.number} ({table.capacity} seats)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Order Type
                      </label>
                      <select
                        value={newOrder.orderType}
                        onChange={(e) =>
                          setNewOrder((prev) => ({
                            ...prev,
                            orderType: e.target.value as OrderType,
                          }))
                        }
                        className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
                      >
                        <option value="dine-in">Dine-in</option>
                        <option value="takeaway">Takeaway</option>
                        <option value="delivery">Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={newOrder.customerName}
                      onChange={(e) =>
                        setNewOrder((prev) => ({
                          ...prev,
                          customerName: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
                      placeholder="Enter customer name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={newOrder.customerPhone}
                        onChange={(e) =>
                          setNewOrder((prev) => ({
                            ...prev,
                            customerPhone: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
                        placeholder="+250 788 123 456"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={newOrder.customerEmail}
                        onChange={(e) =>
                          setNewOrder((prev) => ({
                            ...prev,
                            customerEmail: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
                        placeholder="customer@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Special Requests
                    </label>
                    <textarea
                      value={newOrder.specialRequests}
                      onChange={(e) =>
                        setNewOrder((prev) => ({
                          ...prev,
                          specialRequests: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
                      rows={3}
                      placeholder="Any special requests or dietary requirements..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Notes
                    </label>
                    <textarea
                      value={newOrder.notes}
                      onChange={(e) =>
                        setNewOrder((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
                      rows={2}
                      placeholder="Internal notes..."
                    />
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Menu Items
                  </h3>

                  {/* Menu Categories */}
                  <div className="space-y-4">
                    {["food", "beverages", "alcohol", "desserts"].map(
                      (category) => (
                        <div key={category}>
                          <h4 className="text-sm font-medium text-text-primary mb-2 capitalize">
                            {category}
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {menuItems
                              .filter((item) => item.category === category)
                              .map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg border border-border-secondary"
                                >
                                  <div className="flex-1">
                                    <p className="font-medium text-text-primary">
                                      {item.name}
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                      {formatCurrency(item.price)}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => handleAddItem(item)}
                                    className="px-3 py-1 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors border border-brand-dark"
                                  >
                                    Add
                                  </button>
                                </div>
                              ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Selected Items */}
                  {newOrder.items.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-text-primary mb-2">
                        Selected Items ({newOrder.items.length})
                      </h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {newOrder.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-text-primary">
                                {item.name}
                              </p>
                              <p className="text-sm text-text-secondary">
                                {formatCurrency(item.price)} × {item.quantity}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleQuantityUpdate(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                className="w-6 h-6 bg-surface-secondary rounded-full flex items-center justify-center hover:bg-surface-card border border-border-secondary"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityUpdate(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                className="w-6 h-6 bg-surface-secondary rounded-full flex items-center justify-center hover:bg-surface-card border border-border-secondary"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-1 text-error hover:bg-error/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              {newOrder.items.length > 0 && (
                <div className="mt-6 p-4 bg-surface-secondary rounded-lg border border-border-secondary">
                  <h4 className="text-lg font-semibold text-text-primary mb-4">
                    Order Summary
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Subtotal:</span>
                      <span className="text-text-primary">
                        {formatCurrency(
                          calculateTotals(newOrder.items).subtotal
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Tax (18%):</span>
                      <span className="text-text-primary">
                        {formatCurrency(calculateTotals(newOrder.items).tax)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Tip (10%):</span>
                      <span className="text-text-primary">
                        {formatCurrency(calculateTotals(newOrder.items).tip)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t border-border-secondary pt-2">
                      <span className="text-text-primary">Total:</span>
                      <span className="text-text-primary">
                        {formatCurrency(calculateTotals(newOrder.items).total)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-6 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors border border-border-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateOrder}
                  className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2 border border-brand-dark"
                >
                  <Save className="w-4 h-4" />
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border-primary p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-primary">
                Order {selectedOrder.orderNumber}
              </h2>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-text-primary mb-2">
                    Customer Information
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {selectedOrder.customerName}
                  </p>
                  {selectedOrder.customerPhone && (
                    <p className="text-sm text-text-secondary">
                      {selectedOrder.customerPhone}
                    </p>
                  )}
                  {selectedOrder.customerEmail && (
                    <p className="text-sm text-text-secondary">
                      {selectedOrder.customerEmail}
                    </p>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-2">
                    Order Details
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Type:{" "}
                    {selectedOrder.orderType.charAt(0).toUpperCase() +
                      selectedOrder.orderType.slice(1)}
                  </p>
                  {selectedOrder.tableNumber && (
                    <p className="text-sm text-text-secondary">
                      Table: {selectedOrder.tableNumber}
                    </p>
                  )}
                  <p className="text-sm text-text-secondary">
                    Created:{" "}
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium text-text-primary mb-4">
                  Order Items
                </h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg border border-border-secondary"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-text-primary">
                          {item.name}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-text-primary">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-surface-secondary rounded-lg border border-border-secondary">
                <h4 className="font-medium text-text-primary mb-4">
                  Order Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Subtotal:</span>
                    <span className="text-text-primary">
                      {formatCurrency(selectedOrder.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Tax (18%):</span>
                    <span className="text-text-primary">
                      {formatCurrency(selectedOrder.tax)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Tip (10%):</span>
                    <span className="text-text-primary">
                      {formatCurrency(selectedOrder.tip)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-border-secondary pt-2">
                    <span className="text-text-primary">Total:</span>
                    <span className="text-text-primary">
                      {formatCurrency(selectedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedOrder.specialRequests && (
                <div>
                  <h4 className="font-medium text-text-primary mb-2">
                    Special Requests
                  </h4>
                  <p className="text-sm text-text-secondary p-3 bg-surface-secondary rounded-lg border border-border-secondary">
                    {selectedOrder.specialRequests}
                  </p>
                </div>
              )}

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Notes</h4>
                  <p className="text-sm text-text-secondary p-3 bg-surface-secondary rounded-lg border border-border-secondary">
                    {selectedOrder.notes}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="px-6 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors border border-border-secondary"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2 border border-brand-dark">
                  <Printer className="w-4 h-4" />
                  Print Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
