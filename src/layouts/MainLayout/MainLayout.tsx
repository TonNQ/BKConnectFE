/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import logo from 'src/assets/images/logo.jpg'
import avatar from 'src/assets/images/avatar.jpg'
import { DashboardFilledIcon, DashboardOutlinedIcon } from 'src/constants/items'
import Tooltip from '@mui/material/Tooltip'
import { AppContext } from 'src/contexts/app.context'
import { useContext, useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { clearLocalStorage } from 'src/utils/auth'
import authApi from 'src/apis/auth.api'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import Profile from 'src/pages/Chatting/components/SidePages/Profile'
import ChangePassword from 'src/pages/Chatting/components/SidePages/ChangePassword'
import classNames from 'classnames'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const {
    indexPage,
    setIndexPage,
    setIsAuthenticated,
    profile,
    setProfile,
    isProfileVisible,
    setIsProfileVisible,
    isChangePasswordVisible,
    setIsChangePasswordVisible
  } = useContext(AppContext)
  const navigate = useNavigate()
  const divRef = useRef<HTMLDivElement | null>(null)
  const [showSettingMenu, setShowSettingMenu] = useState(false)
  const toggleComponent = (component: string) => {
    if (component === 'profile') {
      setIsProfileVisible(!isProfileVisible)
    } else if (component === 'changePassword') {
      setIsChangePasswordVisible(!isChangePasswordVisible)
    }
    setShowSettingMenu(false)
  }

  const toggleSettingMenu = () => {
    setShowSettingMenu(!showSettingMenu)
    setIsProfileVisible(null)
    setIsChangePasswordVisible(null)
  }
  useEffect(() => {
    // Đặt lắng nghe sự kiện click trên toàn bộ tài liệu
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Hủy lắng nghe khi component bị hủy
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Xử lý sự kiện click để ẩn div
  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setShowSettingMenu(false)
    }
  }

  const handleChangePage = (indexPage: number) => {
    setIndexPage(indexPage)
    setIsProfileVisible(null)
    setIsChangePasswordVisible(null)
  }

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      clearLocalStorage()
      // closeWs()
      navigate(path.login)
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex'>
      <div className='relative z-50 flex h-[100vh] w-[70px] min-w-[70px] flex-col items-center justify-between bg-primary shadow-md'>
        <div className='mt-[15px] flex flex-col items-center space-y-5'>
          <img src={logo} alt='DUT' className='mb-2 h-[50px] w-[50px] rounded-md' />
          {DashboardOutlinedIcon.map((element) => (
            <Tooltip title={element.title} key={element.index} placement='right'>
              <div
                className={classNames('flex h-[50px] w-[50px] items-center justify-center rounded-xl ', {
                  'hover:cursor-pointer hover:bg-blue-400': indexPage !== element.index,
                  'bg-blue-400': indexPage === element.index
                })}
                key={element.index}
                onClick={() => handleChangePage(element.index)}
              >
                {indexPage !== element.index && element.icon}
                {indexPage === element.index && DashboardFilledIcon[indexPage].icon}
              </div>
            </Tooltip>
          ))}
        </div>

        <div className='mb-[15px] hover:cursor-pointer' onClick={toggleSettingMenu}>
          <img
            src={profile?.avatar}
            alt='avatar'
            className='h-[50px] w-[50px] rounded-full border-[2px] border-solid border-white'
          />
        </div>
        {showSettingMenu && (
          <div
            className='absolute bottom-[15px] left-[75px] min-w-[180px] rounded-md bg-white shadow-md shadow-slate-300'
            ref={divRef}
          >
            <div
              className='rounded-t-md px-4 py-2 hover:cursor-pointer hover:bg-blue-50'
              onClick={() => toggleComponent('profile')}
            >
              Thông tin cá nhân
            </div>
            <div
              className='px-4 py-2 hover:cursor-pointer hover:bg-blue-50'
              onClick={() => toggleComponent('changePassword')}
            >
              Đổi mật khẩu
            </div>
            <div className='rounded-b-md px-4 py-2 hover:cursor-pointer hover:bg-blue-50' onClick={handleLogout}>
              Đăng xuất
            </div>
          </div>
        )}
      </div>
      <Profile />
      <ChangePassword />
      <div>{children}</div>
    </div>
  )
}
