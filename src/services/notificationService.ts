import type {
  Notification,
  NotificationData,
  NotificationType,
} from "../types/notification";

// Notification templates for different actions
export const notificationTemplates = {
  // Order notifications
  orderConfirmed: (orderNumber: string): NotificationData => ({
    type: "order",
    title: "Order Confirmed",
    description: `Your order #${orderNumber} has been confirmed and is being prepared`,
    actionUrl: "/dashboard/customer/orders",
    priority: "high",
  }),

  orderReady: (
    orderNumber: string,
    type: "pickup" | "delivery"
  ): NotificationData => ({
    type: "order",
    title: "Order Ready",
    description: `Your ${type} order #${orderNumber} is ready!`,
    actionUrl: "/dashboard/customer/orders",
    priority: "high",
  }),

  orderDelivered: (orderNumber: string): NotificationData => ({
    type: "order",
    title: "Order Delivered",
    description: `Your order #${orderNumber} has been delivered. Enjoy your meal!`,
    actionUrl: "/dashboard/customer/orders",
    priority: "medium",
  }),

  // Reservation notifications
  reservationConfirmed: (
    date: string,
    time: string,
    table: string
  ): NotificationData => ({
    type: "reservation",
    title: "Reservation Confirmed",
    description: `Your reservation for ${table} on ${date} at ${time} has been confirmed`,
    actionUrl: "/dashboard/customer/reservations",
    priority: "medium",
  }),

  reservationUpdated: (
    date: string,
    time: string,
    table: string
  ): NotificationData => ({
    type: "reservation",
    title: "Reservation Updated",
    description: `Your reservation for ${table} has been updated to ${date} at ${time}`,
    actionUrl: "/dashboard/customer/reservations",
    priority: "medium",
  }),

  reservationReminder: (
    date: string,
    time: string,
    guests: number
  ): NotificationData => ({
    type: "reservation",
    title: "Reservation Reminder",
    description: `Don't forget your reservation tomorrow at ${time} for ${guests} guests`,
    actionUrl: "/dashboard/customer/reservations",
    priority: "medium",
  }),

  // Payment notifications
  paymentSuccessful: (
    amount: number,
    orderNumber: string
  ): NotificationData => ({
    type: "payment",
    title: "Payment Successful",
    description: `Payment of ${amount.toLocaleString()} RWF for order #${orderNumber} has been processed`,
    actionUrl: "/dashboard/customer/orders",
    priority: "medium",
  }),

  paymentFailed: (orderNumber: string): NotificationData => ({
    type: "payment",
    title: "Payment Failed",
    description: `Payment for order #${orderNumber} failed. Please try again.`,
    actionUrl: "/dashboard/customer/orders",
    priority: "high",
  }),

  // Loyalty notifications
  loyaltyPointsEarned: (points: number): NotificationData => ({
    type: "loyalty",
    title: "Loyalty Points Earned",
    description: `You earned ${points} loyalty points for your recent order!`,
    actionUrl: "/dashboard/customer/loyalty",
    priority: "low",
  }),

  loyaltyTierUpgraded: (newTier: string): NotificationData => ({
    type: "loyalty",
    title: "Tier Upgraded!",
    description: `Congratulations! You've been upgraded to ${newTier} tier`,
    actionUrl: "/dashboard/customer/loyalty",
    priority: "medium",
  }),

  // Account notifications
  profileUpdated: (): NotificationData => ({
    type: "account",
    title: "Profile Updated",
    description: "Your account profile has been successfully updated",
    actionUrl: "/dashboard/customer/profile",
    priority: "low",
  }),

  passwordChanged: (): NotificationData => ({
    type: "account",
    title: "Password Changed",
    description: "Your password has been successfully changed",
    actionUrl: "/dashboard/customer/profile",
    priority: "medium",
  }),

  // System notifications
  welcomeMessage: (): NotificationData => ({
    type: "system",
    title: "Welcome to BRMS!",
    description: "Thank you for joining our restaurant management system",
    actionUrl: "/dashboard/customer",
    priority: "low",
  }),

  maintenanceNotice: (message: string): NotificationData => ({
    type: "system",
    title: "System Maintenance",
    description: message,
    priority: "medium",
  }),

  newFeature: (feature: string): NotificationData => ({
    type: "system",
    title: "New Feature Available",
    description: `Check out our new ${feature} feature!`,
    actionUrl: "/dashboard/customer",
    priority: "low",
  }),
};

// Icons for different notification types
export const getNotificationIcon = (type: NotificationType): string => {
  switch (type) {
    case "order":
      return "📦";
    case "reservation":
      return "📅";
    case "payment":
      return "💳";
    case "account":
      return "👤";
    case "loyalty":
      return "⭐";
    case "system":
      return "🎉";
    default:
      return "🔔";
  }
};

// Generate a notification from template
export const generateNotification = (
  template: NotificationData
): Omit<Notification, "id" | "timestamp" | "isRead"> => {
  return {
    ...template,
    icon: getNotificationIcon(template.type),
  };
};

// Auto-generate notifications for common actions
export const autoGenerateNotifications = {
  // When an order is placed
  onOrderPlaced: (orderNumber: string, amount: number) => [
    generateNotification(notificationTemplates.orderConfirmed(orderNumber)),
    generateNotification(
      notificationTemplates.paymentSuccessful(amount, orderNumber)
    ),
  ],

  // When a reservation is made
  onReservationMade: (date: string, time: string, table: string) => [
    generateNotification(
      notificationTemplates.reservationConfirmed(date, time, table)
    ),
  ],

  // When loyalty points are earned
  onLoyaltyPointsEarned: (points: number) => [
    generateNotification(notificationTemplates.loyaltyPointsEarned(points)),
  ],

  // When profile is updated
  onProfileUpdated: () => [
    generateNotification(notificationTemplates.profileUpdated()),
  ],
};
