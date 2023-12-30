/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Fragment, useContext, useEffect, useReducer, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SocketContext } from 'src/contexts/socket.context'
import VideoPlayer from '../VideoPlayer'
import { ReceiveSocketData, SendSocketData, VideoCallDataType, WebSocketDataType } from 'src/types/socket.type'
import { PeerState, peersReducer } from '../../reducers/peerReducer'
import { addPeerAction, removePeerAction } from '../../reducers/peerActions'
import Peer from 'peerjs'
import { v4 as uuidV4 } from 'uuid'
import { AppContext } from 'src/contexts/app.context'
import { SimpleUser } from 'src/types/user.type'
import CallEndIcon from '@mui/icons-material/CallEnd'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import PeopleIcon from '@mui/icons-material/People'
import { calculateGridSize } from 'src/utils/utils'
import NotifyLayout from 'src/layouts/NotifyLayout'
import path from 'src/constants/path'
import { getUrl } from 'src/utils/getFileFromFirebase'
import dut from 'src/assets/images/logo.jpg'

export default function VideoCallMain() {
  const { roomId } = useParams()
  const { profile } = useContext(AppContext)
  const { wsRef, myPeer } = useContext(SocketContext)
  const [peers, dispatch] = useReducer(peersReducer, {})
  const { setMyPeer } = useContext(SocketContext)
  const [stream, setStream] = useState<MediaStream>()
  const [isViewed, setIsViewed] = useState<boolean>(true)
  const [showParticipants, setShowParticipants] = useState<boolean>(true)
  const [myAvatarUrl, setMyAvatarUrl] = useState<string>('')
  const [avatarUrlList, setAvatarUrlList] = useState<{ user_id: string; peer_id: string; url: string }[]>([])
  const stopStream = () => {
    if (!stream) return
    stream.getTracks().forEach((track) => {
      track.stop()
    })
    setStream(undefined)
  }
  const handleLeaveRoom = () => {
    console.log('leave room')
    const message: SendSocketData = {
      data_type: WebSocketDataType.IsVideoCall,
      video_call: {
        room_id: Number(roomId),
        video_call_type: VideoCallDataType.IsLeaveCall,
        peer_id: myPeer?.id as string
      }
    }
    wsRef.current?.send(JSON.stringify(message))
    stopStream()
    myPeer?.destroy()
    setIsViewed(false)
  }
  useEffect(() => {
    getUrl('Avatar', profile?.avatar as string)
      .then((url) => setMyAvatarUrl(url as string))
      .catch((error) => console.error(error))
  })
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
                const call = myPeer.call(peer.peer_id, stream as MediaStream, {
                  metadata: {
                    user_id: peer.id,
                    avatar: peer.avatar,
                    name: peer.name
                  }
                })
                call.on('stream', (peerStream) => {
                  console.log('peerId: ', peer.peer_id)
                  const peerUserInfo: SimpleUser = {
                    user_id: peer.id,
                    avatar: peer.avatar,
                    name: peer.name
                  }
                  dispatch(addPeerAction(peer.peer_id, peerStream, peerUserInfo))
                  getUrl('Avatar', peerUserInfo.avatar as string)
                    .then((url) =>
                      setAvatarUrlList((prev) => [
                        ...prev,
                        { user_id: peer.id, peer_id: peer.peer_id, url: url as string }
                      ])
                    )
                    .catch((error) => console.error(error))
                })
              }
            })
          } else if (receiveMsg.video_call.video_call_type === VideoCallDataType.IsLeaveCall) {
            console.log('remove: ', receiveMsg.video_call.peer_id)
            dispatch(removePeerAction(receiveMsg.video_call.peer_id))
            setAvatarUrlList((prev) => {
              return prev.filter((peer) => peer.peer_id !== receiveMsg.video_call.peer_id)
            })
          }
        }
      }
    }
    myPeer.on('call', (call) => {
      const { user_id, avatar, name } = call.metadata
      const userInfo: SimpleUser = {
        avatar: avatar as string,
        name: name as string,
        user_id: user_id as string
      }
      call.answer(stream)
      call.on('stream', (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream, userInfo))
      })
    })
  }, [myPeer, stream, wsRef])
  if (isViewed)
    return (
      <Fragment>
        <div className='flex h-[calc(100%-80px)] max-h-[calc(100%-80px)] w-[100%] flex-row bg-lightBlackColor'>
          <div
            className={`relative grid h-full ${showParticipants ? 'w-[75%]' : 'w-[100%]'} grid-cols-${
              calculateGridSize(Object.values(peers as PeerState).filter((peer) => !!peer.stream).length).columns
            } grid-rows-${
              calculateGridSize(Object.values(peers as PeerState).filter((peer) => !!peer.stream).length).rows
            } gap-4 p-4`}
          >
            <div className='absolute bottom-0 right-[8px] z-50 h-[180px] w-[320px] rounded-md bg-white'>
              <VideoPlayer
                stream={stream}
                peerId={myPeer?.id || ''}
                userInfo={{
                  user_id: profile?.user_id as string,
                  name: profile?.name + ' (Bạn)',
                  avatar: profile?.avatar as string
                }}
              />
            </div>
            {Object.values(peers as PeerState).length === 0 && (
              <div className='flex items-center justify-center text-3xl font-normal text-textColor'>
                Đang chờ người khác tham gia cuộc gọi
              </div>
            )}
            {Object.values(peers as PeerState)
              .filter((peer) => !!peer.stream)
              .map((peer) => (
                <VideoPlayer
                  key={peer.stream.id}
                  stream={peer.stream}
                  peerId={peer.stream.id}
                  userInfo={peer.userInfo}
                />
              ))}
          </div>
          {showParticipants && (
            <div className='mx-4 mb-0 mt-4 w-[25%] overflow-auto rounded-md bg-white p-4'>
              <div className='mb-4 flex flex-row items-center justify-between text-lg font-medium'>
                <span>Những người tham gia cuộc gọi</span>
                <div
                  className='ml-4 flex h-[30px] w-[30px] items-center justify-center rounded-full text-gray-500 hover:cursor-pointer hover:bg-stone-100'
                  onClick={() => {
                    setShowParticipants(false)
                  }}
                >
                  <CloseOutlinedIcon sx={{ fontSize: '24px' }} />
                </div>
              </div>
              <div className='my-2 flex flex-row items-center'>
                <div className='relative h-[40px] w-[40px]'>
                  <img
                    className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[1px] border-gray-200 object-cover'
                    src={myAvatarUrl ?? dut}
                    alt='ảnh'
                  />
                </div>
                <div className='ml-4 text-lg font-normal'>{profile?.name + ' (Bạn)'}</div>
              </div>
              {Object.values(peers as PeerState)
                .filter((peer) => !!peer.stream)
                .map((peer) => (
                  <Fragment key={peer.stream.id}>
                    <div className='my-2 flex flex-row items-center'>
                      <div className='relative h-[40px] w-[40px]'>
                        <img
                          className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[1px] border-gray-200 object-cover'
                          src={avatarUrlList.find((urlObj) => urlObj.user_id === peer.userInfo.user_id)?.url ?? dut}
                          alt='ảnh'
                        />
                      </div>
                      <div className='ml-4 text-lg font-normal'>{peer.userInfo.name}</div>
                    </div>
                  </Fragment>
                ))}
            </div>
          )}
        </div>

        <div className='flex h-[80px] min-h-[80px] w-full flex-row items-center justify-center space-x-2 bg-lightBlackColor px-8'>
          <div className='flex w-full flex-row'>
            <div className='h-full min-w-[100px]'></div>
            <div className='grow-1 flex h-full flex-1 items-center justify-center'>
              <div
                className='flex h-[44px] w-[44px] items-center justify-center rounded-full bg-red-500 hover:cursor-pointer hover:bg-red-600'
                onClick={handleLeaveRoom}
              >
                <CallEndIcon sx={{ color: 'white', fontSize: `28px` }} />
              </div>
            </div>
            <div className='flex h-full min-w-[100px] flex-row-reverse'>
              <div
                className='flex h-[44px] w-[44px] items-center justify-center rounded-full hover:cursor-pointer hover:bg-slate-800'
                onClick={() => {
                  setShowParticipants((prev) => !prev)
                }}
              >
                <PeopleIcon sx={{ color: 'white', fontSize: `28px` }} />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  else {
    return (
      <NotifyLayout>
        <div className='text-center text-2xl font-medium text-primary'>Bạn đã rời khỏi cuộc gọi này</div>
        <Link
          to={path.home}
          className='rounded-md bg-primary px-10 py-1 text-center text-lg uppercase text-white hover:border-secondary hover:bg-secondary hover:text-white'
        >
          Quay lại trang chủ
        </Link>
      </NotifyLayout>
    )
  }
}
