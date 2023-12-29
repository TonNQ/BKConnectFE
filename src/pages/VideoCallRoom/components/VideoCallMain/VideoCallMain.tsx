import { useContext, useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SocketContext } from 'src/contexts/socket.context'
import VideoPlayer from '../VideoPlayer'
import { ReceiveSocketData, SendSocketData, VideoCallDataType, WebSocketDataType } from 'src/types/socket.type'
import { PeerState, peersReducer } from '../../reducers/peerReducer'
import { addPeerAction, removePeerAction } from '../../reducers/peerActions'
import Peer from 'peerjs'
import { v4 as uuidV4 } from 'uuid'

export default function VideoCallMain() {
  const { roomId } = useParams()
  const { wsRef, myPeer } = useContext(SocketContext)
  const [peers, dispatch] = useReducer(peersReducer, {})
  const { setMyPeer } = useContext(SocketContext)
  const [stream, setStream] = useState<MediaStream>()

  // useEffect(() => {
  //   // gửi msg qua socket: join call
  //   const myPeerId = uuidV4()
  //   const peer = new Peer(myPeerId, {
  //     debug: 3,
  //     host: 'nsfwdetector.website',
  //     config: {
  //       iceServers: [{ url: 'stun:stun.l.google.com:19302' }]
  //     },
  //     secure: true
  //   })
  //   setMyPeer(peer)
  //   try {
  //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
  //       console.log('stream: ', stream)
  //       setStream(stream)
  //     })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }, [])
  // useEffect(() => {
  //   // console.log('peer', peer)
  //   const message: SendSocketData = {
  //     data_type: WebSocketDataType.IsVideoCall,
  //     video_call: {
  //       room_id: Number(roomId),
  //       peer_id: myPeer?.id as string,
  //       video_call_type: VideoCallDataType.IsJoinCall
  //     }
  //   }
  //   console.log(message)
  //   console.log('wsRef ', wsRef)
  //   console.log('wsRef.current ', wsRef.current)
  //   wsRef.current?.send(JSON.stringify(message))
  //   // console.log('send')
  //   if (wsRef.current) {
  //     wsRef.current.onmessage = (e) => {
  //       const receiveMsg: ReceiveSocketData = JSON.parse(e.data)
  //       // console.log('Received message from server:', receiveMsg)
  //       if (receiveMsg.data_type === WebSocketDataType.IsError) {
  //         setErrorMessage(receiveMsg.error_message)
  //       }
  //     }
  //   }
  // }, [myPeer, wsRef])
  useEffect(() => {
    const myPeerId = uuidV4()
    const peer = new Peer(myPeerId, {
      debug: 3,
      host: 'nsfwdetector.website',
      config: {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] // Use 'urls' instead of 'url'
      },
      secure: true
    })
    setMyPeer(peer)

    try {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        setStream(stream)

        const message: SendSocketData = {
          data_type: WebSocketDataType.IsVideoCall,
          video_call: {
            room_id: Number(roomId),
            peer_id: myPeerId,
            video_call_type: VideoCallDataType.IsJoinCall
          }
        }

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify(message))
        } else {
          console.log('WebSocket connection is not open yet.')
        }
      })
    } catch (e) {
      console.log(e)
    }
  }, [roomId, wsRef])
  useEffect(() => {
    console.log('wsRef ', wsRef)
    console.log('wsRef.current ', wsRef.current)
    if (!myPeer) return
    if (!stream) return
    if (!wsRef) return
    if (wsRef.current) {
      wsRef.current.onmessage = (e) => {
        const receiveMsg: ReceiveSocketData = JSON.parse(e.data)
        console.log('Received message from server:', receiveMsg)
        if (receiveMsg.data_type === WebSocketDataType.IsVideoCall) {
          if (receiveMsg.video_call.video_call_type === VideoCallDataType.IsJoinCall) {
            receiveMsg.video_call.participants?.forEach((peer) => {
              if (peer.peer_id !== myPeer.id) {
                const call = myPeer.call(peer.peer_id, stream as MediaStream)
                call.on('stream', (peerStream) => {
                  console.log('peerId: ', peer.peer_id)
                  dispatch(addPeerAction(peer.peer_id, peerStream))
                })
              }
            })
          } else if (receiveMsg.video_call.video_call_type === VideoCallDataType.IsLeaveCall) {
            dispatch(removePeerAction(receiveMsg.video_call.peer_id))
          }
        }
      }
    }
    myPeer.on('call', (call) => {
      call.answer(stream)
      call.on('stream', (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream))
      })
    })
  }, [myPeer, stream, wsRef])
  return (
    <>
      <div>RoomID: {roomId}</div>
      <div className='grid grid-cols-4 gap-4'>
        <VideoPlayer stream={stream} peerId={myPeer?.id || ''} />
        {Object.values(peers as PeerState).map((peer, index) => (
          <VideoPlayer key={index} stream={peer.stream} peerId={peer.stream.id} />
        ))}
      </div>
    </>
  )
}
