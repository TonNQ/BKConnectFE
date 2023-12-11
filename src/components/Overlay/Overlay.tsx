/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import 'src/css/Scroll.css'
import { useContext, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { debounce } from 'lodash'
import userApi from 'src/apis/users.api'
import { SimpleUser } from 'src/types/user.type'
import { relationshipApi } from 'src/apis/relationship.api'
import roomApi from 'src/apis/rooms.api'
import { SocketContext } from 'src/contexts/socket.context'

interface Props {
  setIsOverlayVisible: (value: React.SetStateAction<boolean>) => void
}

export default function Overlay({ setIsOverlayVisible }: Props) {
  const { addMemberToRoomId } = useContext(SocketContext)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [roomName, setRoomName] = useState<string>('')
  const [inputSearch, setInputSearch] = useState<string>('')
  const [users, setUsers] = useState<SimpleUser[]>([])
  const [addedUserList, setAddedUserList] = useState<SimpleUser[]>([])
  const [cntUser, setCntUser] = useState(0)
  const debouncedSearch = debounce((textSearch: string) => {
    if (textSearch.trim() !== '') {
      userApi.searchUsers({ searchKey: textSearch.trim(), pageIndex: 0 }).then((response) => {
        setUsers(response.data.data)
      })
    }
  }, 500)
  const handleResetInputSearch = () => {
    setInputSearch('')
  }
  const handleInputChange = (value: string, setInputState: React.Dispatch<React.SetStateAction<string>>) => {
    console.log(value)
    setInputState(value)
  }
  const handleAddUser = (user: SimpleUser) => {
    const findUserIndex = addedUserList.findIndex((u) => u.user_id === user.user_id)
    if (findUserIndex === -1) {
      setAddedUserList((prevList) => {
        return [...prevList, user]
      })
      setCntUser((prevCnt) => prevCnt + 1)
    } else {
      removeUserToAddedList(user)
      setCntUser((prevCnt) => prevCnt - 1)
    }
  }
  const removeUserToAddedList = (user: SimpleUser) => {
    setAddedUserList((prevList) => {
      return prevList.filter((u) => u.user_id !== user.user_id)
    })
  }
  const handleCreateGroup = () => {
    roomApi
      .createGroupRoom({ name: roomName, room_type: 'PublicRoom', user_ids: addedUserList.map((u) => u.user_id) })
      .then((response) => {
        console.log(response)
        setIsOverlayVisible(false)
      })
  }
  const handleAddMembers = () => {
    // Chuỗi id nối bởi dấu phẩy
    let user_ids: string = ''
    addedUserList.forEach((u) => {
      user_ids += u.user_id + ', '
    })
    user_ids = user_ids.slice(0, user_ids.length - 2)
    roomApi.addUserToRoom({ user_id: user_ids, room_id: addMemberToRoomId as number }).then((response) => {
      console.log(response)
      setIsOverlayVisible(false)
    })
  }
  // Sử dụng useEffect để theo dõi sự kiện click bên ngoài overlay
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Kiểm tra xem sự kiện click có xảy ra bên ngoài overlay không
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node) &&
        roomName === '' &&
        addedUserList.length === 0
      ) {
        setIsOverlayVisible(false) // Gọi hàm onClose khi click bên ngoài overlay
      }
    }
    // Đăng ký sự kiện click trên toàn bộ document
    document.addEventListener('mousedown', handleOutsideClick)
    // Cleanup: hủy đăng ký sự kiện khi component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [setIsOverlayVisible, roomName])

  useEffect(() => {
    if (inputSearch.trim() === '') {
      relationshipApi.getAllFriends().then((response) => {
        setUsers(response.data.data)
      })
    } else {
      debouncedSearch(inputSearch)
    }
    return () => debouncedSearch.cancel()
  }, [inputSearch])

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-gray-200 bg-opacity-50'>
      <div ref={overlayRef} className='w-[500px] max-w-[500px] rounded-md bg-white'>
        <div className='relative border-b-[1px] border-gray-200 py-3 text-center text-xl font-bold'>
          <span>{addMemberToRoomId ? 'Thêm thành viên mới' : 'Tạo nhóm mới'}</span>
          <div
            className='absolute right-[8px] top-[50%] flex h-[28px] w-[28px] translate-y-[-50%] items-center justify-center rounded-full border-[1px] border-gray-200 bg-gray-200 text-gray-500 hover:cursor-pointer hover:border-gray-300 hover:bg-gray-300'
            onClick={() => setIsOverlayVisible(false)}
          >
            <CloseOutlinedIcon sx={{ fontSize: '20px' }} />
          </div>
        </div>
        <div className='p-4'>
          {!addMemberToRoomId && (
            <div className='mb-4 flex w-full flex-row items-center'>
              <div className='mr-2 text-base font-semibold'>Tên nhóm: </div>
              <div className='flex flex-1 items-center justify-between rounded-md border-[1px] border-gray-300 bg-white px-2 py-1'>
                <input
                  type='text'
                  className='ml-1 grow border-none bg-white text-base focus:outline-none'
                  placeholder='Nhập tên nhóm'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(event.target.value, setRoomName)
                  }
                />
              </div>
            </div>
          )}

          {/* Search */}
          <div className='flex items-center justify-between rounded-md border-[1px] border-gray-300 bg-white p-2'>
            <div className='flex grow items-center justify-center'>
              <div className='flex h-[20px] w-[30px] items-center justify-center text-gray-500'>
                <SearchOutlinedIcon />
              </div>
              <input
                type='text'
                className='text-md ml-1 grow border-none bg-white focus:outline-none'
                placeholder='Tìm kiếm người dùng'
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
              />
            </div>
            <div
              className='ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md text-gray-500 hover:bg-stone-100'
              onClick={handleResetInputSearch}
            >
              <CloseOutlinedIcon sx={{ fontSize: '18px' }} />
            </div>
          </div>
          <div
            className={classNames('scrollbar-custom--horizon my-4 flex h-[110px] overflow-auto bg-white pb-2', {
              'items-start justify-start': addedUserList.length > 0,
              'items-center justify-center': addedUserList.length === 0
            })}
          >
            {addedUserList.length > 0 &&
              addedUserList.map((user) => (
                <div key={user.user_id} className='relative mr-4 w-[80px] min-w-[80px] text-center'>
                  <div className='flex items-center justify-center'>
                    <img src={user.avatar} alt='ảnh' className='h-[50px] w-[50px] rounded-full' />
                  </div>
                  <div className='limited-lines line-clamp-2 overflow-hidden text-sm'>{user.name}</div>
                  <div
                    className='absolute right-[8px] top-0 flex h-[20px] w-[20px] items-center justify-center rounded-full border-[1px] border-gray-200 bg-white text-gray-500 hover:cursor-pointer hover:bg-stone-200'
                    onClick={() => removeUserToAddedList(user)}
                  >
                    <CloseOutlinedIcon sx={{ fontSize: '16px' }} />
                  </div>
                </div>
              ))}
            {addedUserList.length === 0 && <div className='text-sm text-gray-500'>Chưa chọn người dùng nào</div>}
          </div>
          <div className='mb-2 text-lg font-bold'>Gợi ý</div>
          <div className='scrollbar-custom flex h-[300px] max-h-[300px] flex-col overflow-y-auto bg-white'>
            {users.map((user) => (
              <div
                key={user.user_id}
                className='flex w-full flex-row items-center justify-start rounded-md bg-white p-2 hover:cursor-pointer hover:bg-gray-100'
                onClick={() => handleAddUser(user)}
              >
                <div className='mr-4 flex items-center justify-center'>
                  <img src={user.avatar} alt='ảnh' className='h-[50px] w-[50px] rounded-full' />
                </div>
                <div className='limited-lines line-clamp-2 flex flex-1 flex-col justify-center overflow-hidden text-sm'>
                  <div className=' text-lg font-semibold'>{user.name}</div>
                  <div className='text-sm font-light'>MSSV: {user.user_id}</div>
                </div>
                <div>
                  {addedUserList.some((u) => u.user_id === user.user_id) && (
                    <CheckCircleIcon sx={{ fontSize: '28px', color: '#1e90ff' }} />
                  )}
                  {!addedUserList.some((u) => u.user_id === user.user_id) && (
                    <CircleOutlinedIcon sx={{ fontSize: '28px', color: 'gray' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
          {addMemberToRoomId && (
            <div
              className={classNames('mt-2 w-full rounded-md py-1 text-center text-lg font-medium text-white', {
                'bg-primary hover:cursor-pointer hover:bg-secondary': addedUserList.length > 0,
                'bg-grayColor hover:cursor-not-allowed': cntUser === 0
              })}
              onClick={handleAddMembers}
            >
              Thêm thành viên
            </div>
          )}
          {!addMemberToRoomId && (
            <div
              className={classNames('mt-2 w-full rounded-md py-1 text-center text-lg font-medium text-white', {
                'bg-primary hover:cursor-pointer hover:bg-secondary': roomName && addedUserList.length >= 2,
                'bg-grayColor hover:cursor-not-allowed': !roomName || cntUser < 2
              })}
              onClick={handleCreateGroup}
            >
              Tạo nhóm
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
