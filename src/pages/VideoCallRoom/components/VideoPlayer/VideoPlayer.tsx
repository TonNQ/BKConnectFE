/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef } from 'react'

export default function VideoPlayer({ stream, peerId }: { stream: MediaStream | undefined; peerId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    console.log('stream: ', stream)
    if (videoRef.current && stream !== undefined) {
      videoRef.current.srcObject = stream
    }
  }, [stream])
  return (
    <>
      <video ref={videoRef} autoPlay muted={true} />
      <div>peerId: {peerId}</div>
    </>
  )
}
