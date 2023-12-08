import { cloneElement, useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { SocketContext } from 'src/contexts/socket.context'
import RoomList from './components/SidePages/RoomList'
import MessageWrapper from './components/MainPages/MessageWrapper/MessageWrapper'
import SearchUsers from './components/SidePages/SearchUsers'
import FriendWrapper from './components/MainPages/FriendWrapper'
import ClassList from './components/SidePages/ClassList'
import ClassPage from './components/MainPages/ClassPage'
import Notification from './components/SidePages/Notification/Notification'
import SettingPage from './components/MainPages/SettingPage'

export default function Chatting({
  setIsOverlayVisible
}: {
  setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const DashboardComponent = [
    {
      index: 0,
      sideComponent: <RoomList setIsOverlayVisible={setIsOverlayVisible} />,
      mainComponent: <MessageWrapper setIsOverlayVisible={setIsOverlayVisible} />
    },
    {
      index: 1,
      sideComponent: <SearchUsers />,
      mainComponent: <FriendWrapper />
    },
    {
      index: 2,
      sideComponent: <ClassList />,
      mainComponent: <ClassPage />
    },
    {
      index: 3,
      sideComponent: <Notification />
    },
    {
      index: 4,
      sideComponent: <SettingPage />
    }
  ]
  const { indexPage } = useContext(AppContext)
  const { connectWs } = useContext(SocketContext)
  useEffect(() => {
    connectWs()
  }, [])
  // Hàm render side component với setIsOverlayVisible
  const renderSideComponent = (index: number, sideComponent: JSX.Element) => {
    if (index === 0) {
      return cloneElement(sideComponent, { setIsOverlayVisible })
    } else {
      return cloneElement(sideComponent)
    }
  }
  return (
    <div className='flex'>
      <div className='h-[100vh] w-[320px] min-w-[320px] shadow-md'>
        {DashboardComponent.map((element) => {
          if (element.index === indexPage) {
            return <div key={element.index}>{renderSideComponent(element.index, element.sideComponent)}</div>
          }
        })}
      </div>
      <div className='h-[100vh] w-[calc(100vw-70px-320px)]'>
        {DashboardComponent.map((element) => {
          if (element.index === indexPage) {
            return <div key={element.index}>{element.mainComponent}</div>
          }
        })}
      </div>
    </div>
  )
}
