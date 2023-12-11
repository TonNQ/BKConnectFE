/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import classnames from 'classnames'
import { MemberOfRoom } from 'src/types/user.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import roomApi from 'src/apis/rooms.api'
import { SocketContext } from 'src/contexts/socket.context'
import { toast } from 'react-toastify'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'

interface Props {
  isAddButton?: boolean
  isLeaveRoom?: boolean
  member?: MemberOfRoom
  isAdmin?: boolean
  setIsOverlayVisible?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Member({ isAddButton, isLeaveRoom, member, isAdmin, setIsOverlayVisible }: Props) {
  const { profile } = useContext(AppContext)
  const { roomInfo, setMembers, setMessages, setRoomInfo, setRoomList, setAddMemberToRoomId } = useContext(SocketContext)
  const handleRemoveUser = () => {
    if (isLeaveRoom) {
      roomApi
        .leaveRoom({
          user_id: profile?.user_id as string,
          room_id: roomInfo?.id as number
        })
        .then(() => {
          setMessages([])
          setMembers([])
          setRoomList((prevRoomList) => {
            if (prevRoomList === null) return null
            else {
              return prevRoomList?.filter((r) => r.id !== roomInfo?.id)
            }
          })
          setRoomInfo(null)
        })
    } else {
      roomApi
        .removeUserFromRoom({
          user_id: member?.id as string,
          room_id: roomInfo?.id as number
        })
        .then(() => {
          if (member?.id === profile?.user_id) {
            // user leaves room
            setMessages([])
            setMembers([])
            setRoomInfo(null)
          } else {
            // admin removes member
            setMembers((prevMembers) => {
              return prevMembers.filter((m) => m.id !== member?.id)
            })
          }
        })
        .catch((error) => {
          toast.error(error.message)
        })
    }
  }
  return (
    <div
      className={classnames('flex w-full items-center justify-center rounded-md bg-white px-3 py-2', {
        'hover:cursor-pointer hover:bg-grayColor': isAddButton || isLeaveRoom
      })}
      onClick={isLeaveRoom ? handleRemoveUser : isAddButton ? () => {
        setAddMemberToRoomId(roomInfo?.id as number)
        if (setIsOverlayVisible !== undefined) {
          setIsOverlayVisible(true)
        }
      } : undefined}
    >
      {!isAddButton && !isLeaveRoom && (
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
      {isLeaveRoom && (
        <div className='mr-2 flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1px] border-gray-200 bg-gray-200'>
          <LogoutIcon />
        </div>
      )}
      <div className='ml-2 mr-2 flex grow flex-col justify-center truncate'>
        {isAddButton && <div className='truncate text-base font-semibold'>Thêm người</div>}
        {isLeaveRoom && (
          <div className='truncate text-base font-semibold'>
            Rời khỏi {roomInfo?.room_type === 'ClassRoom' ? 'lớp học' : 'nhóm'}
          </div>
        )}
        {!isAddButton && !isLeaveRoom && (
          <>
            <div className='truncate text-base font-semibold'>{member?.name}</div>
            <div className='truncate text-sm text-textColor'>{member?.is_admin ? 'Quản trị viên' : 'Thành viên'}</div>
          </>
        )}
      </div>
      {!isAddButton && !isLeaveRoom && profile?.user_id !== member?.id && (
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
