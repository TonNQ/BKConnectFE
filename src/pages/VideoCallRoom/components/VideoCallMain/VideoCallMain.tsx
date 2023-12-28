import { useContext, useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SocketContext } from 'src/contexts/socket.context'
import VideoPlayer from '../VideoPlayer'
import { ReceiveSocketData, VideoCallDataType, WebSocketDataType } from 'src/types/socket.type'
import { PeerState, peersReducer } from '../../reducers/peerReducer'
import { addPeerAction, removePeerAction } from '../../reducers/peerActions'

export default function VideoCallMain() {
  const { roomId } = useParams()
  const { wsRef, myPeer } = useContext(SocketContext)
  const [stream, setStream] = useState<MediaStream>()
  const [peers, dispatch] = useReducer(peersReducer, {})
  useEffect(() => {
    try {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        console.log('stream: ', stream)
        setStream(stream)
      })
    } catch (e) {
      console.log(e)
    }
  }, [])
  useEffect(() => {
    if (!myPeer) return
    if (!stream) return
    if (!wsRef) return
    // console.log('myPeer', myPeer)
    if (wsRef.current) {
      wsRef.current.onmessage = (e) => {
        const receiveMsg: ReceiveSocketData = JSON.parse(e.data)
        // console.log('Received message from server:', receiveMsg)
        if (receiveMsg.data_type === WebSocketDataType.IsVideoCall) {
          if (receiveMsg.video_call.video_call_type === VideoCallDataType.IsJoinCall) {
            console.log('joincall')
            const call = myPeer.call(receiveMsg.video_call.peer_id, stream as MediaStream)
            console.log('call ', call)
            call.on('stream', (peerStream) => {
              console.log('peerId: ', receiveMsg.video_call.peer_id)
              dispatch(addPeerAction(receiveMsg.video_call.peer_id, peerStream))
            })
            myPeer.on('call', (call) => {
              call.answer(stream)
              call.on('stream', (peerStream) => {
                console.log('call on ')
                dispatch(addPeerAction(call.peer, peerStream))
              })
            })
          } else if (receiveMsg.video_call.video_call_type === VideoCallDataType.IsLeaveCall) {
            dispatch(removePeerAction(receiveMsg.video_call.peer_id))
          }
        }
      }
      console.log('peers:', peers)
    }
  }, [myPeer, stream])
  console.log('myPeer: ', myPeer)
  return (
    <>
      <div>RoomID: {roomId}</div>
      <div className='grid grid-cols-4 gap-4'>
        <VideoPlayer stream={stream} />
        {Object.values(peers as PeerState).map((peer, index) => (
          <VideoPlayer key={index} stream={peer.stream} />
        ))}
      </div>
    </>
  )
}
