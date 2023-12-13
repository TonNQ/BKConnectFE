import { Fragment, useContext, useEffect, useState } from 'react'
import Header from './Header'
import RoomInformation from './RoomInformation'
import Footer from './Footer'
import { FileMsg, ImageMsg, SystemMsg, TextMsg, Timeline } from './MsgTypes'
import { TimeDifference } from 'src/utils/utils'
import { SocketContext } from 'src/contexts/socket.context'
import NoSelectedRoom from 'src/assets/images/NoSelectedRoom.jpg'

interface Props {
  setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsViewImageVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MessageWrapper({ setIsOverlayVisible, setIsViewImageVisible }: Props) {
  const [showRoomInfo, setShowRoomInfo] = useState<boolean>(false)
  const { messages, roomInfo } = useContext(SocketContext)
  let prevTime: string = ''
  useEffect(() => {}, [messages, roomInfo])
  return roomInfo ? (
    <div className='grow-1 flex w-full'>
      <div className='flex h-[100vh] grow flex-col'>
        <Header showRoomInfo={showRoomInfo} setShowRoomInfo={setShowRoomInfo} />
        <div className='grow-1 relative flex h-full flex-col-reverse overflow-auto bg-gray-50'>
          {/* <Timeline date='2023-10-07T19:53:04.797' /> */}

          {messages.map((message, index, arr) => {
            let showTimeLine: boolean = false
            if (prevTime !== '' && TimeDifference(prevTime, message.send_time) >= 30 * 60 * 1000) {
              showTimeLine = true
            }
            // biến để gán timeline
            const prev = prevTime
            prevTime = message.send_time
            // Nếu là tin nhắn đầu tiên của room
            if (index === arr.length - 1) {
              return showTimeLine ? (
                <Fragment key={message.message_id + message.send_time}>
                  <Timeline key={prev} date={prev} />
                  {message.message_type === 'System' && (
                    <SystemMsg key={message.message_id} contentMsg={message.content} />
                  )}
                  {message.message_type === 'Text' && (
                    <TextMsg
                      key={message.message_id + message.send_time}
                      msg={message}
                      room_type={roomInfo.room_type}
                    />
                  )}
                  {message.message_type === 'Image' && (
                    <ImageMsg
                      key={message.content}
                      msg={message}
                      room_type={roomInfo.room_type}
                      setIsViewImageVisible={setIsViewImageVisible}
                    />
                  )}
                  {message.message_type === 'File' && (
                    <FileMsg key={message.content} msg={message} room_type={roomInfo.room_type} />
                  )}
                  <Timeline key={message.send_time} date={message.send_time} />
                </Fragment>
              ) : (
                <Fragment key={message.message_id + message.send_time}>
                  {message.message_type === 'System' && (
                    <SystemMsg key={message.message_id} contentMsg={message.content} />
                  )}
                  {message.message_type === 'Text' && (
                    <TextMsg
                      key={message.message_id + message.send_time}
                      msg={message}
                      room_type={roomInfo.room_type}
                    />
                  )}
                  {message.message_type === 'Image' && (
                    <ImageMsg
                      key={message.content}
                      msg={message}
                      room_type={roomInfo.room_type}
                      setIsViewImageVisible={setIsViewImageVisible}
                    />
                  )}
                  {message.message_type === 'File' && (
                    <FileMsg key={message.content} msg={message} room_type={roomInfo.room_type} />
                  )}
                  <Timeline key={message.send_time} date={message.send_time} />
                </Fragment>
              )
            } else {
              return showTimeLine ? (
                <Fragment key={message.message_id + message.send_time}>
                  <Timeline key={prev} date={prev} />
                  {message.message_type === 'System' && (
                    <SystemMsg key={message.message_id} contentMsg={message.content} />
                  )}
                  {message.message_type === 'Text' && (
                    <TextMsg
                      key={message.message_id + message.send_time}
                      msg={message}
                      room_type={roomInfo.room_type}
                    />
                  )}
                  {message.message_type === 'Image' && (
                    <ImageMsg
                      key={message.content}
                      msg={message}
                      room_type={roomInfo.room_type}
                      setIsViewImageVisible={setIsViewImageVisible}
                    />
                  )}
                </Fragment>
              ) : (
                <Fragment key={message.message_id + message.send_time}>
                  {message.message_type === 'System' && (
                    <SystemMsg key={message.message_id} contentMsg={message.content} />
                  )}
                  {message.message_type === 'Text' && (
                    <TextMsg
                      key={message.message_id + message.send_time}
                      msg={message}
                      room_type={roomInfo.room_type}
                    />
                  )}
                  {message.message_type === 'Image' && (
                    <ImageMsg
                      key={message.content}
                      msg={message}
                      room_type={roomInfo.room_type}
                      setIsViewImageVisible={setIsViewImageVisible}
                    />
                  )}
                  {message.message_type === 'File' && (
                    <FileMsg key={message.content} msg={message} room_type={roomInfo.room_type} />
                  )}
                </Fragment>
              )
            }
          })}
        </div>
        <Footer />
      </div>
      {showRoomInfo && (
        <RoomInformation
          key={roomInfo?.id}
          setIsOverlayVisible={setIsOverlayVisible}
          setIsViewImageVisible={setIsViewImageVisible}
        />
      )}
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
