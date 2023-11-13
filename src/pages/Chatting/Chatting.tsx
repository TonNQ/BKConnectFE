import { useContext, useEffect } from 'react'
import { DashboardComponent } from 'src/constants/items'
import { AppContext } from 'src/contexts/app.context'
import { MessageProvider } from 'src/contexts/message.context'
import { SocketContext } from 'src/contexts/socket.context'

export default function Chatting() {
  const { indexPage } = useContext(AppContext)
  const { connectWs } = useContext(SocketContext)
  useEffect(() => {
    connectWs()
  }, [])
  return (
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
  )
}
