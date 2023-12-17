export enum NotificationType {
  IsSendFriendRequest = 'IsSendFriendRequest',
  IsAcceptFriendRequest = 'IsAcceptFriendRequest',
  IsOutRoom = 'IsOutRoom',
  IsPostFile = 'IsPostFile'
}

interface RoomMessage {
  room_id: number
  room_name: string
  room_type: 'PrivateRoom' | 'PublicRoom' | 'ClassRoom'
}

interface FileInfo {
  room_id: number
  room_name: string
  file_id: number
  file_name: string
}

export interface Notification {
  id: number
  sender_id: string
  sender_name: string
  send_time: string
  notification_type: NotificationType
  avatar: string
  is_read: boolean
  room_message?: RoomMessage
  post_file?: FileInfo
}
