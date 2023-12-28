/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classnames from 'classnames'
import { ConvertDateTime, convertBytes } from 'src/utils/utils'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { Message } from 'src/types/room.type'
import storage from 'src/utils/firebase'
import { getDownloadURL, getMetadata, ref } from 'firebase/storage'
import { SocketContext } from 'src/contexts/socket.context'
import DescriptionIcon from '@mui/icons-material/Description'
import DownloadIcon from '@mui/icons-material/Download'
import VideocamIcon from '@mui/icons-material/Videocam'
import { toast } from 'react-toastify'
import { getUrl } from 'src/utils/getFileFromFirebase'
import dut from 'src/assets/images/logo.jpg'
import path from 'src/constants/path'

interface Props {
  msg: Message
  room_type: 'PublicRoom' | 'PrivateRoom' | 'ClassRoom' | undefined
  setIsViewImageVisible?: React.Dispatch<React.SetStateAction<boolean>>
}

const openVideoCall = (roomId: number) => {
  window.open(`${path.video_call}/${roomId}`, '_blank')
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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  useEffect(() => {
    getUrl('Avatar', msg.sender_avatar).then((url) => setAvatarUrl(url as string))
  }, [])
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
          src={avatarUrl ?? dut}
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

const StartCallVideoMsg = ({ msg, room_type }: Props) => {
  const { profile } = useContext(AppContext)
  const isSender = msg.sender_id === profile?.user_id
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  useEffect(() => {
    getUrl('Avatar', msg.sender_avatar).then((url) => setAvatarUrl(url as string))
  }, [])

  if (room_type === 'PrivateRoom') {
    return (
      <div
        className={classnames('mx-4 mb-2 flex flex-row', {
          'justify-end': isSender,
          'justify-start': !isSender
        })}
      >
        <div
          className={classnames(
            'flex max-w-[40vw] flex-row items-center space-x-4 whitespace-normal rounded-2xl px-3 py-2 pr-6 text-lg hover:cursor-pointer',
            {
              'bg-primary text-white': isSender,
              'bg-grayColor text-black': !isSender
            }
          )}
          onClick={() => openVideoCall(msg.room_id)}
        >
          <div
            className={classnames('jusitfy-center p-auto flex h-[40px] min-w-[40px] items-center rounded-full', {
              'bg-blue-400': isSender,
              'bg-stone-200': !isSender
            })}
          >
            <VideocamIcon sx={{ fontSize: '24px', width: '100%' }} />
          </div>
          <div className='flex flex-1 flex-col justify-center'>
            <div className='line-clamp-2 overflow-ellipsis text-lg font-medium'>{msg.content}</div>
            <div className='mb-1 text-sm font-normal'>Tham gia hoặc bắt đầu cuộc gọi mới</div>
          </div>
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
          src={avatarUrl ?? dut}
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
            className={classnames(
              'flex max-w-[40vw] flex-row items-center space-x-4 whitespace-normal rounded-2xl px-3 py-2 pr-6 text-lg hover:cursor-pointer',
              {
                'bg-primary text-white': isSender,
                'bg-grayColor text-black': !isSender
              }
            )}
            onClick={() => openVideoCall(msg.room_id)}
          >
            <div
              className={classnames('jusitfy-center p-auto flex h-[40px] min-w-[40px] items-center rounded-full', {
                'bg-blue-400': isSender,
                'bg-stone-200': !isSender
              })}
            >
              <VideocamIcon sx={{ fontSize: '24px', width: '100%' }} />
            </div>
            <div className='flex flex-1 flex-col justify-center'>
              <div className='line-clamp-2 overflow-ellipsis text-lg font-medium'>{msg.content}</div>
              <div className='mb-1 text-sm font-normal'>Tham gia hoặc bắt đầu cuộc gọi mới</div>
            </div>
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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  useEffect(() => {
    getUrl('Message_Image', msg.content)
      .then((url) => setImageUrl(url as string))
      .catch((error) => toast.error('Error fetching image URL:' + error))
    getUrl('Avatar', msg.sender_avatar).then((url) => setAvatarUrl(url as string))
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
          src={avatarUrl ?? dut}
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

const FileMsg = ({ msg, room_type }: Props) => {
  const { profile } = useContext(AppContext)
  const [fileUrl, setFileUrl] = useState<string>('')
  const [fileSize, setFileSize] = useState<number | null>(null)
  const isSender = msg.sender_id === profile?.user_id
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  useEffect(() => {
    const getFileUrl = async () => {
      try {
        const fileRef = ref(storage, `Message_File/${msg.content}`)
        const url = await getDownloadURL(fileRef)
        setFileUrl(url)
        getMetadata(fileRef)
          .then((metadata) => {
            setFileSize(metadata.size)
          })
          .catch((error) => {
            toast.error('Error getting file metadata:' + error)
          })
      } catch (error) {
        toast.error('Error fetching file URL:' + error)
      }
    }
    getFileUrl()
    getUrl('Avatar', msg.sender_avatar).then((url) => setAvatarUrl(url as string))
  }, [])
  const fileName = msg.content.slice(msg.content.lastIndexOf('/') + 1)
  const downloadFile = async () => {
    try {
      // Tránh tạo ra thêm 1 link mới từ url
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = fileName
      link.target = '_self'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      toast.error('Error downloading file:' + error)
    }
  }

  if (room_type === 'PrivateRoom') {
    return (
      <div
        className={classnames('mx-4 mb-2 flex flex-row', {
          'justify-end': isSender,
          'justify-start': !isSender
        })}
      >
        <div
          className={classnames(
            'flex max-w-[40vw] flex-row items-center space-x-4 whitespace-normal rounded-2xl px-3 py-2 text-lg',
            {
              'bg-primary text-white': isSender,
              'bg-grayColor text-black': !isSender
            }
          )}
        >
          <div
            className={classnames('jusitfy-center p-auto flex h-[40px] min-w-[40px] items-center rounded-full', {
              'bg-blue-400': isSender,
              'bg-stone-200': !isSender
            })}
          >
            <DescriptionIcon sx={{ fontSize: '24px', width: '100%' }} />
          </div>
          <div className='flex flex-1 flex-col'>
            <div className='line-clamp-2 overflow-ellipsis text-lg font-medium'>{fileName}</div>
            <div className='text-base font-normal'>{convertBytes(fileSize || 0)}</div>
          </div>
          <div
            className={classnames(
              'jusitfy-center p-auto flex h-[40px] min-w-[40px] items-center rounded-full hover:cursor-pointer',
              {
                'bg-blue-400 hover:bg-secondary': isSender,
                'bg-stone-200 hover:bg-stone-300': !isSender
              }
            )}
            onClick={downloadFile}
          >
            <DownloadIcon sx={{ fontSize: '24px', width: '100%' }} />
          </div>
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
          src={avatarUrl ?? dut}
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
            className={classnames(
              'flex max-w-[40vw] flex-row items-center space-x-4 whitespace-normal rounded-2xl px-3 py-2 text-lg',
              {
                'bg-primary text-white': isSender,
                'bg-grayColor text-black': !isSender
              }
            )}
          >
            <div
              className={classnames('jusitfy-center p-auto flex h-[40px] min-w-[40px] items-center rounded-full', {
                'bg-blue-400': isSender,
                'bg-stone-200': !isSender
              })}
            >
              <DescriptionIcon sx={{ fontSize: '24px', width: '100%' }} />
            </div>
            <div className='flex flex-1 flex-col'>
              <div className='line-clamp-2 overflow-ellipsis text-lg font-medium'>{fileName}</div>
              <div className='text-base font-normal'>{convertBytes(fileSize || 0)}</div>
            </div>
            <div
              className={classnames(
                'jusitfy-center p-auto flex h-[40px] min-w-[40px] items-center rounded-full hover:cursor-pointer',
                {
                  'bg-blue-400 hover:bg-secondary': isSender,
                  'bg-stone-200 hover:bg-stone-300': !isSender
                }
              )}
              onClick={downloadFile}
            >
              <DownloadIcon sx={{ fontSize: '24px', width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { TextMsg, Timeline, SystemMsg, ImageMsg, FileMsg, StartCallVideoMsg }
