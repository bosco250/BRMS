import { useWaiterDashboard } from "./context";
import {
  Utensils,
  CheckCircle,
  ClipboardList,
  PlusCircle,
  Receipt,
  Timer,
  Activity,
  Users,
  Eye,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function Dashboard() {
  const { waiter, tables, notifications } = useWaiterDashboard();

  // Mock orders for snapshot (replace with real data when integrated)
  const ordersToday = [
    {
      id: "order-1",
      orderNumber: "ORD-120341",
      customerName: "John Smith",
      orderType: "dine-in",
      status: "pending",
      total: 35990,
      createdAt: new Date().toISOString(),
      tableNumber: 3,
    },
    {
      id: "order-2",
      orderNumber: "ORD-120342",
      customerName: "Emily Davis",
      orderType: "takeaway",
      status: "preparing",
      total: 22990,
      createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    },
    {
      id: "order-3",
      orderNumber: "ORD-120343",
      customerName: "Michael Lee",
      orderType: "delivery",
      status: "ready",
      total: 41990,
      createdAt: new Date(Date.now() - 35 * 60000).toISOString(),
    },
    {
      id: "order-4",
      orderNumber: "ORD-120344",
      customerName: "Sarah Wilson",
      orderType: "dine-in",
      status: "served",
      total: 50990,
      createdAt: new Date(Date.now() - 50 * 60000).toISOString(),
      tableNumber: 5,
    },
  ];

  const ordersStats = {
    active: ordersToday.filter((o) =>
      ["pending", "preparing", "confirmed"].includes(o.status)
    ).length,
    ready: ordersToday.filter((o) => o.status === "ready").length,
    served: ordersToday.filter((o) => o.status === "served").length,
  };

  const pendingBills = tables.filter(
    (t) => (t as any).status === "occupied" && (t as any).awaitingBill
  ).length;

  const assignedTables = tables.filter(
    (t) => t.waiterId === waiter.id || typeof t.waiterId === "undefined"
  );

  const totalRevenue = ordersToday.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = ordersToday.length > 0 ? totalRevenue / ordersToday.length : 0;

  const recentActivity = [
    ...notifications.slice(0, 6).map((n) => ({
      id: n.id,
      text: n.message,
      time: n.createdAt,
    })),
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Quick Actions */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/25">
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              New Order
            </button>
            <button className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 bg-white/80 hover:bg-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500/25">
              <Receipt className="w-5 h-5 text-orange-500" />
              Request Bill
            </button>
            <button className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 bg-white/80 hover:bg-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500/25">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Mark Served
            </button>
          </div>
        </div>

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Active Orders</p>
                  <p className="text-4xl font-bold text-blue-900 mt-2">
                    {ordersStats.active}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">Currently processing</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Utensils className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">Ready Orders</p>
                  <p className="text-4xl font-bold text-emerald-900 mt-2">
                    {ordersStats.ready}
                  </p>
                  <p className="text-xs text-emerald-600 mt-1">Ready to serve</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Served Orders</p>
                  <p className="text-4xl font-bold text-purple-900 mt-2">
                    {ordersStats.served}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">Completed today</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Pending Bills</p>
                  <p className="text-4xl font-bold text-orange-900 mt-2">
                    {pendingBills}
                  </p>
                  <p className="text-xs text-orange-600 mt-1">Awaiting payment</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <ClipboardList className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Orders Queue */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Active Orders Queue</h2>
              <p className="text-gray-600 mt-1">Orders requiring your attention</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200">
              <Timer className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-700">
                {ordersStats.ready} ready
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Ready Orders - Highest Priority */}
            {ordersToday.filter(o => o.status === 'ready').length > 0 && (
              <div className="bg-gradient-to-r from-red-50 to-red-100/50 rounded-xl p-4 border border-red-200/50">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Ready to Serve ({ordersToday.filter(o => o.status === 'ready').length})
                </h3>
                <div className="grid gap-3">
                  {ordersToday.filter(o => o.status === 'ready').map(order => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500 text-white text-sm font-bold flex items-center justify-center">
                          {order.tableNumber || 'T'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{order.customerName}</p>
                          <p className="text-sm text-gray-600">{order.orderNumber} • ${(order.total/100).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
                          Serve Now
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preparing Orders */}
            {ordersToday.filter(o => o.status === 'preparing').length > 0 && (
              <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl p-4 border border-amber-200/50">
                <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  In Kitchen ({ordersToday.filter(o => o.status === 'preparing').length})
                </h3>
                <div className="grid gap-3">
                  {ordersToday.filter(o => o.status === 'preparing').map(order => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center">
                          {order.tableNumber || 'T'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{order.customerName}</p>
                          <p className="text-sm text-gray-600">{order.orderNumber} • Est. 8min</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
                        Preparing
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pending Actions */}
            {ordersToday.filter(o => o.status === 'served').length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl p-4 border border-purple-200/50">
                <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <Receipt className="w-4 h-4" />
                  Pending Bills ({ordersToday.filter(o => o.status === 'served').length})
                </h3>
                <div className="grid gap-3">
                  {ordersToday.filter(o => o.status === 'served').map(order => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-200/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500 text-white text-sm font-bold flex items-center justify-center">
                          {order.tableNumber || 'T'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{order.customerName}</p>
                          <p className="text-sm text-gray-600">${(order.total/100).toFixed(2)} • Ready for payment</p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors">
                        Process Bill
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ordersStats.active === 0 && ordersStats.ready === 0 && ordersStats.served === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Utensils className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-lg font-medium">No active orders</p>
                <p className="text-sm">All caught up! Ready for new orders.</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Recent Activity & Performance */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="xl:col-span-2 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-gray-600 text-sm">Latest updates from your shift</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-purple-600" />
              <div className="space-y-6">
                {recentActivity.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Activity className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p>No recent activity yet</p>
                  </div>
                )}
                {recentActivity.map((a, index) => (
                  <div key={a.id} className="pl-12 relative">
                    <span className="absolute left-2 top-2 h-4 w-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg" />
                    <div className="bg-white rounded-xl border border-gray-200/50 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{a.text}</p>
                        <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                          {new Date(a.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Snapshot */}
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Performance</h2>
                <p className="text-gray-600 text-sm">Today's metrics</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50">
                <div className="text-sm font-medium text-blue-700">Orders Served</div>
                <div className="mt-2 text-3xl font-bold text-blue-900">
                  {ordersStats.served}
                </div>
                <div className="text-xs text-blue-600 mt-1">Total completed</div>
              </div>
              
              <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200/50">
                <div className="text-sm font-medium text-indigo-700">Revenue Today</div>
                <div className="mt-2 text-3xl font-bold text-indigo-900">
                  ${(totalRevenue/100).toFixed(2)}
                </div>
                <div className="text-xs text-indigo-600 mt-1">From {ordersToday.length} orders</div>
              </div>
              
              <div className="p-5 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 border border-teal-200/50">
                <div className="text-sm font-medium text-teal-700">Avg Order Value</div>
                <div className="mt-2 text-3xl font-bold text-teal-900">
                  ${(averageOrderValue/100).toFixed(2)}
                </div>
                <div className="text-xs text-teal-600 mt-1">Per transaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}