import { useContext } from 'react'
import { DashboardComponent } from 'src/constants/items'
import { AppContext } from 'src/contexts/app.context'
import { MessageProvider } from 'src/contexts/message.context'
// import { SocketProvider } from 'src/contexts/socket.context'
// import { getAccessTokenFromLocalStorage } from 'src/utils/auth'
// import useSocket from 'src/hooks/useSocket'
// import { getAccessTokenFromLocalStorage } from 'src/utils/auth'

export default function Chatting() {
  const { indexPage } = useContext(AppContext)
  // const socket = useSocket('wss://localhost:7012/ws', getAccessTokenFromLocalStorage())
  // useEffect(() => {
  //   if (socket) {
  //     // socket.on
  //   }
  // }, [socket])
  return (
    // <SocketProvider url={`wss://localhost:7012/websocket/ws`}>
    <MessageProvider>
      <div className='flex'>
        <div className='h-[100vh] w-[320px] min-w-[320px] shadow-md'>
          {DashboardComponent.map((element) => {
            if (element.index === indexPage) {
              return <div key={element.index}>{element.sideComponent}</div>
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
    </MessageProvider>
    // </SocketProvider>
  )
}
