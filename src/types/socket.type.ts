/* eslint-disable @typescript-eslint/no-explicit-any */

import { NotificationType, Notification } from './notification.type'
import { Message, RoomInfo } from './room.type'

export enum WebSocketDataType {
  IsMessage = 'IsMessage',
  IsOnline = 'IsOnline',
  IsOffline = 'IsOffline',
  IsNotification = 'IsNotification',
  IsCreateGroupRoom = 'IsCreateGroupRoom'
}

export interface ReceiveSocketData {
  user_id: string
  data_type: WebSocketDataType
  message: Message
  notification: Notification
  room_info: RoomInfo
  video_call: null
}

export interface SendSocketData {
  data_type: WebSocketDataType
  message?: any
  notification?: NotificationSocket
}

export interface NotificationSocket {
  notification_type: NotificationType
  receiver_id: string
}
