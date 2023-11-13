import { Fragment, useContext, useState } from 'react'
import Header from './Header'
import RoomInformation from './RoomInformation'
import Footer from './Footer'
import { MessageContext } from 'src/contexts/message.context'
import { SystemMsg, TextMsg, Timeline } from './MsgTypes'
import { TimeDifference } from 'src/utils/utils'

export default function MessageWrapper() {
  const [showRoomInfo, setShowRoomInfo] = useState<boolean>(false)
  const { messages, room } = useContext(MessageContext)
  let prevTime = ''
  return (
    <div className='grow-1 flex w-full'>
      <div className='flex h-[100vh] grow flex-col'>
        <Header showRoomInfo={showRoomInfo} setShowRoomInfo={setShowRoomInfo} />
        <div className='grow-1 relative flex h-full flex-col-reverse overflow-auto bg-gray-50'>
          {/* <Timeline date='2023-10-07T19:53:04.797' /> */}

          {messages.reverse().map((message) => {
            let showTimeLine: boolean = false
            if (prevTime === '' || TimeDifference(prevTime, message.send_time) >= 60 * 60 * 1000) {
              showTimeLine = true
            }
            prevTime = message.send_time
            switch (message.type_message) {
              case 'Text':
                if (message.sender_id === null) {
                  return showTimeLine ? (
                    <Fragment key={message.message_id}>
                      <SystemMsg key={message.message_id} contentMsg={message.content} />
                      <Timeline key={message.send_time} date={message.send_time} />
                    </Fragment>
                  ) : (
                    <SystemMsg key={message.message_id} contentMsg={message.content} />
                  )
                } else {
                  return showTimeLine ? (
                    <Fragment key={message.message_id}>
                      <TextMsg key={message.message_id} msg={message} room_type={room?.room_type} />
                      <Timeline key={message.send_time} date={message.send_time} />
                    </Fragment>
                  ) : (
                    <TextMsg key={message.message_id} msg={message} room_type={room?.room_type} />
                  )
                }
            }
          })}
        </div>
        <Footer />
      </div>
      {showRoomInfo && <RoomInformation />}
    </div>
  )
}
