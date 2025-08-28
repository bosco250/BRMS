export type NotificationType = "order" | "reservation" | "payment" | "account" | "loyalty" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  icon: string;
  priority: "low" | "medium" | "high";
}

export interface NotificationData {
  type: NotificationType;
  title: string;
  description: string;
  actionUrl?: string;
  priority: "low" | "medium" | "high";
}
