/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import 'src/index.css'
import classNames from 'classnames'
import { SocketContext } from 'src/contexts/socket.context'
import NotificationItem from './components/NotificationItem'

export default function Notification() {
  const { isNotificationVisible, setIsNotificationVisible } = useContext(AppContext)
  const { notifications } = useContext(SocketContext)
  const toggleNotificationComponent = () => {
    setIsNotificationVisible(!isNotificationVisible)
  }
  return (
    <div
      className={classNames(
        'absolute left-[70px] top-0 z-10 flex h-[100vh] w-[320px] min-w-[320px] flex-col bg-white shadow-md',
        {
          'slide-in': isNotificationVisible === true,
          'slide-out': isNotificationVisible === false,
          'tranform -translate-x-full': isNotificationVisible === null
        }
      )}
    >
      <div className='m-4 flex items-center'>
        <div className='flex items-center justify-center hover:cursor-pointer' onClick={toggleNotificationComponent}>
          <ArrowBackIosIcon sx={{ fontSize: '18px' }} />
        </div>
        <div className='ml-4 text-2xl font-semibold'>Thông báo</div>
      </div>
      <div className='flex grow flex-col items-center overflow-auto px-2'>
        {notifications.map((notificationInfo) => (
          <NotificationItem key={notificationInfo.id} notificationInfo={notificationInfo} />
        ))}
      </div>
    </div>
  )
}
