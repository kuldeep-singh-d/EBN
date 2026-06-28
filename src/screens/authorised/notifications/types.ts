export type NotificationItem = {
  id: string;
  sender: string;
  message: string;
  timeAgo: string;
  unread: boolean;
};

export interface NotificationsData {
  items: NotificationItem[];
}
