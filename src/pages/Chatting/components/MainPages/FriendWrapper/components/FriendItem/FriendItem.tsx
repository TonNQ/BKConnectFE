import dut from 'src/assets/images/logo.jpg'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'

export default function FriendItem() {
  return (
    <div className='flex w-full flex-row items-center rounded-md border-[1px] border-gray-100 p-3'>
      <img src={dut} alt='avatar' className='h-[60px] w-[60px] rounded-md border-[1px] border-gray-100' />
      <div className='ml-3 flex grow flex-col justify-center truncate'>
        <div className='truncate text-lg font-semibold'>Nguyễn Quốc Toàn</div>
        <div className='grid grid-cols-5 text-sm font-light'>
          <div className='col-span-3 truncate'>MSSV: 102210135</div>
          <div className='col-span-2 truncate'>Lớp: 21T_DT2</div>
        </div>
      </div>
      <div className='rounded-full p-1 hover:cursor-pointer hover:bg-grayColor'>
        <MoreHorizOutlinedIcon />
      </div>
    </div>
  )
}
