/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import RelationshipItem from '../../components/RelationshipItem'
import { useEffect, useState } from 'react'
import { SearchFriend } from 'src/types/user.type'
import { debounce } from 'lodash'
import classNames from 'classnames'
import { relationshipApi } from 'src/apis/relationship.api'
import { TimeDifference } from 'src/utils/utils'

export default function FriendList({ setPageIndex }: { setPageIndex: React.Dispatch<React.SetStateAction<number>> }) {
  const [inputSearch, setInputSearch] = useState('')
  const [friends, setFriends] = useState<SearchFriend[]>([])
  // mode = 0: All friend, mode = 1: Recently
  const [mode, setMode] = useState<number>(0)

  // Tìm kiếm
  const debouncedSearch = debounce((textSearch: string) => {
    if (textSearch === '') {
      relationshipApi.getAllFriends().then((response) => {
        if (mode === 0) {
          setFriends(response.data.data.map((friend) => ({ ...friend, isFriend: true })))
        } else if (mode === 1) {
          // chờ API lấy thời gian kết bạn
          setFriends(
            response.data.data
              .map((friend) => ({ ...friend, isFriend: true }))
              .filter(
                (friend) => TimeDifference(new Date().toISOString(), friend.friend_time) / (1000 * 60 * 60 * 24) <= 7
              )
          )
        }
      })
    } else {
      relationshipApi.searchFriends({ SearchKey: textSearch }).then((response) => {
        setFriends(response.data.data.map((friend) => ({ ...friend, isFriend: true })))
      })
    }
  }, 500)

  // Hàm truyền vào RelationshipItem để hiển thị UI khi người dùng hủy kết bạn
  const updateFriend = (updatedFriend: SearchFriend) => {
    const updatedFriends = friends.map((friend) => {
      if (friend.user_id === updatedFriend.user_id) {
        return updatedFriend
      }
      return friend
    })

    setFriends(updatedFriends) // setFriends là hàm để cập nhật state friends
  }

  useEffect(() => {
    debouncedSearch(inputSearch)
    return () => debouncedSearch.cancel()
  }, [inputSearch, mode])

  return (
    <div className='flex h-[100vh] flex-col bg-white p-4'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center'>
          <PeopleAltOutlinedIcon sx={{ fontSize: '28px' }} />
          <span className='ml-3 text-xl font-bold'>Bạn bè ({friends.length})</span>
        </div>
        <div className='flex flex-row items-center'>
          {/* Khung tìm kiếm */}
          <div className='mx-4 flex items-center justify-between rounded-3xl bg-gray-100 p-2'>
            <div className='flex grow items-center justify-center'>
              <div className='flex h-[20px] w-[30px] items-center justify-center text-gray-500'>
                <SearchOutlinedIcon />
              </div>
              <input
                type='text'
                className='text-md ml-1 grow border-none bg-gray-100 focus:outline-none'
                placeholder='Tìm kiếm'
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
              />
            </div>
            <div
              className='ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md text-gray-500 hover:bg-stone-200'
              onClick={() => setInputSearch('')}
            >
              <CloseOutlinedIcon sx={{ fontSize: '18px' }} />
            </div>
          </div>
          {/* <div className='mx-1 rounded-2xl bg-white px-3 py-2 text-base font-semibold text-primary hover:cursor-pointer hover:bg-gray-100 hover:text-blue-700'>
            Danh sách bạn bè
          </div> */}
          <div
            className='mx-1 rounded-2xl bg-white px-3 py-2 text-base font-semibold text-primary hover:cursor-pointer hover:bg-gray-100 hover:text-blue-700'
            onClick={() => setPageIndex(1)}
          >
            Danh sách nhóm
          </div>
          <div
            className='mx-1 rounded-2xl bg-white px-3 py-2 text-base font-semibold text-primary hover:cursor-pointer hover:bg-gray-100 hover:text-blue-700'
            onClick={() => setPageIndex(2)}
          >
            Lời mời kết bạn
          </div>
        </div>
      </div>
      {/* Navbar */}
      <div className='mt-4 flex flex-row'>
        <div
          className={classNames('px-4 py-2 text-base font-medium ', {
            'border-b-[4px] border-b-primary text-primary': mode === 0,
            'rounded-md text-textColor hover:cursor-pointer hover:bg-grayColor hover:text-gray-600': mode !== 0
          })}
          onClick={() => {
            if (mode === 1) {
              setMode(0)
              setInputSearch('')
            }
          }}
        >
          Tất cả bạn bè
        </div>
        <div
          className={classNames('px-4 py-2 text-base font-medium ', {
            'border-b-[4px] border-b-primary text-primary': mode === 1,
            'rounded-md text-textColor hover:cursor-pointer hover:bg-grayColor hover:text-gray-600': mode !== 1
          })}
          onClick={() => {
            if (mode === 0) {
              setMode(1)
              setInputSearch('')
            }
          }}
        >
          Đã thêm gần đây
        </div>
      </div>
      <div className='mt-4 grid w-full grid-cols-2 gap-2'>
        {friends.map((friend) => (
          <RelationshipItem key={friend.user_id} type='friend' friend={friend} updateFriend={updateFriend} />
        ))}
      </div>
    </div>
  )
}
