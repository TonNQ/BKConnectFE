/* eslint-disable @typescript-eslint/no-explicit-any */

import { NotificationType, Notification } from './notification.type'
import { Message } from './room.type'

export enum WebSocketDataType {
  IsMessage = 'IsMessage',
  IsOnline = 'IsOnline',
  IsOffline = 'IsOffline',
  IsNotification = 'IsNotification'
}

export interface ReceiveSocketData {
  user_id: string
  data_type: WebSocketDataType
  message: Message
  notification: Notification
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

