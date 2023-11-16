export enum NotificationType {
  IsSendFriendRequest = 'IsSendFriendRequest',
  IsAcceptFriendRequest = 'IsAcceptFriendRequest',
  IsOutRoom = 'IsOutRoom',
  IsInRoom = 'IsInRoom',
  IsPostFile = 'IsPostFile'
}

interface UserNotification {
  user_id: string
  user_name: string
  user_class: string
}

export interface Notification {
  id: number
  sender_time: string
  notification_type: NotificationType
  avatar: string
  is_read: boolean
  friend_request?: UserNotification
}
