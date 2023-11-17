/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import Member from '../Member'
import ImageCard from '../ImageCard'
import FileWrapper from '../FileWrapper'
import { useContext, useState } from 'react'
import { ShowTimeDifference } from 'src/utils/utils'
import { MemberOfRoom } from 'src/types/user.type'
import roomApi from 'src/apis/rooms.api'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { SocketContext } from 'src/contexts/socket.context'

export default function RoomInformation() {
  const { profile } = useContext(AppContext)
  const { roomInfo } = useContext(SocketContext)
  const [showMembers, setShowMembers] = useState<boolean>(false)
  const [showImages, setShowImages] = useState<boolean>(false)
  const [showFiles, setShowFiles] = useState<boolean>(false)
  const [members, setMembers] = useState<MemberOfRoom[]>([])
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const toggleShowComponent = (setStateFunction: React.Dispatch<React.SetStateAction<boolean>>) => {
    setStateFunction((prevState: boolean) => !prevState)
  }
  const handleShowMembers = () => {
    roomApi
      .getListOfMembersInRoom({ SearchKey: roomInfo?.id as number })
      .then((response) => {
        const membersList = response.data.data
        setIsAdmin(Boolean(membersList.find((member) => member.id === profile?.user_id && member.is_admin)))
        setMembers(response.data.data)
      })
      .catch((error) => {
        toast.error(error)
      })
  }
  return (
    <div className='flex h-[100vh] w-[350px] min-w-[350px] flex-col items-center overflow-auto border-l-[2px] border-l-gray-200 bg-white px-2'>
      <div className='mt-4 flex items-center justify-between'>
        <img
          src={roomInfo?.avatar}
          alt=''
          className='mx-auto h-[100px] w-[100px] rounded-full border-[2px] border-solid border-white'
        />
      </div>
      <div className='mt-2 text-lg font-semibold'>{roomInfo?.name}</div>
      <div className='mb-6 text-base font-thin'>
        {roomInfo?.is_online ? 'Đang hoạt động' : ShowTimeDifference(roomInfo?.last_online || '', false)}
      </div>
      {roomInfo?.room_type !== 'PrivateRoom' && (
        <>
          <div
            className='flex w-full justify-between rounded-md px-3 py-2 font-medium hover:cursor-pointer hover:bg-grayColor'
            onClick={() => {
              handleShowMembers()
              toggleShowComponent(setShowMembers)
            }}
          >
            <div className='text-base'>Thành viên trong đoạn chat</div>
            <KeyboardArrowDownRoundedIcon />
          </div>
          <div className='w-full'>
            {showMembers && members.map((member) => <Member key={member.id} member={member} isAdmin={isAdmin} />)}
            {showMembers && <Member isAddButton={true} />}
          </div>
        </>
      )}
      <div
        className='flex w-full justify-between rounded-md px-3 py-2 font-medium hover:cursor-pointer hover:bg-grayColor'
        onClick={() => toggleShowComponent(setShowImages)}
      >
        <div className='text-base'>Ảnh</div>
        <KeyboardArrowDownRoundedIcon />
      </div>
      {showImages && (
        <>
          <div className='relative my-2 grid w-full grid-cols-4 gap-1 px-1'>
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
          </div>
          <div className='mb-2 flex w-full items-center justify-center rounded-md bg-gray-200 py-1 text-center text-base font-semibold hover:cursor-pointer hover:bg-gray-300'>
            Xem tất cả
          </div>
        </>
      )}
      <div
        className='flex w-full justify-between rounded-md px-3 py-2 font-medium hover:cursor-pointer hover:bg-grayColor'
        onClick={() => toggleShowComponent(setShowFiles)}
      >
        <div className='text-base'>File</div>
        <KeyboardArrowDownRoundedIcon />
      </div>
      {showFiles && (
        <>
          <FileWrapper />
          <FileWrapper />
          <FileWrapper />
          <FileWrapper />
          <FileWrapper />
          <div className='flex w-full items-center justify-center rounded-md bg-gray-200 py-1 text-center text-base font-semibold hover:cursor-pointer hover:bg-gray-300'>
            Xem tất cả
          </div>
        </>
      )}
      <div className='mb-2'></div>
    </div>
  )
}
