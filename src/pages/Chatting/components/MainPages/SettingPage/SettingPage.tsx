/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import 'src/index.css'
import classNames from 'classnames'

export default function SettingPage() {
  const { isSettingVisible, setIsSettingVisible } = useContext(AppContext)
  // useEffect(() => {
  //   userApi.getProfile().then((response) => {
  //     const profileData = response.data
  //     if (profileData && profileData.data && profile !== profileData.data) {
  //       setProfile(profileData.data)
  //     }
  //   })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  const toggleSettingComponent = () => {
    setIsSettingVisible(!isSettingVisible)
  }
  return (
    <div
      className={classNames(
        'absolute left-[70px] top-0 z-10 flex h-[100vh] w-[320px] min-w-[320px] flex-col bg-white shadow-md',
        {
          'slide-in': isSettingVisible === true,
          'slide-out': isSettingVisible === false,
          'tranform -translate-x-full': isSettingVisible === null
        }
      )}
    >
      <div className='m-4 flex items-center'>
        <div className='flex items-center justify-center hover:cursor-pointer' onClick={toggleSettingComponent}>
          <ArrowBackIosIcon sx={{ fontSize: '18px' }} />
        </div>
        <div className='ml-4 text-2xl font-semibold'>Cài đặt</div>
      </div>
    </div>
  )
}
