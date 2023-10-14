/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import { useContext, useEffect } from 'react'
import userApi from 'src/apis/users.api'
import avatar from 'src/assets/images/avatar.jpg'
import { AppContext } from 'src/contexts/app.context'
import { ConvertDMY } from 'src/utils/utils'
import 'src/index.css'
import classNames from 'classnames'

export default function Profile() {
  const { profile, setProfile, isProfileVisible, setIsProfileVisible } = useContext(AppContext)
  useEffect(() => {
    userApi.getProfile().then((response) => {
      const profileData = response.data
      if (profileData && profileData.data && profile !== profileData.data) {
        setProfile(profileData.data)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const toggleProfileComponent = () => {
    setIsProfileVisible(!isProfileVisible)
  }
  return (
    <div
      className={classNames(
        'absolute left-[70px] top-0 z-10 flex h-[100vh] w-[320px] min-w-[320px] flex-col bg-white shadow-md',
        {
          'slide-in': isProfileVisible === true,
          'slide-out': isProfileVisible === false,
          'tranform -translate-x-full': isProfileVisible === null
        }
      )}
    >
      <div className='m-4 flex items-center'>
        <div className='flex items-center justify-center hover:cursor-pointer' onClick={toggleProfileComponent}>
          <ArrowBackIosIcon sx={{ fontSize: '18px' }} />
        </div>
        <div className='ml-4 text-2xl font-semibold'>Profile</div>
      </div>
      <div className='m-4 flex grow flex-col items-center'>
        <div className='flex items-center justify-between'>
          <img
            src={profile?.avatar !== null ? profile?.avatar : avatar}
            alt=''
            className='mx-auto h-[120px] w-[120px] rounded-full border-[2px] border-solid border-white'
          />
        </div>
        <div className='mt-4 text-2xl font-thin'>{profile?.name}</div>
        <div className='mt-8 w-full grow'>
          <div className='my-4 grid grid-cols-6 '>
            <span className='col-span-2'>Vai trò: </span>
            <span className='col-span-4 font-semibold text-primary'>
              {profile?.role === 'Student' ? 'Sinh viên' : 'Giảng viên'}
            </span>
          </div>
          <div className='my-4 grid grid-cols-6 '>
            <span className='col-span-2'>MSSV: </span>
            <span className='col-span-4 font-semibold text-primary'>{profile?.user_id}</span>
          </div>
          <div className='my-4 grid grid-cols-6 '>
            <span className='col-span-2'>Khoa : </span>
            <span className='col-span-4 font-semibold text-primary'>{profile?.active}</span>
          </div>
          <div className='my-4 grid grid-cols-6 '>
            <span className='col-span-2'>Lớp : </span>
            <span className='col-span-4 font-semibold text-primary'>{profile?.class}</span>
          </div>
          <div className='my-4 grid grid-cols-6 '>
            <span className='col-span-2'>Giới tính: </span>
            <span className='col-span-4 font-semibold text-primary'>{profile?.gender === true ? 'Nam' : 'Nữ'}</span>
          </div>
          <div className='my-4 grid grid-cols-6 '>
            <span className='col-span-2'>Ngày sinh : </span>
            <span className='col-span-4 font-semibold text-primary'>{ConvertDMY(profile?.birthday as string)}</span>
          </div>
        </div>
        <div className='flex w-full items-center justify-center rounded-md bg-stone-100 py-2 text-center hover:cursor-pointer hover:bg-stone-200'>
          <DriveFileRenameOutlineOutlinedIcon />
          <span className='ml-2 font-semibold'>Cập nhật thông tin</span>
        </div>
      </div>
    </div>
  )
}
