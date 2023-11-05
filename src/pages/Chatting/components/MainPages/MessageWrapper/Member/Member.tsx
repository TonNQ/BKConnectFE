import dut from 'src/assets/images/logo.jpg'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import AddIcon from '@mui/icons-material/Add'
import classnames from 'classnames-ts/src/classNames'

interface Props {
  isAddButton?: boolean
}

export default function Member({ isAddButton }: Props) {
  return (
    <div
      className={classnames('flex w-full items-center justify-center rounded-md bg-white px-3 py-2', {
        'hover:cursor-pointer hover:bg-grayColor': isAddButton
      })}
    >
      {!isAddButton && (
        <div className='min-w-[50px]'>
          <img src={dut} alt='avatar room' className='h-[40px] w-[40px] rounded-full border-[1px] border-gray-200' />
        </div>
      )}
      {isAddButton && (
        <div className='mr-2 flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1px] border-gray-200 bg-gray-200'>
          <AddIcon />
        </div>
      )}
      <div className='ml-2 mr-2 flex grow flex-col justify-center truncate'>
        {isAddButton && <div className='truncate text-base font-semibold'>Thêm người</div>}
        {!isAddButton && (
          <>
            <div className='truncate text-base font-semibold'>Nguyễn Quốc Toàn qwjgbqjwhjqwhj</div>
            <div className='truncate text-sm text-textColor'>Người tạo nhóm</div>
          </>
        )}
      </div>
      {!isAddButton && (
        <>
          <div className='mx-1 flex h-[32px] min-w-[32px] items-center justify-center rounded-md hover:cursor-pointer hover:bg-slate-200 hover:text-primary'>
            <Person2OutlinedIcon sx={{ fontSize: '24px' }} />
          </div>
          <div className='mx-1 flex h-[32px] min-w-[32px] items-center justify-center rounded-md hover:cursor-pointer hover:bg-slate-200 hover:text-red-600'>
            <PersonRemoveIcon sx={{ fontSize: '24px' }} />
          </div>
        </>
      )}
    </div>
  )
}
