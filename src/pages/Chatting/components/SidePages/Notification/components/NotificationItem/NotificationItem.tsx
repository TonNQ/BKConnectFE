/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames'
import { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { friendRequestApi } from 'src/apis/friendRequest.api'
import { SocketContext } from 'src/contexts/socket.context'
import { Notification, NotificationType } from 'src/types/notification.type'
import { SendSocketData, WebSocketDataType } from 'src/types/socket.type'
import { getUrl } from 'src/utils/getFileFromFirebase'
import { ShowTimeDifference } from 'src/utils/utils'
import dut from 'src/assets/images/logo.jpg'

interface Props {
  notificationInfo: Notification
}

export default function NotificationItem({ notificationInfo }: Props) {
  const { wsRef } = useContext(SocketContext)
  const [isRemoved, setIsRemoved] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const content = contentRef.current
    if (content && content.scrollHeight > content.clientHeight) {
      content.classList.add('break-all')
    }
  }, [])

  const handleReject = () => {
    friendRequestApi
      .removeFriendRequest({ SearchKey: notificationInfo.sender_id as string })
      .then(() => setIsRemoved(true))
      .catch((error) => toast.error(error))
  }

  const handleApproveRequest = () => {
    const approveMessage: SendSocketData = {
      data_type: WebSocketDataType.IsNotification,
      notification: {
        notification_type: NotificationType.IsAcceptFriendRequest,
        receiver_id: notificationInfo.sender_id as string
      }
    }
    wsRef.current?.send(JSON.stringify(approveMessage))
    setIsApproved(true)
  }
  const handleFileName = (fileName: string, maxLength: number) => {
    const words = fileName.split(' ') // Tách các từ trong xâu
    let isTooLong = false
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > maxLength) {
        isTooLong = true
        break
      }
    }
    return isTooLong ? fileName.substring(0, maxLength) + '...' : fileName
  }
  useEffect(() => {
    getUrl('Avatar', notificationInfo.avatar)
      .then((url) => setAvatarUrl(url as string))
      .catch((error) => console.error(error))
  }, [])
  return (
    <div
      className={classNames('mb-2 flex w-full flex-row items-start rounded-lg p-2', {
        'bg-gray-100': notificationInfo.is_read,
        'bg-blue-100': !notificationInfo.is_read
      })}
    >
      <div className='relative h-[60px] w-[60px] min-w-[60px]'>
        <img
          src={avatarUrl ?? dut}
          alt='avatar'
          className='absolute left-0 top-0 mx-auto rounded-full border-[1px] border-gray-100 object-cover'
        />
      </div>
      <div className='ml-2 flex grow flex-col items-start'>
        {notificationInfo.notification_type === NotificationType.IsSendFriendRequest && (
          <div ref={contentRef} className='overflow-wrap-break-word flex-wrap whitespace-pre-wrap text-base'>
            <span className='font-semibold text-primary'>{notificationInfo.sender_name}</span> đã gửi cho bạn lời mời
            kết bạn.
          </div>
        )}
        {notificationInfo.notification_type === NotificationType.IsAcceptFriendRequest && (
          <div ref={contentRef} className='overflow-wrap-break-word flex-wrap whitespace-pre-wrap text-base'>
            <span className='font-semibold text-primary'>{notificationInfo.sender_name}</span> đã chấp nhận lời mời kết
            bạn.
          </div>
        )}
        {notificationInfo.notification_type === NotificationType.IsOutRoom && (
          <div ref={contentRef} className='overflow-wrap-break-word flex-wrap whitespace-pre-wrap text-base'>
            <span className='font-semibold text-primary'>{notificationInfo.sender_name}</span> đã xóa bạn khỏi{' '}
            {notificationInfo.room_message?.room_type === 'PublicRoom' ? 'nhóm ' : 'lớp '}
            <span className='font-semibold text-primary'>{notificationInfo.room_message?.room_name}</span>.
          </div>
        )}
        {notificationInfo.notification_type === NotificationType.IsPostFile && (
          <div ref={contentRef} className='overflow-wrap-break-word flex-wrap whitespace-pre-wrap text-base'>
            <span className='font-semibold text-primary'>{notificationInfo.sender_name}</span> đã tải file{' '}
            <span className='font-semibold text-primary'>
              {handleFileName(
                notificationInfo.post_file?.file_name.substring(
                  notificationInfo.post_file?.file_name.indexOf('/') + 1
                ) as string,
                20
              )}
            </span>{' '}
            lên lớp học <span className='font-semibold text-primary'>{notificationInfo.post_file?.room_name}</span>.
          </div>
        )}
        <div className='mt-1 text-xs font-medium text-primary'>
          {ShowTimeDifference(notificationInfo.send_time, true)}
        </div>
        {notificationInfo.notification_type === NotificationType.IsSendFriendRequest && !isRemoved && !isApproved && (
          <div className='mt-3 flex flex-row flex-wrap'>
            <div
              className='mr-2 min-w-[100px] rounded-md bg-primary px-3 py-1 text-center text-white hover:cursor-pointer hover:bg-blue-500'
              onClick={handleApproveRequest}
            >
              Chấp nhận
            </div>
            <div
              className='min-w-[100px] rounded-md bg-grayColor px-3 py-1 text-center text-black hover:cursor-pointer hover:bg-gray-200'
              onClick={handleReject}
            >
              Từ chối
            </div>
          </div>
        )}
        {notificationInfo.notification_type === NotificationType.IsSendFriendRequest && isApproved && (
          <div className='mt-3 flex flex-row flex-wrap'>
            <div className='text-sm font-semibold text-primary'>Hai bạn đã trở thành bạn bè</div>
          </div>
        )}
        {notificationInfo.notification_type === NotificationType.IsSendFriendRequest && isRemoved && (
          <div className='mt-2 flex flex-row flex-wrap'>
            <div className='min-w-[150px] rounded-md bg-grayColor px-3 py-1 text-center text-black '>
              Đã từ chối kết bạn
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
