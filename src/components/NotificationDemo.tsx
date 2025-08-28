import React from "react";
import { motion } from "framer-motion";
import { useCustomerDashboard } from "../pages/dashboard/customer/context";
import { autoGenerateNotifications } from "../services/notificationService";
import type { Notification } from "../types/notification";

const NotificationDemo: React.FC = () => {
  const { addNotification } = useCustomerDashboard();

  const demoNotifications = [
    {
      type: "order" as const,
      title: "Order Confirmed",
      description:
        "Your order #ORD-2024-999 has been confirmed and is being prepared",
      priority: "high" as const,
      icon: "📦",
    },
    {
      type: "reservation" as const,
      title: "Reservation Reminder",
      description:
        "Don't forget your reservation tomorrow at 7:00 PM for 4 guests",
      priority: "medium" as const,
      icon: "⏰",
    },
    {
      type: "loyalty" as const,
      title: "Loyalty Points Earned",
      description: "You earned 200 loyalty points for your recent order!",
      priority: "low" as const,
      icon: "⭐",
    },
    {
      type: "system" as const,
      title: "New Feature Available",
      description: "Check out our new mobile app feature!",
      priority: "low" as const,
      icon: "🎉",
    },
  ];

  const handleAddDemoNotification = (notification: any) => {
    addNotification({
      ...notification,
      isRead: false,
    });
  };

  const handleAddMultipleNotifications = () => {
    demoNotifications.forEach((notification, index) => {
      setTimeout(() => {
        addNotification({
          ...notification,
          isRead: false,
        });
      }, index * 500); // Add notifications with 500ms delay
    });
  };

  return (
    <div className="bg-dashboard border border-border-primary rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Notification System Demo
        </h3>
        <p className="text-text-secondary">
          Test the notification system by generating different types of
          notifications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {demoNotifications.map((notification, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-surface-secondary border border-border-secondary rounded-lg p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{notification.icon}</span>
              <div>
                <h4 className="font-medium text-text-primary text-sm">
                  {notification.title}
                </h4>
                <p className="text-xs text-text-secondary">
                  Priority: {notification.priority}
                </p>
              </div>
            </div>
            <p className="text-sm text-text-secondary mb-3">
              {notification.description}
            </p>
            <button
              onClick={() => handleAddDemoNotification(notification)}
              className="w-full bg-brand text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors"
            >
              Generate Notification
            </button>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddMultipleNotifications}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
        >
          🚀 Generate All Notifications
        </button>

        <button
          onClick={() => {
            // Generate a high-priority order notification
            addNotification({
              type: "order",
              title: "🚨 Urgent Order Update",
              description:
                "Your order #ORD-2024-999 has been delayed due to high demand",
              priority: "high",
              isRead: false,
              icon: "🚨",
            });
          }}
          className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all transform hover:scale-105"
        >
          🚨 Generate Urgent Notification
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">💡 How to Test:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            • Click individual notification buttons to generate specific
            notifications
          </li>
          <li>
            • Use "Generate All" to create multiple notifications with delays
          </li>
          <li>
            • Check the notification bell icon in the header for unread count
          </li>
          <li>• Click the bell to open the notification menu</li>
          <li>• Test marking notifications as read and clearing them</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationDemo;
