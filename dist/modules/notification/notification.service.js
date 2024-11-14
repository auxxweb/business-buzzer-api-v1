import Notification from "./notification.model.js";
const getNotificationByUser = async (userId) => {
  const notifications = await Notification.find({
    receiverId: userId,
  });
  return notifications;
};
export const notificationService = {
  getNotificationByUser,
};
