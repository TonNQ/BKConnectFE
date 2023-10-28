import dut from 'src/assets/images/logo.jpg'
import classnames from 'classnames-ts/src/classNames'
import { ConvertDateTime } from 'src/utils/utils'

interface Message {
  id?: string
  type?: 'text' | 'img' | 'reply'
  content?: string
  send_time?: string
  sender_id?: string
  sender_name?: string
  room_type: 'PublicRoom' | 'PrivateRoom' | 'ClassRoom'
  reply_message_sender?: string
  reply_message_content?: string
}

const Timeline = ({ date }: { date: string }) => {
  return (
    <div className='mb-4 mt-6 flex flex-row items-center justify-center text-base font-semibold text-textColor'>
      {ConvertDateTime(date, true)}
    </div>
  )
}

const TextMsg = ({ sender, msg }: { sender: boolean; msg: Message }) => {
  if (msg.room_type === 'PrivateRoom') {
    return (
      <div
        className={classnames('mx-4 mb-2 flex flex-row', {
          'justify-end': sender,
          'justify-start': !sender
        })}
      >
        <div
          className={classnames('w-max max-w-[40vw] rounded-2xl px-3 py-1 text-lg', {
            'bg-primary text-white': sender,
            'bg-grayColor text-black': !sender
          })}
        >
          Đây là tin nhắn room
        </div>
      </div>
    )
  } else {
    return (
      <div
        className={classnames('mx-4 mb-2  flex flex-row  items-end', {
          'justify-end': sender,
          'justify-start': !sender
        })}
      >
        <img
          src={dut}
          alt=''
          className={classnames('h-[35px] w-[35px] rounded-full', {
            hidden: sender
          })}
        />
        <div className='ml-3 flex flex-col'>
          <div
            className={classnames('mb-1 ml-2 text-sm text-textColor', {
              hidden: sender
            })}
          >
            {msg.sender_name}
          </div>
          <div
            className={classnames('w-max max-w-[500px] rounded-2xl px-3 py-1 text-lg', {
              'bg-primary text-white': sender,
              'bg-grayColor text-black': !sender
            })}
          >
            Yêu anh an nhiều lắm lắm ahihihihiiYêu anh an nhiều lắm lắm ahihihihiiYêu anh an nhiều lắm lắm ahihihihiiYêu
            anh an nhiều lắm lắm ahihihihiiYêu anh an nhiều lắm lắm ahihihihiiYêu anh an nhiều lắm lắm ahihihihiiYêu anh
            an nhiều lắm lắm ahihihihiiYêu anh an nhiều lắm lắm ahihihihiiYêu anh an nhiều lắm lắm ahihihihii
          </div>
        </div>
      </div>
    )
  }
}

export { TextMsg, Timeline }
