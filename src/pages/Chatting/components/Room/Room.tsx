import dut from 'src/assets/images/logo.jpg'
import CircleIcon from '@mui/icons-material/Circle'

export default function Room() {
  return (
    <div className='flex w-full rounded-md bg-stone-50 px-3 py-2'>
      <div className='min-w-[50px]'>
        <img src={dut} alt='avatar room' className='h-[50px] w-[50px] rounded-full border-[1px] border-gray-200' />
      </div>
      <div className='ml-2 flex grow flex-col justify-center truncate'>
        <div className='text-md truncate font-semibold'>Nguyễn Quốc Toàn </div>
        <div className='text-textColor mt-[1px] truncate text-sm'>Thu Thảo trap girl không ai bằng</div>
      </div>
      <div className='ml-2 flex min-w-[50px] flex-col justify-center'>
        <div className='text-md mr-1 text-right text-primary'>
          <CircleIcon sx={{ weight: '12px', height: '12px' }} />
        </div>
        <div className='text-textColor mt-[1px] text-sm'>3:32 PM</div>
      </div>
    </div>
  )
}
