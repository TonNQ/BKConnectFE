import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import FriendItem from '../../components/FriendItem'

export default function FriendList() {
  return (
    <div className='flex h-[100vh] flex-col bg-white p-4'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center'>
          <PeopleAltOutlinedIcon sx={{ fontSize: '28px' }} />
          <span className='ml-3 text-xl font-bold'>Bạn bè (45)</span>
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
                onChange={() => {}}
              />
            </div>
            <div className='ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md text-gray-500 hover:bg-stone-200'>
              <CloseOutlinedIcon sx={{ fontSize: '18px' }} />
            </div>
          </div>
          {/* <div className='mx-1 rounded-2xl bg-white px-3 py-2 text-base font-semibold text-primary hover:cursor-pointer hover:bg-gray-100 hover:text-blue-700'>
            Danh sách bạn bè
          </div> */}
          <div className='mx-1 rounded-2xl bg-white px-3 py-2 text-base font-semibold text-primary hover:cursor-pointer hover:bg-gray-100 hover:text-blue-700'>
            Danh sách nhóm
          </div>
          <div className='mx-1 rounded-2xl bg-white px-3 py-2 text-base font-semibold text-primary hover:cursor-pointer hover:bg-gray-100 hover:text-blue-700'>
            Lời mời kết bạn
          </div>
        </div>
      </div>
      {/* Navbar */}
      <div className='mt-4 flex flex-row'>
        <div className='border-b-[4px] border-b-primary px-4 py-2 text-base font-medium text-primary'>
          Tất cả bạn bè
        </div>
        <div className=' rounded-md px-4 py-2 text-base font-medium text-textColor hover:cursor-pointer hover:bg-grayColor hover:text-gray-600'>
          Đã thêm gần đây
        </div>
      </div>
      <div className='mt-4 grid w-full grid-cols-2 gap-2'>
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
      </div>
    </div>
  )
}
