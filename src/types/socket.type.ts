/* eslint-disable @typescript-eslint/no-explicit-any */

import { NotificationType, Notification } from './notification.type'
import { Message } from './room.type'
import { MemberOfRoom } from './user.type'

export enum WebSocketDataType {
  IsMessage = 'IsMessage',
  IsOnline = 'IsOnline',
  IsOffline = 'IsOffline',
  IsNotification = 'IsNotification',
  IsInRoom = 'IsInRoom',
  IsOutRoom = 'IsOutRoom',
  IsChangeRoomInfo = 'IsChangeRoomInfo'
}

export interface ChangedRoomInfo {
  room_id: number
  total_member: number
  new_member_list?: MemberOfRoom[]
  left_member_id?: string
}
export interface ReceiveSocketData {
  user_id: string
  data_type: WebSocketDataType
  message: Message
  notification: Notification
  changed_room_info: ChangedRoomInfo
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
