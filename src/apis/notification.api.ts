import { Notification } from 'src/types/notification.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const notificationApi = {
  getListOfNotifications() {
    return http.get<SuccessResponse<Notification[]>>('/notifications/getListOfNotifications')
  },
  updateNotifications() {
    return http.put<SuccessResponse<null>>('/notifications/updateNotifications')
  }
}

export default notificationApi
