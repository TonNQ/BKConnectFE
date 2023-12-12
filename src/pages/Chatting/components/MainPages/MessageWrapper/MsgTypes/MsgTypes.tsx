/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classnames from 'classnames'
import { ConvertDateTime } from 'src/utils/utils'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { Message } from 'src/types/room.type'
import storage from 'src/utils/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { SocketContext } from 'src/contexts/socket.context'

interface Props {
  msg: Message
  room_type: 'PublicRoom' | 'PrivateRoom' | 'ClassRoom' | undefined
  setIsViewImageVisible?: React.Dispatch<React.SetStateAction<boolean>>
}

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

const TextMsg = ({ msg, room_type }: Props) => {
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
          className={classnames('max-w-[40vw] whitespace-normal rounded-2xl px-3 py-1 text-lg', {
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
          src={msg.sender_avatar}
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
            className={classnames('w-max max-w-[500px] whitespace-normal rounded-2xl px-3 py-1 text-lg', {
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

const ImageMsg = ({ msg, room_type, setIsViewImageVisible }: Props) => {
  const { profile } = useContext(AppContext)
  const { setSelectedImage } = useContext(SocketContext)
  const [imageUrl, setImageUrl] = useState<string>('')
  const handleClick = () => {
    if (setIsViewImageVisible !== undefined) {
      setIsViewImageVisible(true)
      setSelectedImage(imageUrl)
    }
  }
  const isSender = msg.sender_id === profile?.user_id
  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const fileRef = ref(storage, `Message_Image/${msg.content}`)
        // Lấy URL của ảnh
        const url = await getDownloadURL(fileRef)
        // Cập nhật state để hiển thị ảnh
        setImageUrl(url)
      } catch (error) {
        console.error('Error fetching image URL:', error)
      }
    }

    getImageUrl()
  }, [])
  if (room_type === 'PrivateRoom') {
    return (
      <div
        className={classnames('mx-4 mb-2 flex flex-row', {
          'justify-end': isSender,
          'justify-start': !isSender
        })}
      >
        <img
          src={imageUrl}
          alt=''
          className='max-h-[300px] max-w-[300px] rounded-2xl hover:cursor-pointer'
          onClick={handleClick}
        />
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
          src={msg.sender_avatar}
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
          <img
            src={imageUrl}
            alt=''
            className='max-h-[300px] max-w-[300px] rounded-2xl hover:cursor-pointer'
            onClick={handleClick}
          />
        </div>
      </div>
    )
  }
}

export { TextMsg, Timeline, SystemMsg, ImageMsg }
