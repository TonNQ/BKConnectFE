export interface RoomType {
  id: number
  name: string
  room_type: 'PublicRoom' | 'PrivateRoom' | 'ClassRoom'
  avatar: string
  last_message: string
  last_message_time: string
  is_read: boolean
}

export interface Message {
  message_id: number
  sender_id: string
  sender_name: string
  send_time: string
  type_message: string
  content: string
  root_message_id: number
  root_message_content: string | null
}
