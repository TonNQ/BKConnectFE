import Peer from 'peerjs'
import { v4 as uuidV4 } from 'uuid'
import { useContext, useEffect, useState } from 'react'
import VideoCallMain from './components/VideoCallMain'
import { BaseConfig, SocketContext } from 'src/contexts/socket.context'
import { ReceiveSocketData, SendSocketData, VideoCallDataType, WebSocketDataType } from 'src/types/socket.type'
import { useParams } from 'react-router-dom'

export default function VideoCallRoom() {
  const { roomId } = useParams()
  const { connectWs, setMyPeer } = useContext(SocketContext)
  const { wsRef, isReadyToCall, wsState } = useContext(SocketContext)
  const [errorMessage, setErrorMessage] = useState<string>('')
  useEffect(() => {
    connectWs()
  }, [])
  useEffect(() => {
    if (isReadyToCall && wsState === BaseConfig.webSocketState.OPEN) {
      // gửi msg qua socket: join call
      const myPeerId = uuidV4()
      const peer = new Peer(myPeerId, {
        host: 'nsfwdetector.website',
        port: 80
      })
      setMyPeer(peer)
      // console.log('peer', peer)
      const message: SendSocketData = {
        data_type: WebSocketDataType.IsVideoCall,
        video_call: {
          room_id: Number(roomId),
          peer_id: myPeerId,
          video_call_type: VideoCallDataType.IsJoinCall
        }
      }
      wsRef.current?.send(JSON.stringify(message))
      // console.log('send')
      if (wsRef.current) {
        wsRef.current.onmessage = (e) => {
          const receiveMsg: ReceiveSocketData = JSON.parse(e.data)
          // console.log('Received message from server:', receiveMsg)
          if (receiveMsg.data_type === WebSocketDataType.IsError) {
            setErrorMessage(receiveMsg.error_message)
          }
        }
      }
    }
  }, [wsState])
  if (errorMessage) {
    return <div>{errorMessage}</div>
  } else {
    return <VideoCallMain />
  }
}
