import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Search,
  Clock,
  CheckCircle,
  Eye,
  Utensils,
  DollarSign,
  Bell,
  MapPin,
  ChefHat,
  ShoppingCart,
  Send,
} from "lucide-react";
import { useWaiterDashboard, type Order } from "./context";
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
type OrderStatus = "preparing" | "ready" | "served";
type OrderType = "dine-in" | "takeaway" | "delivery";

export default function Orders() {
  const { orders, addNotification, updateOrderStatus } = useWaiterDashboard();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<OrderType | "all">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "status">(
    "newest"
  );

  // Filter and sort orders - only show active orders sent to kitchen
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
      // Only show active orders (preparing, ready, served)
      const isActiveOrder = ["preparing", "ready", "served"].includes(
        order.status
      );
      return matchesSearch && matchesStatus && matchesType && isActiveOrder;
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
            preparing: 0,
            ready: 1,
            served: 2,
          };
          return statusOrder[a.status] - statusOrder[b.status];
        default:
          return 0;
      }
    });

  // Get status color
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "preparing":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "served":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get status icon
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "preparing":
        return <ChefHat className="w-4 h-4" />;
      case "ready":
        return <Bell className="w-4 h-4" />;
      case "served":
        return <CheckCircle className="w-4 h-4" />;
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
    updateOrderStatus(orderId, newStatus);

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

  // Handle view order details
  const handleViewOrder = (order: Order) => {
    // Navigate to order details or show in a different way
    console.log("View order:", order);
  };

  return (
    <div className="space-y-6 lg:mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Active Orders
          </h1>
          <p className="text-text-secondary">
            Manage orders sent to kitchen (preparing, ready, served)
          </p>
        </div>
        <button
          onClick={() =>
            navigate("/dashboard/waiter/order-taking", {
              state: { openNewOrder: true },
            })
          }
          className="bg-app-brand text-white px-6 py-3 rounded-lg hover:bg-app-brand-dark transition-all duration-200 flex items-center gap-2 border border-app-brand shadow-sm hover:shadow font-semibold"
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
                className="w-full pl-10 pr-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-app-brand focus:border-app-brand"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as OrderStatus | "all")
              }
              className="px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-app-brand focus:border-app-brand"
            >
              <option value="all">All Active Orders</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="served">Served</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as OrderType | "all")
              }
              className="px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-app-brand focus:border-app-brand"
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
              className="px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-app-brand focus:border-app-brand"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="status">By Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
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
                  Customer & Table
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Items
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Amount
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Time
                </TableCell>
                <TableCell className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="px-6 py-12 text-center text-text-secondary"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ChefHat className="w-12 h-12 text-text-muted mx-auto mb-3" />
                      <p className="text-text-secondary">
                        No active orders found
                      </p>
                      <p className="text-sm text-text-muted">
                        Orders sent to kitchen will appear here
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-surface-secondary"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-app-brand/10 rounded-lg border border-app-brand/20">
                          {getOrderTypeIcon(order.orderType)}
                        </div>
                        <div>
                          <p className="font-bold text-text-primary">
                            {order.orderNumber}
                          </p>
                          <p className="text-xs text-text-muted">
                            {order.orderType.charAt(0).toUpperCase() +
                              order.orderType.slice(1)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-text-primary">
                          {order.customerName}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {order.tableNumber
                            ? `Table ${order.tableNumber}`
                            : "Takeaway/Delivery"}
                        </p>
                        {order.customerPhone && (
                          <p className="text-xs text-text-muted">
                            {order.customerPhone}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {order.items.length} items
                        </p>
                        <div className="text-xs text-text-secondary">
                          {order.items.slice(0, 2).map((item, idx) => (
                            <p key={idx}>
                              {item.quantity}× {item.name}
                            </p>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-text-muted">
                              +{order.items.length - 2} more...
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border shadow-sm ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </div>
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-success" />
                        <span className="font-semibold text-success">
                          {formatCurrency(order.total)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm text-text-secondary">
                          {new Date(order.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div className="flex items-center justify-end gap-2">
                        {order.status === "preparing" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(order.id, "ready")
                            }
                            className="px-3 py-1.5 bg-success/10 text-success rounded-lg text-xs font-semibold hover:bg-success/20 transition-all duration-200 border border-success/20 shadow-sm hover:shadow"
                          >
                            <CheckCircle className="w-3 h-3 mr-1 inline" />
                            Ready
                          </button>
                        )}
                        {order.status === "ready" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(order.id, "served")
                            }
                            className="px-3 py-1.5 bg-app-brand/10 text-app-brand rounded-lg text-xs font-semibold hover:bg-app-brand/20 transition-all duration-200 border border-app-brand/20 shadow-sm hover:shadow"
                          >
                            <Send className="w-3 h-3 mr-1 inline" />
                            Served
                          </button>
                        )}
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-text-secondary hover:text-app-brand hover:bg-app-brand/10 rounded-lg transition-all duration-200 border border-transparent hover:border-app-brand/20 shadow-sm hover:shadow"
                        >
                          <Eye className="w-4 h-4" />
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
  );
}
