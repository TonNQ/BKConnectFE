import { useContext } from 'react'
import { DashboardComponent } from 'src/constants/items'
import { AppContext } from 'src/contexts/app.context'

export default function Chatting() {
  const { indexPage } = useContext(AppContext)
  return (
    <div className='flex'>
      <div className='h-[100vh] w-[320px] min-w-[320px] shadow-md'>
        {DashboardComponent.map((element) => {
          if (element.index === indexPage) {
            return <div key={element.index}>{element.sideComponent}</div>
          }
        })}
      </div>
      <div className='w-[calc(100vh-70px-320px]) h-[100vh]'>
        {DashboardComponent.map((element) => {
          if (element.index === indexPage) {
            return <div key={element.index}>{element.mainComponent}</div>
          }
        })}
      </div>
    </div>
  )
}
