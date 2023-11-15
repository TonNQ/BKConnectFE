import { Fragment, useContext, useEffect, useState } from 'react'
import Header from './Header'
import RoomInformation from './RoomInformation'
import Footer from './Footer'
import { SystemMsg, TextMsg, Timeline } from './MsgTypes'
import { TimeDifference } from 'src/utils/utils'
import { SocketContext } from 'src/contexts/socket.context'
import NoSelectedRoom from 'src/assets/images/NoSelectedRoom.jpg'

export default function MessageWrapper() {
  const [showRoomInfo, setShowRoomInfo] = useState<boolean>(false)
  const { messages, room } = useContext(SocketContext)
  let prevTime: string = ''
  useEffect(() => {}, [messages])
  return room ? (
    <div className='grow-1 flex w-full'>
      <div className='flex h-[100vh] grow flex-col'>
        <Header showRoomInfo={showRoomInfo} setShowRoomInfo={setShowRoomInfo} />
        <div className='grow-1 relative flex h-full flex-col-reverse overflow-auto bg-gray-50'>
          {/* <Timeline date='2023-10-07T19:53:04.797' /> */}

          {messages.map((message, index, arr) => {
            let showTimeLine: boolean = false
            if (prevTime !== '' && TimeDifference(prevTime, message.send_time) >= 60 * 60 * 1000) {
              showTimeLine = true
            }
            // biến để gán timeline
            const prev = prevTime
            prevTime = message.send_time
            switch (message.message_type) {
              case 'Text':
                // Nếu là tin nhắn đầu tiên của room
                if (index === arr.length - 1) {
                  if (message.sender_id === null) {
                    return showTimeLine ? (
                      <Fragment key={message.message_id + message.send_time}>
                        <Timeline key={prev} date={prev} />
                        <SystemMsg key={message.message_id} contentMsg={message.content} />
                        <Timeline key={message.send_time} date={message.send_time} />
                      </Fragment>
                    ) : (
                      <Fragment key={message.message_id + message.send_time}>
                        <SystemMsg key={message.message_id} contentMsg={message.content} />
                        <Timeline key={message.send_time} date={message.send_time} />
                      </Fragment>
                    )
                  } else {
                    return showTimeLine ? (
                      <Fragment key={message.message_id + message.send_time}>
                        <Timeline key={prev} date={prev} />
                        <TextMsg
                          key={message.message_id + message.send_time}
                          msg={message}
                          room_type={room?.room_type}
                        />
                        <Timeline key={message.send_time} date={message.send_time} />
                      </Fragment>
                    ) : (
                      <Fragment key={message.message_id + message.send_time}>
                        <TextMsg
                          key={message.message_id + message.send_time}
                          msg={message}
                          room_type={room?.room_type}
                        />
                        <Timeline key={message.send_time} date={message.send_time} />
                      </Fragment>
                    )
                  }
                } else {
                  if (message.sender_id === null) {
                    return showTimeLine ? (
                      <Fragment key={message.message_id + message.send_time}>
                        <Timeline key={prev} date={prev} />
                        <SystemMsg key={message.message_id} contentMsg={message.content} />
                      </Fragment>
                    ) : (
                      <SystemMsg key={message.message_id} contentMsg={message.content} />
                    )
                  } else {
                    return showTimeLine ? (
                      <Fragment key={message.message_id + message.send_time}>
                        <Timeline key={prev} date={prev} />
                        <TextMsg
                          key={message.message_id + message.send_time}
                          msg={message}
                          room_type={room?.room_type}
                        />
                      </Fragment>
                    ) : (
                      <TextMsg key={message.message_id + message.send_time} msg={message} room_type={room?.room_type} />
                    )
                  }
                }
            }
          })}
        </div>
        <Footer />
      </div>
      {showRoomInfo && <RoomInformation key={room?.id} />}
    </div>
  ) : (
    <div className='grow-1 flex w-full'>
      <div className='flex h-[100vh] grow flex-col items-center justify-center space-y-5'>
        <div className='text-2xl'>
          Chào mừng bạn đã đến với <span className='text-3xl font-bold text-primary'>BKConnect</span>
        </div>
        <div className='w-[35%] text-center text-base'>
          Khám phá những tiện ích hỗ trợ làm việc, quản lý tệp tin và trò chuyện cùng người thân, bạn bè của bạn.
        </div>
        <img src={NoSelectedRoom} alt='ảnh' className='w-[50%]' />
        <div className='w-[35%] text-center text-base'>
          Hãy tìm kiếm kết bạn với mọi người xung quanh và cùng trải nghiệm{' '}
          <span className='font-medium text-primary'>BKConnect</span> nhé!
        </div>
      </div>
    </div>
  )
}
