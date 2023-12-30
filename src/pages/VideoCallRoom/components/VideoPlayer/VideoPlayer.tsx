/* eslint-disable jsx-a11y/media-has-caption */
import { useContext, useEffect, useRef } from 'react'
import { SocketContext } from 'src/contexts/socket.context'
import { SimpleUser } from 'src/types/user.type'

export default function VideoPlayer({
  stream,
  peerId,
  userInfo
}: {
  stream: MediaStream | undefined
  peerId: string
  userInfo: SimpleUser
}) {
  const { myPeer } = useContext(SocketContext)
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    console.log('peerId', peerId)
    if (videoRef.current && stream !== undefined) {
      videoRef.current.srcObject = stream
    }
  }, [stream])
  return (
    <div className='relative flex h-full max-h-full items-center justify-center'>
      <video
        className='aspect-video h-full  max-w-full overflow-hidden object-cover'
        ref={videoRef}
        autoPlay
        muted={myPeer?.id === peerId ? true : false}
      />
      <div className='absolute bottom-[8px] left-[16px] max-w-[80%] truncate text-base font-normal text-white'>
        {userInfo.name || ''}
      </div>
      {/* <div>peerId: {peerId}</div> */}
    </div>
  )
}
