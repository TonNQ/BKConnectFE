/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dut from 'src/assets/images/logo.jpg'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined'
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'
import { SearchFriend } from 'src/types/user.type'
import { relationshipApi } from 'src/apis/relationship.api'
import { toast } from 'react-toastify'

interface Props {
  type: string
  friend: SearchFriend
  updateFriend: (updatedFriend: SearchFriend) => void
}

export default function FriendItem({ type, friend, updateFriend }: Props) {
  const [showPopover, setShowPopover] = useState(false)

  const popoverRef = useRef<HTMLDivElement | null>(null)
  const handlePopoverToggle = () => {
    setShowPopover(!showPopover)
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      // Click ngoài popover, ẩn popover
      setShowPopover(false)
    }
  }

  const handleUnfriend = () => {
    relationshipApi
      .unfriend({ SearchKey: friend.user_id })
      .then(() => {
        updateFriend({ ...friend, isFriend: false })
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='flex w-full flex-row items-center rounded-md border-[1px] border-gray-100 p-3'>
      <img
        src={type === 'friend' ? friend?.avatar : dut}
        alt='avatar'
        className='h-[60px] w-[60px] rounded-md border-[1px] border-gray-100'
      />
      <div className='ml-3 flex grow flex-col justify-center truncate'>
        <div className='truncate text-lg font-semibold'>{friend?.name || 'Người dùng'}</div>
        {type === 'friend' && (
          <div className='grid grid-cols-5 text-sm font-light'>
            <div className='col-span-3 truncate'>MSSV: {friend?.user_id || 'Không xác định'}</div>
            <div className='col-span-2 truncate'>Lớp: {friend?.class_name || 'Không xác định'}</div>
          </div>
        )}
        {type === 'group' && <div className='truncate text-sm font-normal'>10 thành viên</div>}
        {type === 'request' && (
          <div className='grid grid-cols-5 text-sm font-light'>
            <div className='col-span-3 truncate'>MSSV: 102210135</div>
            <div className='col-span-2 truncate'>Lớp: 21T_DT2</div>
          </div>
        )}
      </div>
      {friend.isFriend && (
        <div className='relative rounded-full p-1 hover:bg-grayColor' onClick={handlePopoverToggle}>
          <MoreHorizOutlinedIcon />
          <AnimatePresence>
            {showPopover && (
              <motion.div
                ref={popoverRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className='absolute bottom-[40px] right-0 z-10 min-w-[200px] rounded-md bg-white'
                style={{
                  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div
                  className='flex w-full items-center whitespace-nowrap rounded-tl-md rounded-tr-md px-3 py-2 hover:cursor-pointer hover:bg-blue-50'
                  onClick={() => {}}
                >
                  <AccountCircleOutlinedIcon />
                  <span className='ml-3'>Xem thông tin</span>
                </div>

                <div
                  className='flex w-full items-center whitespace-nowrap px-3 py-2 hover:cursor-pointer hover:bg-blue-50'
                  onClick={() => {}}
                >
                  <DoDisturbAltOutlinedIcon />
                  <span className='ml-3'>Chặn</span>
                </div>

                <div
                  className='flex w-full items-center whitespace-nowrap rounded-bl-md rounded-br-md px-3 py-2 hover:cursor-pointer hover:bg-blue-50'
                  onClick={handleUnfriend}
                >
                  <PersonRemoveAlt1OutlinedIcon />
                  <span className='ml-3'>Hủy kết bạn</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      {!friend.isFriend && (
        <div className='ml-2 min-w-[120px] overflow-hidden overflow-ellipsis whitespace-nowrap rounded-md bg-primary p-2 text-center text-base font-medium text-white hover:cursor-pointer hover:bg-secondary'>
          Thêm bạn bè
        </div>
      )}
    </div>
  )
}
