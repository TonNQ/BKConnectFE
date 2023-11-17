import classNames from 'classnames'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { friendRequestApi } from 'src/apis/friendRequest.api'
import { SocketContext } from 'src/contexts/socket.context'
import { Notification, NotificationType } from 'src/types/notification.type'
import { SendSocketData, WebSocketDataType } from 'src/types/socket.type'
import { ShowTimeDifference } from 'src/utils/utils'

interface Props {
  notificationInfo: Notification
}

export default function NotificationItem({ notificationInfo }: Props) {
  const { wsRef } = useContext(SocketContext)
  const [isRemoved, setIsRemoved] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
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
  return (
    <div
      className={classNames('mb-2 flex w-full flex-row items-start rounded-lg p-2', {
        'bg-gray-100': notificationInfo.is_read,
        'bg-blue-100': !notificationInfo.is_read
      })}
    >
      <img
        src={notificationInfo.avatar}
        alt='avatar'
        className='h-[60px] w-[60px] min-w-[60px] rounded-full border-[1px] border-gray-100'
      />
      <div className='ml-2 flex grow flex-col items-start'>
        {notificationInfo.notification_type === NotificationType.IsSendFriendRequest && (
          <div className='flex-wrap text-base'>
            <span className='font-semibold text-primary'>{notificationInfo.sender_name}</span> đã gửi cho bạn lời mời
            kết bạn.
          </div>
        )}
        {notificationInfo.notification_type === NotificationType.IsAcceptFriendRequest && (
          <div className='flex-wrap text-base'>
            <span className='font-semibold text-primary'>{notificationInfo.sender_name}</span> đã chấp nhận lời mời kết
            bạn.
          </div>
        )}
        {notificationInfo.notification_type === NotificationType.IsInRoom && (
          <div className='flex-wrap text-base'>
            Bạn vừa được <span className='font-semibold text-primary'>{notificationInfo.sender_name}</span> thêm vào{' '}
            {notificationInfo.room_message?.room_type === 'PublicRoom' ? 'nhóm ' : 'lớp '}
            <span className='font-semibold text-primary'>{notificationInfo.room_message?.room_name}</span>.
          </div>
        )}
        {notificationInfo.notification_type === NotificationType.IsOutRoom && (
          <div className='flex-wrap text-base'>
            <span className='font-semibold text-primary'>{notificationInfo.sender_name}</span> đã đuổi bạn khỏi{' '}
            {notificationInfo.room_message?.room_type === 'PublicRoom' ? 'nhóm ' : 'lớp '}
            <span className='font-semibold text-primary'>{notificationInfo.room_message?.room_name}</span>.
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
