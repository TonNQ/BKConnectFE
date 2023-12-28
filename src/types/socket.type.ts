/* eslint-disable @typescript-eslint/no-explicit-any */

import { NotificationType, Notification } from './notification.type'
import { MemberOfRoom } from './user.type'
import { Message, RoomInfo } from './room.type'

export enum WebSocketDataType {
  IsMessage = 'IsMessage',
  IsOnline = 'IsOnline',
  IsOffline = 'IsOffline',
  IsNotification = 'IsNotification',
  IsInRoom = 'IsInRoom',
  IsOutRoom = 'IsOutRoom',
  IsChangedRoomInfo = 'IsChangedRoomInfo',
  IsCreateGroupRoom = 'IsCreateGroupRoom',
  IsVideoCall = 'IsVideoCall',
  IsError = 'IsError',
  IsConnectSignal = 'IsConnectSignal'
}

export enum VideoCallDataType {
  IsStartCall = 'IsStartCall',
  IsJoinCall = 'IsJoinCall',
  IsLeaveCall = 'IsLeaveCall'
}

export interface ChangedRoomInfo {
  room_id: number
  total_member: number
  new_member_list?: MemberOfRoom[]
  left_member_id?: string
  new_avatar?: string
  new_name?: string
}
export interface ReceiveSocketData {
  user_id: string
  data_type: WebSocketDataType
  message: Message
  notification: Notification
  changed_room_info: ChangedRoomInfo
  room_info: RoomInfo
  video_call: VideoCallData
  error_message: string
  signal_info: null
}

export interface SendSocketData {
  data_type: WebSocketDataType
  message?: any
  notification?: NotificationSocket
  video_call?: VideoCallData
  signal_info?: null
}

export interface NotificationSocket {
  notification_type: NotificationType
  receiver_id: string
}

export interface VideoCallData {
  room_id: number
  peer_id: string
  video_call_type: VideoCallDataType
  participants?: SimpleUserInfo[]
}

interface SimpleUserInfo {
  id: string
  name: string
  avatar: string
}
