import { useContext, useRef, useState } from 'react'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { SocketContext } from 'src/contexts/socket.context'
import { SendSocketData, WebSocketDataType } from 'src/types/socket.type'
import { AppContext } from 'src/contexts/app.context'
import { convertToDateTimeServer } from 'src/utils/utils'

export default function Footer() {
  const { wsRef, messages, setMessages, room } = useContext(SocketContext)
  const { profile } = useContext(AppContext)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [text, setText] = useState('')
  const [height, setHeight] = useState<number>(65)

  const updateHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const newHeight = textareaRef.current.scrollHeight
      if (newHeight < 100) {
        textareaRef.current.style.height = newHeight + 'px'
      } else {
        textareaRef.current.style.height = '100px'
      }
      if (newHeight > 100) setHeight(130)
      else setHeight(newHeight + 30)
    }
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
    updateHeight()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    if (text !== '') {
      const message: SendSocketData = {
        data_type: WebSocketDataType.IsMessage,
        message: {
          temp_id: convertToDateTimeServer(new Date()),
          room_id: room?.id,
          message_type: 'Text',
          content: text,
          root_message_id: null
        }
      }
      wsRef.current?.send(JSON.stringify(message))
      setText('')
      setMessages([
        {
          message_id: 0,
          sender_id: profile?.user_id || null,
          sender_name: 'Bạn',
          sender_avatar: profile?.avatar as string,
          send_time: message.message.temp_id,
          message_type: message.message.message_type,
          content: message.message.content,
          root_message_id: message.message.root_message_id,
          root_message_content: null,
          temp_id: message.message.temp_id
        },
        ...messages
      ])
    }
  }

  return (
    <div className='grow-1 flex items-center overflow-hidden bg-white' style={{ minHeight: height > 60 ? height : 60 }}>
      <div className='mx-4 text-primary hover:cursor-pointer hover:text-blue-600'>
        <AddCircleRoundedIcon sx={{ fontSize: '28px' }} />
      </div>
      <div className='my-2 flex grow items-center rounded-xl bg-gray-100 px-2 '>
        <textarea
          ref={textareaRef}
          id='chat'
          rows={1}
          className='my-2 box-border max-h-[100px] grow resize-none bg-gray-100 text-base outline-none'
          value={text}
          placeholder='Type your message ...'
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
      <div className='mx-4 text-primary hover:cursor-pointer hover:text-blue-700' onClick={handleSubmit}>
        <SendRoundedIcon sx={{ fontSize: '28px' }} />
      </div>
    </div>
  )
}
