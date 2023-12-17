/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { getDownloadURL, getMetadata, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import storage from 'src/utils/firebase'
import { ConvertDMY, convertBytes } from 'src/utils/utils'

interface Props {
  fileDirection: string
  isDocument: boolean
}

export default function FileWrapper({ fileDirection, isDocument }: Props) {
  const [fileName, setFileName] = useState<string>('')
  const [fileSize, setFileSize] = useState<number>(0)
  const [fileUrl, setFileUrl] = useState<string>('')
  const [timeCreated, setTimeCreated] = useState<string>('')
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  useEffect(() => {
    const getFileUrl = async () => {
      try {
        const fileRef = isDocument
          ? ref(storage, `File/${fileDirection}`)
          : ref(storage, `Message_File/${fileDirection}`)
        const url = await getDownloadURL(fileRef)
        setFileUrl(url)
        getMetadata(fileRef)
          .then((metadata) => {
            setFileName(metadata.name)
            setFileSize(metadata.size)
            setTimeCreated(metadata.timeCreated)
            setIsLoaded(true)
          })
          .catch((error) => {
            toast.error('Error getting file metadata:' + error)
          })
      } catch (error) {
        toast.error('Error fetching file URL:' + error)
      }
    }
    getFileUrl()
  }, [])

  if (!isLoaded) {
    return null
  }
  return (
    <div
      className='flex w-full items-center justify-center rounded-md bg-white px-3 py-2 hover:cursor-pointer hover:bg-gray-100'
      onClick={() => window.open(fileUrl)}
    >
      <InsertDriveFileIcon sx={{ fontSize: '30px' }} />
      <div className='ml-4 mr-2 flex grow flex-col justify-center truncate'>
        <div className='truncate text-base font-semibold'>{fileName}</div>
        <div className='mt-1 flex items-center justify-between'>
          <div className='truncate text-sm text-textColor'>{convertBytes(fileSize)}</div>
          <div className='truncate text-sm text-textColor'>{ConvertDMY(timeCreated)}</div>
        </div>
      </div>
    </div>
  )
}
