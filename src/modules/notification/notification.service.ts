import Notification from "./notification.model.js"

const getNotificationByUser = async (userId: any): Promise<any> => {
    const notifications = await Notification.find({
        receiverId: userId,
    })

    return notifications

}

export const notificationService = {
    getNotificationByUser
}