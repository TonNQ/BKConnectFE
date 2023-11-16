/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import FriendItem from '../../components/FriendItem'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { relationshipApi } from 'src/apis/relationship.api'
import { FriendRequest } from 'src/types/friendRequest.type'
import { friendRequestApi } from 'src/apis/friendRequest.api'

export default function RequestList({ setPageIndex }: { setPageIndex: React.Dispatch<React.SetStateAction<number>> }) {
  const [inputSearch, setInputSearch] = useState('')
  const [requests, setRequests] = useState<FriendRequest[]>([])
  // mode = 0: All friend, mode = 1: Recently
  const debouncedSearch = debounce((textSearch: string) => {
    if (textSearch === '') {
      friendRequestApi.getListOfReceivedFriendRequests().then((response) => {
        setRequests(response.data.data)
      })
    } else {
      friendRequestApi.getListOfReceivedFriendRequests().then((response) => {
        setRequests(response.data.data)
      })
    }
  }, 500)
  useEffect(() => {
    debouncedSearch(inputSearch)
    return () => debouncedSearch.cancel()
  }, [debouncedSearch, inputSearch])
  return (
    <div className='flex h-[100vh] flex-col bg-white p-4'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center'>
          <PeopleAltOutlinedIcon sx={{ fontSize: '28px' }} />
          <span className='ml-3 text-xl font-bold'>Lời mời kết bạn ({requests.length})</span>
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
            <div className='ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md text-gray-500 hover:bg-stone-200'>
              <CloseOutlinedIcon sx={{ fontSize: '18px' }} />
            </div>
          </div>
          {/* <div className='mx-1 rounded-2xl bg-white px-3 py-2 text-base font-semibold text-primary hover:cursor-pointer hover:bg-gray-100 hover:text-blue-700'>
            Danh sách bạn bè
          </div> */}
          <div
            className='mx-1 rounded-2xl bg-white px-3 py-2 text-base font-semibold text-primary hover:cursor-pointer hover:bg-gray-100 hover:text-blue-700'
            onClick={() => setPageIndex(0)}
          >
            Danh sách bạn bè
          </div>
          <div
            className='mx-1 rounded-2xl bg-white px-3 py-2 text-base font-semibold text-primary hover:cursor-pointer hover:bg-gray-100 hover:text-blue-700'
            onClick={() => setPageIndex(1)}
          >
            Danh sách nhóm
          </div>
        </div>
      </div>
      <div className='mt-4 grid w-full grid-cols-2 gap-2'>
        {requests.map((request) => (
          <FriendItem key={request.id} type='request' request={request} />
        ))}
      </div>
    </div>
  )
}
