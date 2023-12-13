/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import Member from '../Member'
import ImageCard from '../ImageCard'
import FileWrapper from '../FileWrapper'
import { useCallback, useContext, useEffect, useState } from 'react'
import { ShowTimeDifference } from 'src/utils/utils'
import roomApi from 'src/apis/rooms.api'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { SocketContext } from 'src/contexts/socket.context'
import { RoomInfo } from 'src/types/room.type'
import dut from 'src/assets/images/logo.jpg'
import messageApi from 'src/apis/messages.api'
import { getImageUrl } from 'src/utils/getImage'

interface Props {
  setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsViewImageVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RoomInformation({ setIsOverlayVisible, setIsViewImageVisible }: Props) {
  const { profile } = useContext(AppContext)
  const { roomInfo, members, setMembers, images, setImages } = useContext(SocketContext)
  const [showMembers, setShowMembers] = useState<boolean>(false)
  const [showImages, setShowImages] = useState<boolean>(false)
  const [showFiles, setShowFiles] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Cập nhật mỗi 1 phút
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {}, [roomInfo, members])

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
  const memoizedGetImagesApi = useCallback(
    () =>
      messageApi.getAllImageMessages({ SearchKey: roomInfo?.id as number }).then(async (response) => {
        const imageMessages = response.data.data

        const newImages = await Promise.all(
          imageMessages.map(async (msg) => {
            // Sử dụng memoization để lấy URL từ cache nếu có
            const url = await getImageUrl(msg.content)
            return url
          })
        )
        // Cập nhật danh sách hình ảnh trong state
        setImages(newImages as string[])
      }),
    []
  )
  const handleShowImages = () => {
    memoizedGetImagesApi()
  }
  useEffect(() => {}, [])
  return (
    <div className='flex h-[100vh] w-[350px] min-w-[350px] flex-col items-center overflow-auto border-l-[2px] border-l-gray-200 bg-white px-2'>
      <div className='relative mt-4 flex items-center justify-between'>
        <img
          src={roomInfo?.avatar || dut}
          alt=''
          className='mx-auto h-[100px] w-[100px] rounded-full border-[2px] border-solid border-gray-200'
        />
        {((roomInfo as RoomInfo).is_online ||
          ShowTimeDifference(roomInfo?.last_online || '', false) === 'Đang hoạt động') && (
          <div className='absolute bottom-0 right-0 h-[30px] w-[30px] rounded-full border-[3px] border-white bg-green-500'></div>
        )}
      </div>
      <div className='mt-2 text-lg font-semibold'>{roomInfo?.name}</div>
      <div className='mb-6 text-base font-thin'>
        {roomInfo?.is_online || ShowTimeDifference(roomInfo?.last_online || '', false) === 'Đang hoạt động'
          ? 'Đang hoạt động'
          : ShowTimeDifference(roomInfo?.last_online || '', false)}
      </div>
      {roomInfo?.room_type !== 'PrivateRoom' && (
        <>
          <div
            className='flex w-full justify-between rounded-md px-3 py-2 font-medium hover:cursor-pointer hover:bg-grayColor'
            onClick={() => {
              if (!showMembers) {
                handleShowMembers()
              }
              toggleShowComponent(setShowMembers)
            }}
          >
            <div className='text-base'>Thành viên trong đoạn chat</div>
            <KeyboardArrowDownRoundedIcon />
          </div>
          <div className='w-full'>
            {showMembers && members.map((member) => <Member key={member.id} member={member} isAdmin={isAdmin} />)}
            {showMembers && <Member isAddButton={true} setIsOverlayVisible={setIsOverlayVisible} />}
            {showMembers && <Member isLeaveRoom={true} />}
          </div>
        </>
      )}
      <div
        className='flex w-full justify-between rounded-md px-3 py-2 font-medium hover:cursor-pointer hover:bg-grayColor'
        onClick={() => {
          handleShowImages()
          toggleShowComponent(setShowImages)
        }}
      >
        <div className='text-base'>Ảnh</div>
        <KeyboardArrowDownRoundedIcon />
      </div>
      {showImages && (
        <>
          <div className='relative my-2 grid w-full grid-cols-4 gap-1 px-1'>
            {images.map((image) => (
              <ImageCard key={image} imageUrl={image} setIsViewImageVisible={setIsViewImageVisible} />
            ))}
          </div>
          {/* <div className='mb-2 flex w-full items-center justify-center rounded-md bg-gray-200 py-1 text-center text-base font-semibold hover:cursor-pointer hover:bg-gray-300'>
            Xem tất cả
          </div> */}
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
