/* eslint-disable @typescript-eslint/no-explicit-any */

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
  friend_request: any
}

export interface SendSocketData {
  user_id?: string
  data_type: WebSocketDataType
  message?: any
  notification?: Notification
}

export interface Notification {
  notification_type: NotificationType
  receiver_id: string
}

export enum NotificationType {
  IsSendFriendRequest = 'IsSendFriendRequest',
  IsAcceptFriendRequest = 'IsAcceptFriendRequest',
  IsOutRoom = 'IsOutRoom',
  IsPostFile = 'IsPostFile'
}
