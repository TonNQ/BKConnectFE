import { useRef, useState } from 'react'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'

export default function Footer() {
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
      console.log(textareaRef.current.style.height)
      console.log(height)
      if (newHeight > 100) setHeight(130)
      else setHeight(newHeight + 30)
    }
  }
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
    updateHeight()
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
          className='my-2 box-border max-h-[100px] grow resize-none bg-gray-100 text-base outline-none '
          value={text}
          onChange={handleTextChange}
          placeholder='Type your message ...'
        ></textarea>
      </div>
      <div className='mx-4 text-primary hover:cursor-pointer hover:text-blue-700'>
        <SendRoundedIcon sx={{ fontSize: '28px' }} />
      </div>
    </div>
  )
}
