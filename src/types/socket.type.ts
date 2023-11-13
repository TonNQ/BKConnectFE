/* eslint-disable @typescript-eslint/no-explicit-any */

export enum WebSocketDataType {
  IsMessage,
  IsFriendRequest,
  IsOnline,
  IsOffline
}

interface SendMessage {
  sender_id: string
  send_time: string
  room_id: number
  type_message: string
  content: string
}

interface ReceiveMessage {
  message_id: number
  sender_id: string
  sender_name: string
  send_time: string
  room_id: number
}

export interface SocketData {
  user_id: string
  data_type: WebSocketDataType
  send_message: any
  friend_request: any
}
