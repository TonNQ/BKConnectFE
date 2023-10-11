/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import logo from '../../assets/images/logo.jpg'
import avatar from '../../assets/images/avatar.jpg'
import { DashboardFilledIcon, DashboardOutlinedIcon } from 'src/constants/items'
import classNames from 'classnames-ts'
import Tooltip from '@mui/material/Tooltip'
import { AppContext } from 'src/contexts/app.context'
import { useContext } from 'react'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const { indexPage, setIndexPage } = useContext(AppContext)
  const handleChangePage = (indexPage: number) => {
    setIndexPage(indexPage)
  }
  return (
    <div className='flex'>
      <div className='flex h-[100vh] w-[70px] flex-col items-center justify-between bg-primary shadow-md'>
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
        <div className='mb-[15px]'>
          <img
            src={avatar}
            alt='avatar'
            className='h-[50px] w-[50px] rounded-full border-[2px] border-solid border-white'
          />
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}
