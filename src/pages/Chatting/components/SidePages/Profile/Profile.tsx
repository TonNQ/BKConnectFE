/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import 'src/index.css'
import classNames from 'classnames'
import ShowProfile from './pages/ShowProfile/ShowProfile'
import UpdateProfile from './pages/UpdateProfile'
// import { getUrl } from 'src/utils/getFileFromFirebase'
// import { toast } from 'react-toastify'

export default function Profile() {
  const { isProfileVisible, setIsProfileVisible } = useContext(AppContext)
  const [isUpdatePage, setIsUpdatePage] = useState<boolean>(false)
  useEffect(() => {
    // if (!profile) {
    //   userApi.getProfile().then((response) => {
    //     const profileData = response.data
    //     if (profileData && profileData.data && profile !== profileData.data) {
    //       getUrl('Avatar', profileData.data.avatar)
    //         .then((url) => {
    //           setProfile({
    //             ...profileData.data,
    //             avatar: url as string
    //           })
    //         })
    //         .catch(() => {
    //           toast.error('Có lỗi đã xảy ra khi xuất ảnh')
    //           setProfile({ ...profileData.data, avatar: '' })
    //         })
    //     }
    //   })
    // }
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
        <div className='ml-4 text-2xl font-semibold'>{isUpdatePage ? 'Cập nhật profile' : 'Profile'}</div>
      </div>

      <div className='mx-4 my-2 flex grow flex-col items-center'>
        {isUpdatePage ? (
          <UpdateProfile isUpdatePage={isUpdatePage} setIsUpdatePage={setIsUpdatePage} />
        ) : (
          <ShowProfile isUpdatePage={isUpdatePage} setIsUpdatePage={setIsUpdatePage} />
        )}
      </div>
    </div>
  )
}
