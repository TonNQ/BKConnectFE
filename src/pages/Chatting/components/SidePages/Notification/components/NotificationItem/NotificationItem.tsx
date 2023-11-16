import classNames from 'classnames'
import { Notification, NotificationType } from 'src/types/notification.type'
import { ShowTimeDifference } from 'src/utils/utils'

interface Props {
  notificationInfo: Notification
}

export default function NotificationItem({ notificationInfo }: Props) {
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
        {notificationInfo.notification_type === NotificationType.IsAcceptFriendRequest && (
          <div className='flex-wrap text-base'>
            <span className='font-semibold text-primary'>{notificationInfo.friend_request?.user_name}</span> đã gửi cho
            bạn lời mời kết bạn.
          </div>
        )}
        {notificationInfo.notification_type === NotificationType.IsInRoom && (
          <div className='flex-wrap text-base'>
            Bạn vừa được thêm vào nhóm
            <span className='font-semibold text-primary'> Lập trình mạng</span>.
          </div>
        )}
        <div className='mt-1 text-xs font-medium text-primary'>
          {ShowTimeDifference(notificationInfo.sender_time, true)}
        </div>
        {notificationInfo.notification_type === NotificationType.IsAcceptFriendRequest && (
          <div className='mt-3 flex flex-row flex-wrap'>
            <div className='mr-2 min-w-[100px] rounded-md bg-primary px-3 py-1 text-center text-white hover:cursor-pointer hover:bg-blue-500'>
              Chấp nhận
            </div>
            <div className='min-w-[100px] rounded-md bg-grayColor px-3 py-1 text-center text-black hover:cursor-pointer hover:bg-gray-200'>
              Từ chối
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
