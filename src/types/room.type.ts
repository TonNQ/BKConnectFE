export interface RoomType {
  id: number
  name: string
  room_type: 'PublicRoom' | 'PrivateRoom' | 'ClassRoom'
  avatar: string
  last_message: string
  last_message_time: string
  is_read: boolean
}
