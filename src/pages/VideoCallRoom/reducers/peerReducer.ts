/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-case-declarations */
import { SimpleUser } from 'src/types/user.type'
import { ADD_PEER_STREAM, ADD_PEER_USER_INFO, REMOVE_PEER_STREAM } from './peerActions'

export type PeerState = Record<string, { stream: MediaStream; userInfo: SimpleUser }>
type PeerAction =
  | { type: typeof ADD_PEER_STREAM; payload: { peerId: string; stream: MediaStream; userInfo: SimpleUser } }
  | { type: typeof REMOVE_PEER_STREAM; payload: { peerId: string } }
  | {
      type: typeof ADD_PEER_USER_INFO
      payload: { peerId: string; userInfo: SimpleUser }
    }

export const peersReducer = (state: PeerState, action: PeerAction) => {
  switch (action.type) {
    case ADD_PEER_STREAM:
      return {
        ...state,
        [action.payload.peerId]: {
          ...state[action.payload.peerId],
          stream: action.payload.stream,
          userInfo: action.payload.userInfo
        }
      }
    case ADD_PEER_USER_INFO:
      return {
        ...state,
        [action.payload.peerId]: {
          ...state[action.payload.peerId],
          userInfo: action.payload.userInfo
        }
      }
    case REMOVE_PEER_STREAM:
      const { [action.payload.peerId]: deleted, ...rest } = state
      return rest
    default:
      return { ...state }
  }
}
