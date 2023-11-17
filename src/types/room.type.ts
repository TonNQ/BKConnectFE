export interface RoomType {
  id: number
  name: string
  room_type: 'PublicRoom' | 'PrivateRoom' | 'ClassRoom'
  avatar: string
  last_message: string
  last_message_time: string
  is_read: boolean
}

export interface RoomInfo {
  id: number
  name: string
  room_type: 'PublicRoom' | 'PrivateRoom' | 'ClassRoom'
  avatar: string
  last_online: string | null
  total_member: number
  is_online: boolean
}

export interface Message {
  message_id: number
  sender_id: string | null
  sender_name: string | null
  sender_avatar: string
  send_time: string
  room_id: number
  message_type: string
  content: string
  root_message_id: number | null
  root_message_content: string | null
  temp_id: string | null
}

export interface GroupRoom {
  id: number
  name: string
  avatar: string
  total_member: number
}
