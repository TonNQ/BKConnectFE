import { useState } from 'react'
import Header from './Header'
import RoomInformation from './RoomInformation'
import Footer from './Footer'
import { TextMsg, Timeline } from './MsgTypes'

export default function MessageWrapper() {
  const [showRoomInfo, setShowRoomInfo] = useState<boolean>(false)

  return (
    <div className='grow-1 flex w-full'>
      <div className='flex h-[100vh] grow flex-col'>
        <Header showRoomInfo={showRoomInfo} setShowRoomInfo={setShowRoomInfo} />
        <div className='grow-1 relative flex h-full flex-col-reverse overflow-auto bg-gray-50'>
          <TextMsg msg={{ room_type: 'PrivateRoom', sender_name: 'Toàn' }} sender={false} />
          <TextMsg msg={{ room_type: 'PrivateRoom', sender_name: 'Ngừi iu cũ' }} sender={false} />
          <TextMsg msg={{ room_type: 'PrivateRoom', sender_name: 'Toàn' }} sender={true} />
          <Timeline date='2023-10-07T19:53:04.797' />
          <TextMsg msg={{ room_type: 'PrivateRoom', sender_name: 'Toàn' }} sender={false} />
          <TextMsg msg={{ room_type: 'PrivateRoom', sender_name: 'Ngừi iu cũ' }} sender={false} />
          <TextMsg msg={{ room_type: 'PrivateRoom', sender_name: 'Toàn' }} sender={true} />
        </div>
        <Footer />
      </div>
      {showRoomInfo && <RoomInformation />}
    </div>
  )
}
