import { useContext, useEffect } from 'react'
import { SocketContext } from 'src/contexts/socket.context'
import VideoCallMain from './components/VideoCallMain'

export default function VideoCallRoom() {
  const { connectWs } = useContext(SocketContext)
  useEffect(() => {
    connectWs()
  }, [])
  return (
    <div className='flex h-[100vh] max-h-[100vh] w-[100wh] max-w-[100wh] flex-col'>
      <VideoCallMain />
    </div>
  )
}
