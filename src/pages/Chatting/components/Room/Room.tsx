import dut from 'src/assets/images/logo.jpg'
import CircleIcon from '@mui/icons-material/Circle'
import { RoomType } from 'src/types/room.type'
import { ConvertDateTime } from 'src/utils/utils'

interface Props {
  room: RoomType
}

export default function Room({ room }: Props) {
  return (
    <div className='flex w-full rounded-md bg-stone-50 px-3 py-2'>
      <div className='min-w-[50px]'>
        <img
          src={room.avatar || dut}
          alt='avatar room'
          className='h-[50px] w-[50px] rounded-full border-[1px] border-gray-200'
        />
      </div>
      <div className='ml-2 flex grow flex-col justify-center truncate'>
        <div className='text-md truncate font-semibold'>{room.name}</div>
        <div className='mt-[1px] truncate text-sm text-textColor'>{room.last_message}</div>
      </div>
      <div className='ml-2 flex min-w-[50px] flex-col justify-center'>
        <div className='text-md mr-1 text-right text-primary'>
          <CircleIcon sx={{ weight: '12px', height: '12px' }} />
        </div>
        <div className='mt-[1px] text-sm text-textColor'>{ConvertDateTime(room.last_message_time)}</div>
      </div>
    </div>
  )
}
