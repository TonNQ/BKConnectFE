import { useContext, useState } from 'react'
import Header from './Header'
import RoomInformation from './RoomInformation'
import Footer from './Footer'
import { MessageContext } from 'src/contexts/message.context'
import { TextMsg } from './MsgTypes'

export default function MessageWrapper() {
  const [showRoomInfo, setShowRoomInfo] = useState<boolean>(false)
  const { messages, room } = useContext(MessageContext)

  return (
    <div className='grow-1 flex w-full'>
      <div className='flex h-[100vh] grow flex-col'>
        <Header showRoomInfo={showRoomInfo} setShowRoomInfo={setShowRoomInfo} />
        <div className='grow-1 relative flex h-full flex-col-reverse overflow-auto bg-gray-50'>
          {/* <Timeline date='2023-10-07T19:53:04.797' /> */}
          {messages.map((message) => (
            <TextMsg key={message.message_id} msg={message} room_type={room?.room_type} />
          ))}
        </div>
        <Footer />
      </div>
      {showRoomInfo && <RoomInformation />}
    </div>
  )
}
