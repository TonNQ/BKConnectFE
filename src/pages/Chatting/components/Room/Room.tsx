/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import dut from 'src/assets/images/logo.jpg'
import CircleIcon from '@mui/icons-material/Circle'
import { RoomInfo } from 'src/types/room.type'
import { ConvertDateTime, ShowTimeDifference } from 'src/utils/utils'
import messageApi from 'src/apis/messages.api'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { SocketContext } from 'src/contexts/socket.context'
import { getUrl } from 'src/utils/getFileFromFirebase'

interface Props {
  room: RoomInfo
  setInputSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function Room({ room, setInputSearch }: Props) {
  const { setMessages, setRoom, setRoomInfo, setRoomList, setAddMemberToRoomId } = useContext(SocketContext)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const handleClick = async () => {
    try {
      const messageResponse = await messageApi.getMessagesByRoom({ SearchKey: room.id })
      setRoomInfo(room)
      setMessages([...messageResponse.data.data])
      setRoom(room)
      setRoomList((prevRoomList) => {
        if (prevRoomList === null) return null
        return prevRoomList?.map((roomItem) => {
          if (roomItem.id === room.id) {
            return { ...roomItem, is_read: true }
          } else {
            return roomItem
          }
        })
      })
      setInputSearch('')
      setAddMemberToRoomId(room.id)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getUrl(room.room_type === 'PrivateRoom' ? 'Avatar' : 'Avatar_Room', room.avatar as string).then((url) => {
      setAvatarUrl(url as string)
    })
  }, [room])
  return (
    <div className='flex w-full rounded-md bg-stone-50 px-3 py-2 hover:cursor-pointer' onClick={handleClick}>
      <div className='relative h-[50px] w-[50px] min-w-[50px]'>
        <img
          src={avatarUrl ?? dut}
          alt='avatar room'
          className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[1px] border-gray-200 object-cover'
        />
        {(room.is_online || ShowTimeDifference(room.last_online || '', false) === 'Đang hoạt động') && (
          <div className='absolute bottom-0 right-0 h-[16px] w-[16px] rounded-full border-[3px] border-white bg-green-500'></div>
        )}
      </div>
      <div className='ml-2 flex grow flex-col justify-center truncate'>
        <div className='truncate text-base font-semibold'>{room.name}</div>
        <div className='mt-[1px] truncate text-sm text-textColor'>{room.last_message}</div>
      </div>
      <div className='ml-1 flex min-w-[60px] flex-col justify-center'>
        <div className='mr-1 min-h-[24px] text-right text-base text-primary'>
          {!room.is_read && <CircleIcon sx={{ weight: '12px', height: '12px' }} />}
        </div>
        <div className='mt-[1px] text-right text-sm text-textColor'>
          {ConvertDateTime(room.last_message_time, false)}
        </div>
      </div>
    </div>
  )
}
