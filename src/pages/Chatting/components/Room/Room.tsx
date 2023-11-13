/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import dut from 'src/assets/images/logo.jpg'
import CircleIcon from '@mui/icons-material/Circle'
import { RoomType } from 'src/types/room.type'
import { ConvertDateTime } from 'src/utils/utils'
import messageApi from 'src/apis/messages.api'
import { useContext } from 'react'
import { MessageContext } from 'src/contexts/message.context'

interface Props {
  room: RoomType
}

export default function Room({ room }: Props) {
  const { setMessages, setRoom } = useContext(MessageContext)
  const handleClick = () => {
    messageApi.getMessagesByRoom({ SearchKey: room.id }).then((response) => {
      setMessages(response.data.data)
      setRoom(room)
    })
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
      <div className='ml-2 flex min-w-[50px] flex-col justify-center'>
        <div className='mr-1 min-h-[24px] text-right text-base text-primary'>
          {!room.is_read && <CircleIcon sx={{ weight: '12px', height: '12px' }} />}
        </div>
        <div className='mt-[1px] text-sm text-textColor'>{ConvertDateTime(room.last_message_time, false)}</div>
      </div>
    </div>
  )
}
