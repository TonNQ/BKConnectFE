/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import dut from 'src/assets/images/logo.jpg'
import CircleIcon from '@mui/icons-material/Circle'
import { RoomType } from 'src/types/room.type'
import { ConvertDateTime } from 'src/utils/utils'
import messageApi from 'src/apis/messages.api'
import { useContext } from 'react'
import roomApi from 'src/apis/rooms.api'
import { toast } from 'react-toastify'
import { SocketContext } from 'src/contexts/socket.context'
import { AppContext } from 'src/contexts/app.context'

interface Props {
  room: RoomType
}

export default function Room({ room }: Props) {
  const { setMessages, setRoom, setRoomInfo } = useContext(AppContext)
  const handleClick = async () => {
    try {
      const roomInformationResponse = await roomApi.getInformationOfRoom({ SearchKey: room.id })
      const messageResponse = await messageApi.getMessagesByRoom({ SearchKey: room.id })
      setRoomInfo(roomInformationResponse.data.data)
      setMessages([...messageResponse.data.data])
      setRoom(room)
    } catch (error: any) {
      toast.error(error.message)
    }
    // roomApi
    //   .getInformationOfRoom({ SearchKey: room.id })
    //   .then((response) => {
    //     setRoomInfo(response.data.data)
    //   })
    //   .catch((error) => {
    //     toast.error(error.message)
    //   })
    // messageApi
    //   .getMessagesByRoom({ SearchKey: room.id })
    //   .then((response) => {
    //     setMessages([...response.data.data])
    //     console.log('Rooooom', room)
    //     setRoom(room)
    //   })
    //   .catch((error) => {
    //     toast.error(error.message)
    //   })
  }
  return (
    <div className='flex w-full rounded-md bg-stone-50 px-3 py-2 hover:cursor-pointer' onClick={handleClick}>
      <div className='min-w-[50px]'>
        <img
          src={room.avatar || dut}
          alt='avatar room'
          className='h-[50px] w-[50px] rounded-full border-[1px] border-gray-200'
        />
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
