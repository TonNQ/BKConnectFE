/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { friendRequestApi } from 'src/apis/friendRequest.api'
import dut from 'src/assets/images/logo.jpg'
import { AppContext } from 'src/contexts/app.context'
import { SocketContext } from 'src/contexts/socket.context'
import { NotificationType } from 'src/types/notification.type'
import { SendSocketData, WebSocketDataType } from 'src/types/socket.type'
import { SearchUser } from 'src/types/user.type'
import { getUrl } from 'src/utils/getFileFromFirebase'

interface Props {
  user: SearchUser
}

export default function User({ user }: Props) {
  const { wsRef } = useContext(SocketContext)
  const { profile } = useContext(AppContext)
  const [isFriend, setIsFriend] = useState<boolean>(user.is_friend)
  const [isSenderRequest, setIsSenderRequest] = useState<string | null>(user.sender_friend_request)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const handleSendFriendRequest = () => {
    const sendRequest: SendSocketData = {
      data_type: WebSocketDataType.IsNotification,
      notification: {
        notification_type: NotificationType.IsSendFriendRequest,
        receiver_id: user.user_id
      }
    }
    wsRef.current?.send(JSON.stringify(sendRequest))
    setIsSenderRequest(profile?.user_id as string)
  }
  const handleRemoveFriendRequest = () => {
    friendRequestApi
      .removeFriendRequest({ SearchKey: user.user_id })
      .then(() => setIsSenderRequest(null))
      .catch((error) => toast.error(error))
  }
  const handleApproveFriendRequest = () => {
    const approveMessage: SendSocketData = {
      data_type: WebSocketDataType.IsNotification,
      notification: {
        notification_type: NotificationType.IsAcceptFriendRequest,
        receiver_id: user.user_id
      }
    }
    wsRef.current?.send(JSON.stringify(approveMessage))
    setIsFriend(true)
  }
  useEffect(() => {
    getUrl('Avatar', user.avatar)
      .then((url) => setAvatarUrl(url as string))
      .catch((error) => console.error(error))
  }, [])
  return (
    <div className='flex w-full rounded-md bg-stone-50 px-3 py-2'>
      <div className='relative h-[50px] w-[50px] min-w-[50px]'>
        <img
          src={avatarUrl ?? dut}
          alt='avatar user'
          className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[1px] border-gray-200 object-cover'
        />
      </div>
      <div className='ml-2 flex flex-1 flex-col'>
        <div className='grid flex-1 grid-cols-12 items-center justify-center'>
          <div className='col-span-7 mr-1 truncate'>
            <span className='truncate text-base font-semibold'>{user.name}</span>
          </div>
          {isFriend && (
            <div className='col-span-5 items-center justify-center'>
              <div className='rounded-md border-[1px] border-primary bg-white py-1 text-center text-xs text-primary '>
                Bạn bè
              </div>
            </div>
          )}
          {!isFriend && isSenderRequest === null && (
            <div className='col-span-5 items-center justify-center' onClick={handleSendFriendRequest}>
              <div className='rounded-md bg-primary px-2 py-1 text-center text-xs font-medium text-white hover:cursor-pointer hover:bg-secondary'>
                Kết bạn
              </div>
            </div>
          )}
          {!isFriend && isSenderRequest === profile?.user_id && (
            <div className='col-span-5 items-center justify-center' onClick={handleRemoveFriendRequest}>
              <div className='rounded-md bg-gray-200 px-2 py-1 text-center text-xs hover:cursor-pointer hover:bg-gray-300'>
                Hủy
              </div>
            </div>
          )}
          {!isFriend && isSenderRequest !== null && isSenderRequest !== profile?.user_id && (
            <div className='col-span-5 items-center justify-center' onClick={handleApproveFriendRequest}>
              <div className='rounded-md bg-primary px-2 py-1 text-center text-xs font-medium text-white hover:cursor-pointer hover:bg-secondary'>
                Chấp nhận
              </div>
            </div>
          )}
        </div>
        <div className='mt-1 grid flex-1 grid-cols-12'>
          {user.class_name && (
            <>
              <div className='col-span-7 truncate'>
                <div className='truncate text-xs text-textColor'>MSSV: {user.user_id}</div>
              </div>
              <div className='col-span-5 truncate'>
                <div className='truncate text-xs text-textColor'>Lớp: {user.class_name}</div>
              </div>
            </>
          )}
          {!user.class_name && (
            <div className='col-span-12 truncate'>
              <div className='truncate text-xs text-textColor'>MSSV: {user.user_id}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
