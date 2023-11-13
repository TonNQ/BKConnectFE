import dut from 'src/assets/images/logo.jpg'
import classnames from 'classnames'
import { ConvertDateTime } from 'src/utils/utils'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { Message } from 'src/types/room.type'

// interface Message {
//   id?: string
//   type?: 'text' | 'img' | 'reply'
//   content?: string
//   send_time?: string
//   sender_id?: string
//   sender_name?: string
//   room_type: 'PublicRoom' | 'PrivateRoom' | 'ClassRoom'
//   reply_message_sender?: string
//   reply_message_content?: string
// }

const Timeline = ({ date }: { date: string }) => {
  return (
    <div className='mb-4 mt-6 flex flex-row items-center justify-center text-base font-semibold text-textColor'>
      {ConvertDateTime(date, true)}
    </div>
  )
}

const SystemMsg = ({ contentMsg }: { contentMsg: string }) => {
  return (
    <div className='mx-4 mb-4 flex flex-row items-center justify-center text-base font-normal text-textColor'>
      {contentMsg}
    </div>
  )
}

const TextMsg = ({
  msg,
  room_type
}: {
  msg: Message
  room_type: 'PublicRoom' | 'PrivateRoom' | 'ClassRoom' | undefined
}) => {
  const { profile } = useContext(AppContext)
  const isSender = msg.sender_id === profile?.user_id
  if (room_type === 'PrivateRoom') {
    return (
      <div
        className={classnames('mx-4 mb-2 flex flex-row', {
          'justify-end': isSender,
          'justify-start': !isSender
        })}
      >
        <div
          className={classnames('w-max max-w-[40vw] rounded-2xl px-3 py-1 text-lg', {
            'bg-primary text-white': isSender,
            'bg-grayColor text-black': !isSender
          })}
        >
          {msg.content}
        </div>
      </div>
    )
  } else {
    return (
      <div
        className={classnames('mx-4 mb-2  flex flex-row  items-end', {
          'justify-end': isSender,
          'justify-start': !isSender
        })}
      >
        <img
          src={dut}
          alt=''
          className={classnames('h-[35px] w-[35px] rounded-full', {
            hidden: isSender
          })}
        />
        <div className='ml-3 flex flex-col'>
          <div
            className={classnames('mb-1 ml-2 text-sm text-textColor', {
              hidden: isSender
            })}
          >
            {msg.sender_name}
          </div>
          <div
            className={classnames('w-max max-w-[500px] rounded-2xl px-3 py-1 text-lg', {
              'bg-primary text-white': isSender,
              'bg-grayColor text-black': !isSender
            })}
          >
            {msg.content}
          </div>
        </div>
      </div>
    )
  }
}

export { TextMsg, Timeline, SystemMsg }
