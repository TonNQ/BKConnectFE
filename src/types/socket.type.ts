/* eslint-disable @typescript-eslint/no-explicit-any */

export enum WebSocketDataType {
  IsMessage,
  IsFriendRequest,
  IsOnline,
  IsOffline
}

export interface SocketData {
  user_id: string
  data_type: WebSocketDataType
  message: any
  friend_request: any
}
