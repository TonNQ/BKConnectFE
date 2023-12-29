import { useContext, useEffect } from 'react'
import VideoCallMain from './components/VideoCallMain'
import { SocketContext } from 'src/contexts/socket.context'

export default function VideoCallRoom() {
  const { connectWs } = useContext(SocketContext)
  useEffect(() => {
    connectWs()
  }, [])
  return <VideoCallMain />
}
