/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import dut from 'src/assets/images/logo.jpg'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import classNames from 'classnames'
import { useContext } from 'react'
import { MessageContext } from 'src/contexts/message.context'

interface Props {
  showRoomInfo: boolean
  setShowRoomInfo: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ showRoomInfo, setShowRoomInfo }: Props) {
  const handleShowRoomInfo = () => {
    setShowRoomInfo(!showRoomInfo)
  }
  const { room } = useContext(MessageContext)
  return (
    <div className='flex min-h-[65px] w-full grow-0 items-center justify-between bg-white px-4 shadow-sm shadow-stone-200'>
      <div className='flex items-center'>
        {room?.avatar && <img className='h-[45px] w-[45px] rounded-full' src={room.avatar} alt='ảnh' />}
        {!room?.avatar && <img className='h-[45px] w-[45px] rounded-full' src={dut} alt='ảnh' />}
        <div className='ml-4'>
          <div className='text-lg font-semibold'>{room?.name}</div>
          <div className='text-sm font-extralight text-textColor'>Hoạt động 5 giờ trước</div>
        </div>
      </div>
      <div className='flex items-center space-x-4'>
        <div className='ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md p-4 text-gray-500 hover:cursor-pointer hover:bg-stone-200'>
          <PhoneOutlinedIcon sx={{ fontSize: '24px' }} />
        </div>
        <div className='ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md p-4 text-gray-500 hover:cursor-pointer hover:bg-stone-200'>
          <VideoCameraFrontOutlinedIcon sx={{ fontSize: '24px' }} />
        </div>
        <div className='ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md p-4 text-gray-500 hover:cursor-pointer hover:bg-stone-200'>
          <SearchOutlinedIcon sx={{ fontSize: '24px' }} />
        </div>
        <div
          className={classNames(
            'ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md p-4 hover:cursor-pointer',
            {
              'bg-blue-200 text-primary': showRoomInfo,
              'bg-white text-gray-500  hover:bg-stone-200 ': !showRoomInfo
            }
          )}
          onClick={handleShowRoomInfo}
        >
          <MoreHorizOutlinedIcon sx={{ fontSize: '24px' }} />
        </div>
      </div>
    </div>
  )
}
