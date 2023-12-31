/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import RelationshipItem from '../../components/RelationshipItem'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import classNames from 'classnames'
import { GroupRoom } from 'src/types/room.type'
import roomApi from 'src/apis/rooms.api'

export default function FriendList({ setPageIndex }: { setPageIndex: React.Dispatch<React.SetStateAction<number>> }) {
  const [inputSearch, setInputSearch] = useState('')
  const [groups, setGroups] = useState<GroupRoom[]>([])
  // mode = 0: All friend, mode = 1: Recently
  const [mode, setMode] = useState<number>(0)
  const debouncedSearch = debounce((textSearch: string) => {
    if (textSearch.trim() === '') {
      roomApi.getListOfPublicRooms().then((response) => {
        setGroups(response.data.data)
      })
    } else {
      roomApi.searchListOfPublicRooms({ SearchKey: textSearch.trim() }).then((response) => {
        setGroups(response.data.data)
      })
    }
  }, 500)
  useEffect(() => {
    debouncedSearch(inputSearch)
    return () => debouncedSearch.cancel()
  }, [inputSearch])
  return (
    <div className='flex h-[100vh] flex-col overflow-auto bg-white p-4'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center'>
          <PeopleAltOutlinedIcon sx={{ fontSize: '28px' }} />
          <span className='ml-3 text-xl font-bold'>Nhóm của bạn ({groups.length})</span>
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
            onClick={() => setPageIndex(0)}
          >
            Danh sách bạn bè
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
          onClick={() => setMode(0)}
        >
          Tất cả các nhóm
        </div>
        <div
          className={classNames('px-4 py-2 text-base font-medium ', {
            'border-b-[4px] border-b-primary text-primary': mode === 1,
            'rounded-md text-textColor hover:cursor-pointer hover:bg-grayColor hover:text-gray-600': mode !== 1
          })}
          onClick={() => setMode(1)}
        >
          Tham gia gần đây
        </div>
      </div>
      <div className='mt-4 grid w-full grid-cols-2 gap-2'>
        {mode === 0 && groups.map((group) => <RelationshipItem key={group.id} type='group' group={group} />)}
        {mode === 1 && groups.map((group) => <RelationshipItem key={group.id} type='group' group={group} />)}
      </div>
    </div>
  )
}
