import { SimpleUser } from 'src/types/user.type'

export const ADD_PEER_STREAM = 'ADD_PEER_STREAM' as const
export const REMOVE_PEER_STREAM = 'REMOVE_PEER_STREAM' as const
export const ADD_PEER_USER_INFO = 'ADD_PEER_USER_INFO' as const

export const addPeerAction = (peerId: string, stream: MediaStream, userInfo: SimpleUser) => ({
  type: ADD_PEER_STREAM,
  payload: { peerId, stream, userInfo }
})

export const removePeerAction = (peerId: string) => ({
  type: REMOVE_PEER_STREAM,
  payload: { peerId }
})

export const addPeerUserInfoAction = (peerId: string, userInfo: SimpleUser) => ({
  type: ADD_PEER_USER_INFO,
  payload: { peerId, userInfo }
})
