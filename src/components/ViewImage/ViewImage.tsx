/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import dut from 'src/assets/images/logo.jpg'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useContext } from 'react'
import { SocketContext } from 'src/contexts/socket.context'

interface Props {
  setIsViewImageVisible: (value: React.SetStateAction<boolean>) => void
}

export default function ViewImage({ setIsViewImageVisible }: Props) {
  const { selectedImage } = useContext(SocketContext)
  return (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-darkGrayColor bg-opacity-90 px-20 py-16'
      onClick={() => {
        setIsViewImageVisible(false)
      }}
    >
      <div className='flex h-full w-full items-center justify-center'>
        <img
          src={selectedImage || dut}
          alt='ảnh'
          className='h-[100%] w-full object-contain object-center'
          onClick={(e) => e.stopPropagation()}
        />
        <div
          className='absolute right-[10px] top-[20px] flex h-[28px] w-[28px] translate-y-[-50%] items-center justify-center rounded-full border-[1px] border-gray-300 bg-gray-300 text-gray-700 hover:cursor-pointer hover:border-gray-500 hover:bg-gray-500'
          onClick={() => setIsViewImageVisible(false)}
        >
          <CloseOutlinedIcon sx={{ fontSize: '20px' }} />
        </div>
      </div>
    </div>
  )
}
