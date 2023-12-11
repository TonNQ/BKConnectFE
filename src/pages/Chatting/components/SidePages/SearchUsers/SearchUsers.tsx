/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useEffect, useState } from 'react'
import 'src/css/Scroll.css'
import userApi from 'src/apis/users.api'
import { debounce } from 'lodash'
import { SearchUser } from 'src/types/user.type'
import User from '../../User'
import SearchUserImg from 'src/assets/images/SearchUser.jpg'

export default function SearchUsers() {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [users, setUsers] = useState<SearchUser[]>([])
  const debouncedSearch = debounce((textSearch: string) => {
    if (textSearch.trim() !== '') {
      userApi.searchUsers({ searchKey: textSearch, pageIndex: 0 }).then((response) => {
        setUsers(response.data.data)
      })
    }
  }, 500)
  useEffect(() => {
    debouncedSearch(inputSearch)
    return () => debouncedSearch.cancel()
  }, [inputSearch])
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
      <div className='scrollbar-custom w-full overflow-y-scroll scroll-smooth'>
        <div className=' mx-4 flex flex-col space-y-2 '>
          {/* {mode === 0 &&
            friends?.map((user) => <User key={user.user_id} user={user as SearchUserType} searchObject='friend' />)} */}
          {inputSearch === '' && (
            <div className='mt-4 flex w-full flex-col items-center space-y-5 text-center text-sm'>
              <img src={SearchUserImg} alt='ảnh' className='w-[60%] rounded-full' />
              <div className='mx-5'>Hãy tìm kiếm và kết bạn với mọi người bằng cách nhập vào ô tìm kiếm</div>
            </div>
          )}
          {inputSearch !== '' && (
            <>
              <div className='mb-1 text-base font-medium text-primary'>Kết quả tìm kiếm</div>
              {users?.map((user) => <User key={user.user_id} user={user} />)}
            </>
          )}
          {inputSearch !== '' && users?.length === 0 && (
            <div className='w-full text-center text-sm'>Không tìm thấy kết quả</div>
          )}
        </div>
      </div>
    </div>
  )
}
