/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import AddIcon from '@mui/icons-material/Add'
import classnames from 'classnames'
import { MemberOfRoom } from 'src/types/user.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import roomApi from 'src/apis/rooms.api'
import { SocketContext } from 'src/contexts/socket.context'
import { toast } from 'react-toastify'

interface Props {
  isAddButton?: boolean
  member?: MemberOfRoom
  isAdmin?: boolean
}

export default function Member({ isAddButton, member, isAdmin }: Props) {
  const { profile } = useContext(AppContext)
  const { roomInfo, setMembers } = useContext(SocketContext)
  const handleRemoveUser = () => {
    roomApi
      .removeUserFromRoom({ user_id: member?.id as string, room_id: roomInfo?.id as number })
      .then(() => {
        setMembers((prevMembers) => {
          return prevMembers.filter((m) => m.id !== member?.id)
        })
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }
  return (
    <div
      className={classnames('flex w-full items-center justify-center rounded-md bg-white px-3 py-2', {
        'hover:cursor-pointer hover:bg-grayColor': isAddButton
      })}
    >
      {!isAddButton && (
        <div className='min-w-[50px]'>
          <img
            src={member?.avatar}
            alt='avatar room'
            className='h-[40px] w-[40px] rounded-full border-[1px] border-gray-200'
          />
        </div>
      )}
      {isAddButton && (
        <div className='mr-2 flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1px] border-gray-200 bg-gray-200'>
          <AddIcon />
        </div>
      )}
      <div className='ml-2 mr-2 flex grow flex-col justify-center truncate'>
        {isAddButton && <div className='truncate text-base font-semibold'>Thêm người</div>}
        {!isAddButton && (
          <>
            <div className='truncate text-base font-semibold'>{member?.name}</div>
            <div className='truncate text-sm text-textColor'>{member?.is_admin ? 'Quản trị viên' : 'Thành viên'}</div>
          </>
        )}
      </div>
      {!isAddButton && profile?.user_id !== member?.id && (
        <>
          <div className='mx-1 flex h-[32px] min-w-[32px] items-center justify-center rounded-md hover:cursor-pointer hover:bg-slate-200 hover:text-primary'>
            <Person2OutlinedIcon sx={{ fontSize: '24px' }} />
          </div>
          {isAdmin && !member?.is_admin && (
            <div
              className='mx-1 flex h-[32px] min-w-[32px] items-center justify-center rounded-md hover:cursor-pointer hover:bg-slate-200 hover:text-red-600'
              onClick={handleRemoveUser}
            >
              <PersonRemoveIcon sx={{ fontSize: '24px' }} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
