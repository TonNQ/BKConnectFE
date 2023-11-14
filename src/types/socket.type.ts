/* eslint-disable @typescript-eslint/no-explicit-any */

import { Message } from "./room.type"

export enum WebSocketDataType {
  IsMessage = 'IsMessage',
  IsFriendRequest = 'IsFriendRequest',
  IsOnline = 'IsOnline',
  IsOffline = 'IsOffline'
}

export interface ReceiveSocketData {
  user_id: string
  data_type: WebSocketDataType
  message: Message
  friend_request: any
}

export interface SendSocketData {
  data_type: WebSocketDataType
  message: any
}
