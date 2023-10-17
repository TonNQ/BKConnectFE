import dut from 'src/assets/images/logo.jpg'
import { SearchUser } from 'src/types/user.type'

interface Props {
  user: SearchUser
  searchObject: 'friend' | 'user'
}

export default function User({ user, searchObject }: Props) {
  return (
    <div className='flex w-full rounded-md bg-stone-50 px-3 py-2'>
      <div className='min-w-[50px]'>
        <img
          src={user.avatar || dut}
          alt='avatar user'
          className='h-[50px] w-[50px] rounded-full border-[1px] border-gray-200'
        />
      </div>
      {/* <div className='ml-2 flex grow flex-col justify-center truncate'>
        <div className='truncate text-base font-semibold'>{user.name + 'aaaaaaaaaaaaa'}</div>
        <div className='mt-1 truncate text-xs text-textColor'>ID: {user.user_id}</div>
      </div>
      <div className='relative ml-2 flex min-w-[80px] flex-col justify-center'>
        <div className='text-md h-[1.5rem]  truncate text-right font-semibold'></div>
        <div className='mt-1 truncate text-right text-xs text-textColor'>
          Lớp: {user.class_name || 'Không xác định'}
        </div>
        <div className='absolute right-1 top-1 rounded-md bg-primary px-2 text-xs font-semibold text-white'>Bạn bè</div>
      </div> */}
      <div className='ml-2 flex flex-1 flex-col'>
        <div className='grid flex-1 grid-cols-12 items-center justify-center'>
          {searchObject === 'friend' && (
            <>
              <div className='col-span-12 truncate'>
                <span className='truncate text-base font-semibold'>{user.name}</span>
              </div>
            </>
          )}
          {searchObject === 'user' && (
            <>
              <div className='col-span-9 mr-1 truncate'>
                <span className='truncate text-base font-semibold'>{user.name}</span>
              </div>
              {user.is_friend && (
                <div className='col-span-3 items-center justify-center'>
                  <div className='rounded-md border-[1px] border-primary bg-white text-center text-xs text-primary '>
                    Bạn bè
                  </div>
                </div>
              )}
              {!user.is_friend && (
                <div className='col-span-3 items-center justify-center'>
                  <div className='rounded-md bg-primary px-1 text-center text-xs text-white hover:cursor-pointer hover:bg-secondary'>
                    Kết bạn
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className='mt-1 grid flex-1 grid-cols-12'>
          {user.class_name && (
            <>
              <div className='col-span-8 truncate'>
                <div className='truncate text-xs text-textColor'>MSSV: {user.user_id}</div>
              </div>
              <div className='col-span-4 truncate'>
                <div className='truncate text-xs text-textColor'>Lớp: {user.class_name}</div>
              </div>
            </>
          )}
          {!user.class_name && (
            <div className='col-span-12 truncate'>
              <div className='truncate text-xs text-textColor'>MSSV: {user.user_id}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
