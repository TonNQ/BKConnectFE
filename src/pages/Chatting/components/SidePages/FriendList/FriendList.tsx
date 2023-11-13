/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useEffect, useState } from 'react'
import 'src/css/Scroll.css'
import userApi from 'src/apis/users.api'
import { debounce } from 'lodash'
import { SearchFriend, SearchUser } from 'src/types/user.type'
import classNames from 'classnames'
import User from '../../User'
import { relationshipApi } from 'src/apis/relationship.api'

export default function FriendList() {
  const [inputSearch, setInputSearch] = useState('')
  const [friends, setFriends] = useState<SearchFriend[]>([])
  const [users, setUsers] = useState<SearchUser[]>([])
  // mode = 0: friends, mode = 1: users
  const [mode, setMode] = useState<number>(0)
  const debouncedSearch = debounce((textSearch: string) => {
    switch (mode) {
      case 0: {
        if (textSearch === '') {
          relationshipApi.getAllFriends().then((response) => {
            setFriends(response.data.data)
          })
        } else {
          relationshipApi.searchFriends({ SearchKey: textSearch }).then((response) => {
            setFriends(response.data.data)
          })
        }
        break
      }
      case 1: {
        if (textSearch !== '') {
          userApi.searchUsers({ searchKey: textSearch, pageIndex: 0 }).then((response) => {
            setUsers(response.data.data)
          })
        }
        break
      }
    }
  }, 500)
  useEffect(() => {
    debouncedSearch(inputSearch)
    return () => debouncedSearch.cancel()
  }, [inputSearch, mode])
  const handleResetInputSearch = () => {
    setInputSearch('')
  }
  return (
    <div className='flex h-[100vh] flex-col'>
      <div className='mx-4 my-4 flex items-center justify-between rounded-md bg-stone-100 p-2'>
        <div className='flex grow items-center justify-center'>
          <div className='flex h-[20px] w-[30px] items-center justify-center text-gray-500'>
            <SearchOutlinedIcon />
          </div>
          <input
            type='text'
            className='text-md ml-1 grow border-none bg-stone-100 focus:outline-none'
            placeholder='Tìm kiếm người dùng'
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
        </div>
        <div
          className='ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md text-gray-500 hover:bg-stone-200'
          onClick={handleResetInputSearch}
        >
          <CloseOutlinedIcon sx={{ fontSize: '18px' }} />
        </div>
      </div>
      <div className='mx-6 flex items-center justify-between'>
        <div
          className={classNames('rounded-lg border-[1px] border-primary px-2 py-1 text-sm font-medium', {
            'bg-white text-primary hover:cursor-pointer hover:border-primary hover:bg-primary hover:text-white':
              mode !== 0,
            'bg-primary text-white': mode === 0
          })}
          onClick={() => setMode(0)}
        >
          Danh sách bạn bè
        </div>
        <div
          className={classNames('rounded-lg border-[1px] border-primary px-2 py-1 text-sm font-medium', {
            'bg-white text-primary hover:cursor-pointer hover:border-primary hover:bg-primary hover:text-white':
              mode !== 1,
            'bg-primary text-white': mode === 1
          })}
          onClick={() => setMode(1)}
        >
          Tìm kiếm chung
        </div>
      </div>
      <div className='scrollbar-custom mt-4 w-full overflow-y-scroll scroll-smooth'>
        <div className=' mx-4 flex flex-col space-y-2 '>
          {mode === 0 &&
            friends?.map((user) => <User key={user.user_id} user={user as SearchUser} searchObject='friend' />)}
          {mode === 0 && friends?.length === 0 && (
            <div className='w-full text-center text-sm'>Không tìm thấy kết quả</div>
          )}
          {mode === 1 && inputSearch === '' && (
            <div className='w-full text-center text-sm'>Hãy nhập thông tin vào ô tìm kiếm</div>
          )}
          {mode === 1 &&
            inputSearch !== '' &&
            users?.map((user) => <User key={user.user_id} user={user} searchObject='user' />)}
          {mode === 1 && inputSearch !== '' && users?.length === 0 && (
            <div className='w-full text-center text-sm'>Không tìm thấy kết quả</div>
          )}
        </div>
      </div>
    </div>
  )
}
