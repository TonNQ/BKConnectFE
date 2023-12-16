/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useRef, useState } from 'react'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { SocketContext } from 'src/contexts/socket.context'
import { SendSocketData, WebSocketDataType } from 'src/types/socket.type'
import { AppContext } from 'src/contexts/app.context'
import { convertToDateTimeServer, generateRandomString } from 'src/utils/utils'
import storage from 'src/utils/firebase'
import { toast } from 'react-toastify'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export default function Footer() {
  const { wsRef, messages, setMessages, roomInfo, setImages } = useContext(SocketContext)
  const { profile } = useContext(AppContext)

  // kiểm soát chiều rộng của ô tin nhắn
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [text, setText] = useState('')
  const [height, setHeight] = useState<number>(65)

  // upload ảnh lên firebase
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const fileSelectionRef = useRef<HTMLInputElement | null>(null)
  // const [file, setFile] = useState<File | null>(null)
  // selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files && event.target.files[0]
  //   if (selectedFile) {
  //     setFile(selectedFile)
  //   }
  // }
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0]
    if (selectedFile) {
      setSelectedFile(selectedFile)
    }
  }
  // useEffect(() => {
  //   // Thực hiện tải lên Firebase khi có sự thay đổi trong state
  //   if (file) {
  //     handleUpload()
  //   }
  // }, [file])
  useEffect(() => {
    // Thực hiện tải lên Firebase khi có sự thay đổi trong state
    if (selectedFile) {
      handleUploadSelectedFile()
    }
  }, [selectedFile])
  // const handleUpload = () => {
  //   if (!file) {
  //     toast.error('Vui lòng chọn ảnh!')
  //   } else {
  //     const directory = `${profile?.user_id}/${new Date().toISOString()}/`
  //     const storageRef = ref(storage, `/Message_Image/${directory}`)
  //     // progress can be paused and resumed. It also exposes progress updates.
  //     // Receives the storage reference and the file to upload.
  //     const uploadTask = uploadBytesResumable(storageRef, file)

  //     uploadTask.on(
  //       'state_changed',
  //       () => {
  //         // const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
  //         // // update progress
  //         // setPercent(percent)
  //       },
  //       (err) => console.log(err),
  //       () => {
  //         // download url
  //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //           console.log(url)
  //           const message: SendSocketData = {
  //             data_type: WebSocketDataType.IsMessage,
  //             message: {
  //               temp_id: convertToDateTimeServer(new Date()),
  //               room_id: roomInfo?.id,
  //               message_type: 'Image',
  //               content: directory,
  //               root_message_id: null
  //             }
  //           }
  //           wsRef.current?.send(JSON.stringify(message))
  //           setText('')
  //           setMessages([
  //             {
  //               message_id: 0,
  //               sender_id: profile?.user_id || null,
  //               sender_name: 'Bạn',
  //               sender_avatar: profile?.avatar as string,
  //               send_time: message.message.temp_id,
  //               room_id: roomInfo?.id as number,
  //               message_type: message.message.message_type,
  //               content: message.message.content,
  //               root_message_id: message.message.root_message_id,
  //               root_message_content: null,
  //               temp_id: message.message.temp_id,
  //               last_message: 'Bạn: Đã gửi một ảnh đính kèm'
  //             },
  //             ...messages
  //           ])
  //           setImages((prevImages) => [url, ...prevImages])
  //         })
  //       }
  //     )
  //   }
  // }
  const handleUploadSelectedFile = () => {
    if (!selectedFile) {
      toast.error('Vui lòng chọn 1selectedFfile!')
    } else {
      const isImage = selectedFile.type.startsWith('image')
      const directory = isImage
        ? `${profile?.user_id}/${new Date().toISOString()}/${generateRandomString(20)}`
        : `${profile?.user_id}/${new Date().toISOString()}/${selectedFile.name}`
      const storageRef = isImage
        ? ref(storage, `/Message_Image/${directory}`)
        : ref(storage, `/Message_File/${directory}`)
      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, selectedFile)

      uploadTask.on(
        'state_changed',
        () => {
          // const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          // // update progress
          // setPercent(percent)
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url)
            const message: SendSocketData = {
              data_type: WebSocketDataType.IsMessage,
              message: {
                temp_id: convertToDateTimeServer(new Date()),
                room_id: roomInfo?.id,
                message_type: isImage ? 'Image' : 'File',
                content: directory,
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
                room_id: roomInfo?.id as number,
                message_type: message.message.message_type,
                content: message.message.content,
                root_message_id: message.message.root_message_id,
                root_message_content: null,
                temp_id: message.message.temp_id,
                last_message: 'Bạn: Đã gửi một ảnh đính kèm'
              },
              ...messages
            ])
            setImages((prevImages) => [url, ...prevImages])
          })
        }
      )
    }
  }
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
          room_id: roomInfo?.id,
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
          room_id: roomInfo?.id as number,
          message_type: message.message.message_type,
          content: message.message.content,
          root_message_id: message.message.root_message_id,
          root_message_content: null,
          temp_id: message.message.temp_id,
          last_message: 'Bạn: ' + message.message.content
        },
        ...messages
      ])
    }
  }
  const handleOpenImgSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleOpenFileSelection = () => {
    if (fileSelectionRef.current) {
      fileSelectionRef.current.click()
    }
  }

  return (
    <div className='grow-1 flex items-center overflow-hidden bg-white' style={{ minHeight: height > 60 ? height : 60 }}>
      <div className='ml-4 mr-2 text-primary hover:cursor-pointer hover:text-blue-600' onClick={handleOpenImgSelection}>
        <AddCircleRoundedIcon sx={{ fontSize: '28px' }} />
      </div>
      <div
        className='ml-2 mr-4 text-primary hover:cursor-pointer hover:text-blue-600'
        onClick={handleOpenFileSelection}
      >
        <AttachFileIcon sx={{ fontSize: '28px' }} />
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
      <input type='file' accept='image/*' onChange={handleChangeFile} ref={fileInputRef} className='hidden' />
      <input type='file' accept='*' onChange={handleChangeFile} ref={fileSelectionRef} className='hidden' />
    </div>
  )
}
