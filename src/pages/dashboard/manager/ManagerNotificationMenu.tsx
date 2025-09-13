import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  Check,
  Trash2,
  Clock,
  ExternalLink,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useManagerDashboard } from "./context";
import { toast } from "react-toastify";

const ManagerNotificationMenu: React.FC = () => {
  const { notifications, markNotificationAsRead } = useManagerDashboard();

  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Calculate unread count
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-600 bg-red-100";
      case "high":
        return "border-l-red-500 bg-red-50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50";
      case "low":
        return "border-l-blue-500 bg-blue-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  // Get type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-blue-100 text-blue-800";
      case "inventory":
        return "bg-orange-100 text-orange-800";
      case "staff":
        return "bg-purple-100 text-purple-800";
      case "system":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor(
      (now.getTime() - notificationTime.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return notificationTime.toLocaleDateString();
  };

  // Handle mark as read
  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    toast.success("Notification marked as read");
  };

  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    notifications.forEach((notif) => {
      if (!notif.read) {
        markNotificationAsRead(notif.id);
      }
    });
    toast.success("All notifications marked as read");
  };

  // Handle clear all
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      // In a real app, this would clear notifications from the backend
      toast.success("All notifications cleared");
    }
  };

  // Handle notification click
  // DEBUG: Fix notification type and property access
  type ManagerNotification = {
    id: string;
    actionUrl?: string;
    isRead?: boolean;
    read?: boolean;
    type?: string;
  };

  const handleNotificationClick = (notification: ManagerNotification) => {
    // Prefer 'isRead', fallback to 'read'
    const isRead = notification.isRead ?? notification.read;
    if (!isRead) {
      markNotificationAsRead(notification.id);
    }

    // Navigate to relevant page based on notification type
    switch (notification.type) {
      case "inventory":
        window.location.href = `/dashboard/manager/inventory`;
        break;
      case "order":
        window.location.href = `/dashboard/manager/orders`;
        break;
      case "staff":
        window.location.href = `/dashboard/manager/staff`;
        break;
      default:
        // If actionUrl is provided, fallback to it
        if (notification.actionUrl) {
          window.location.href = notification.actionUrl;
        }
        break;
    }
  };

  // Get visible notifications
  const visibleNotifications = showAll
    ? notifications
    : notifications.slice(0, 5);

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6" />

        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.div>
        )}
      </button>

      {/* Notification Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-[90]"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-[100] max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-brand to-brand-dark text-white rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-6 h-6" />
                  <div>
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <p className="text-sm text-brand-light">
                      {unreadCount} unread{" "}
                      {unreadCount === 1 ? "notification" : "notifications"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Mark All Read
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              {/* Notifications List */}
              <div className="overflow-y-auto max-h-[60vh]">
                {visibleNotifications.length > 0 ? (
                  <div className="p-2 space-y-2">
                    {visibleNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className={`relative p-4 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md ${
                          notification.read
                            ? "bg-white border-gray-200"
                            : "bg-blue-50 border-blue-300"
                        } ${getPriorityColor(notification.priority)}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        {/* Unread Indicator */}
                        {!notification.read && (
                          <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full" />
                        )}

                        {/* Header */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {notification.type === "order"
                                ? "🍽️"
                                : notification.type === "inventory"
                                ? "📦"
                                : notification.type === "staff"
                                ? "👥"
                                : "🔔"}
                            </span>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm">
                                {notification.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                    notification.type
                                  )}`}
                                >
                                  {notification.type.charAt(0).toUpperCase() +
                                    notification.type.slice(1)}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatTimestamp(notification.createdAt)}
                                </span>
                                {notification.actionRequired && (
                                  <span className="text-xs text-red-600 font-medium">
                                    Action Required
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                          {notification.message}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkAsRead(notification.id);
                                }}
                                className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                              >
                                <Check className="w-3 h-3" />
                                Mark Read
                              </button>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNotificationClick(notification);
                            }}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-brand hover:text-brand-dark hover:bg-brand/10 rounded transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Notifications
                    </h3>
                    <p className="text-gray-500">You're all caught up!</p>
                  </div>
                )}
              </div>

              {/* Show More/Less Toggle */}
              {notifications.length > 5 && (
                <div className="p-3 border-t border-gray-200 bg-gray-50">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {showAll ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Show More ({notifications.length - 5} more)
                      </>
                    )}
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

export default ManagerNotificationMenu;
