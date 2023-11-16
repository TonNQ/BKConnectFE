export enum NotificationType {
  IsSendFriendRequest = 'IsSendFriendRequest',
  IsAcceptFriendRequest = 'IsAcceptFriendRequest',
  IsOutRoom = 'IsOutRoom',
  IsInRoom = 'IsInRoom',
  IsPostFile = 'IsPostFile'
}

interface RoomMessage {
  room_name: string
  room_type: 'PrivateRoom' | 'PublicRoom' | 'ClassRoom'
}

export interface Notification {
  id: number
  sender_id: string
  sender_name: string
  sender_time: string
  notification_type: NotificationType
  avatar: string
  is_read: boolean
  room_message?: RoomMessage
}
