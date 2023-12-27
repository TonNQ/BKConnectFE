/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef } from 'react'

export default function VideoPlayer({ stream }: { stream: MediaStream | undefined }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (videoRef.current && stream !== undefined) {
      videoRef.current.srcObject = stream
    }
  }, [stream])
  return <video ref={videoRef} autoPlay muted={true} />
}
