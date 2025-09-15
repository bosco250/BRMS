import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  Clock,
  UtensilsCrossed,
  Receipt,
  Package,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  customerOrders,
  getStatusColor,
  getOrderTypeIcon,
  formatCurrency,
  formatDate,
  type CustomerOrder,
  getDeliveryMethodText,
  getPaymentMethodText,
} from "../../../data/customerOrderData";
import { useCustomerDashboard } from "./context";

export default function OrderHistory() {
  const navigate = useNavigate();
  const { addToCart, products } = useCustomerDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(
    null
  );

  // Filter orders based on search and filters
  const filteredOrders = useMemo(() => {
    return customerOrders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.restaurantName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      const matchesOrderType =
        orderTypeFilter === "all" || order.deliveryMethod === orderTypeFilter;

      return matchesSearch && matchesStatus && matchesOrderType;
    });
  }, [searchQuery, statusFilter, orderTypeFilter]);

  const getStatusIcon = (status: CustomerOrder["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <AlertCircle className="w-4 h-4" />;
      case "preparing":
        return <UtensilsCrossed className="w-4 h-4" />;
      case "ready":
        return <Package className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: CustomerOrder["status"]) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "confirmed":
        return "Confirmed";
      case "preparing":
        return "Preparing";
      case "ready":
        return "Ready";

      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const handleReorder = (order: CustomerOrder) => {
    order.items.forEach((it) => {
      const product = products.find((p) => p.name === it.name);
      const unitPrice = it.totalPrice / it.quantity;
      const base =
        product ||
        ({
          id: Math.floor(Math.random() * 1_000_000),
          name: it.name,
          category: "food",
          price: unitPrice,
          image: null,
          favorite: false,
          rating: 4.5,
          description: "",
        } as any);
      for (let i = 0; i < it.quantity; i++) {
        addToCart(base as any);
      }
    });
    navigate("/checkout");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            Order History
          </h2>
          <p className="text-text-secondary">Track and manage your orders</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">
            Total Orders: {filteredOrders.length}
          </span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-dashboard border border-border-primary rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Order Type Filter */}
          <div>
            <select
              value={orderTypeFilter}
              onChange={(e) => setOrderTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="all">All Types</option>
              <option value="dine_in">Dine In</option>
              <option value="take_away">Take Away</option>
              <option value="delivery_1hour">Fast Delivery</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div>
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setOrderTypeFilter("all");
              }}
              className="w-full px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-dashboard border border-border-primary rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary border-b border-border-primary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Type & Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-surface-secondary/50 transition-colors"
                >
                  {/* Order Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-surface-primary rounded-lg flex items-center justify-center border border-border-secondary">
                          {getOrderTypeIcon(order.deliveryMethod)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary">
                          {order.orderNumber}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {order.restaurantName}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-text-secondary">
                            {order.items.length} items
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Type & Status */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {getOrderTypeIcon(order.deliveryMethod)}
                        </span>
                        <span className="text-sm text-text-secondary capitalize">
                          {getDeliveryMethodText(order.deliveryMethod)}
                        </span>
                      </div>
                      <div
                        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span>{getStatusText(order.status)}</span>
                      </div>
                    </div>
                  </td>

                  {/* Payment Method */}
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border border-border-secondary text-text-primary">
                      <Receipt className="w-3 h-3 mr-1" />
                      {getPaymentMethodText(order.paymentMethod)}
                    </div>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-medium text-text-primary">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-text-secondary">
                      <p>{formatDate(order.createdAt)}</p>
                      {order.estimatedDeliveryTime && (
                        <p className="text-xs text-brand">
                          Est: {formatDate(order.estimatedDeliveryTime)}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center px-3 py-1 border border-border-primary rounded-md text-sm text-text-primary hover:bg-surface-secondary transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleReorder(order)}
                        className="inline-flex items-center px-3 py-1 border border-brand rounded-md text-sm text-brand hover:bg-brand/10 transition-colors"
                      >
                        Reorder
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Receipt className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              No Orders Found
            </h3>
            <p className="text-text-secondary">
              {searchQuery ||
              statusFilter !== "all" ||
              orderTypeFilter !== "all"
                ? "Try adjusting your filters or search terms"
                : "You haven't placed any orders yet"}
            </p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-dashboard rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-text-primary">
                    Order Details
                  </h3>
                  <p className="text-text-secondary">
                    {selectedOrder.orderNumber}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-secondary p-4 rounded-lg border border-border-secondary">
                  <h4 className="font-medium text-text-primary mb-2">
                    Order Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Restaurant:</span>
                      <span className="text-text-primary">
                        {selectedOrder.restaurantName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Type:</span>
                      <span className="text-text-primary capitalize">
                        {getDeliveryMethodText(selectedOrder.deliveryMethod)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Status:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          selectedOrder.status
                        )}`}
                      >
                        {getStatusText(selectedOrder.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Payment:</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium border border-border-secondary">
                        {getPaymentMethodText(selectedOrder.paymentMethod)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-secondary p-4 rounded-lg border border-border-secondary">
                  <h4 className="font-medium text-text-primary mb-2">
                    Timing & Location
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Order Date:</span>
                      <span className="text-text-primary">
                        {formatDate(selectedOrder.createdAt)}
                      </span>
                    </div>
                    {selectedOrder.estimatedDeliveryTime && (
                      <div className="flex justify-between">
                        <span className="text-text-secondary">
                          Est. Delivery:
                        </span>
                        <span className="text-text-primary">
                          {formatDate(selectedOrder.estimatedDeliveryTime)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-medium text-text-primary mb-3">
                  Order Items
                </h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg border border-border-secondary"
                    >
                      <div className="w-12 h-12 bg-surface-primary rounded-lg flex items-center justify-center border border-border-secondary">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full rounded-lg object-cover"
                          />
                        ) : (
                          <span className="text-lg">🍽️</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-primary">
                          {item.name}
                        </p>
                        {item.modifiers && item.modifiers.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.modifiers.map((mod) => (
                              <span
                                key={mod}
                                className="text-xs bg-brand/10 text-brand px-2 py-1 rounded border border-brand/20"
                              >
                                +{mod}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-text-primary">
                          {formatCurrency(item.totalPrice)}
                        </p>
                        <p className="text-sm text-text-secondary">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="bg-surface-secondary p-4 rounded-lg">
                <div className="flex justify-between font-medium text-text-primary">
                  <span>Total:</span>
                  <span>{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
