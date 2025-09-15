import React, { useState } from "react";
import { Bell, X, AlertTriangle, CheckCircle, ChefHat } from "lucide-react";
import { useKitchenDashboard } from "./context";
import { motion, AnimatePresence } from "framer-motion";

const KitchenNotificationMenu: React.FC = () => {
  const { notifications, markNotificationAsRead, clearNotifications } =
    useKitchenDashboard();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_order":
        return <ChefHat className="w-4 h-4" />;
      case "order_ready":
        return <CheckCircle className="w-4 h-4" />;
      case "urgent_order":
        return <AlertTriangle className="w-4 h-4" />;
      case "order_cancelled":
        return <X className="w-4 h-4" />;
      case "station_alert":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "low":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-60 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Bottom Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-[1000] max-h-[80vh] overflow-hidden"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-brand to-brand-dark text-white rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <div>
                    <h3 className="font-semibold">Kitchen Alerts</h3>
                    <p className="text-xs text-brand-light">
                      {unreadCount} unread{" "}
                      {unreadCount === 1 ? "alert" : "alerts"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-xs text-white/80 hover:text-white"
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
                <button
                  onClick={() =>
                    notifications.forEach(
                      (n) => !n.read && markNotificationAsRead(n.id)
                    )
                  }
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark All Read
                </button>
                <button
                  onClick={clearNotifications}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              {/* Notifications List */}
              <div className="overflow-y-auto max-h-[60vh]">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        className={`p-3 rounded-lg border mb-2 cursor-pointer transition-colors ${
                          notification.read
                            ? "bg-gray-50 border-gray-200"
                            : "bg-white border-gray-200 hover:bg-gray-50"
                        } ${getNotificationColor(notification.priority)}`}
                        onClick={() => {
                          if (!notification.read) {
                            markNotificationAsRead(notification.id);
                          }
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {notification.title}
                              </h4>
                              <span className="text-xs text-gray-500 ml-2">
                                {formatTime(notification.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {notification.message}
                            </p>
                            {notification.actionRequired &&
                              !notification.read && (
                                <div className="mt-2">
                                  <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                    Action Required
                                  </span>
                                </div>
                              )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 bg-gray-50">
                  <button className="w-full text-sm text-brand hover:text-brand-hover font-medium">
                    View All Notifications
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KitchenNotificationMenu;
