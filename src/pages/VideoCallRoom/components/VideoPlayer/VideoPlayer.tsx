/* eslint-disable jsx-a11y/media-has-caption */
import { useContext, useEffect, useRef } from 'react'
import { SocketContext } from 'src/contexts/socket.context'

export default function VideoPlayer({ stream, peerId }: { stream: MediaStream | undefined; peerId: string }) {
  const { myPeer } = useContext(SocketContext)
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    console.log('peerId', peerId)
    if (videoRef.current && stream !== undefined) {
      videoRef.current.srcObject = stream
    }
  }, [stream])
  return (
    <>
      <video ref={videoRef} autoPlay muted={myPeer?.id === peerId ? true : false} />
      {/* <div>peerId: {peerId}</div> */}
    </>
  )
}
