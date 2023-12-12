/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext } from 'react'
import dut from 'src/assets/images/DUT_img.jpg'
import { SocketContext } from 'src/contexts/socket.context'

interface Props {
  setIsViewImageVisible: React.Dispatch<React.SetStateAction<boolean>>
  imageUrl: string
}

export default function ImageCard({ setIsViewImageVisible, imageUrl }: Props) {
  const { setSelectedImage } = useContext(SocketContext)
  const handleClick = () => {
    setIsViewImageVisible(true)
    setSelectedImage(imageUrl)
  }
  return (
    <div className='relative w-full pt-[100%]' onClick={handleClick}>
      <img
        src={imageUrl}
        alt={dut}
        className='absolute left-0 top-0 h-full w-full rounded-md bg-white object-cover  hover:cursor-pointer hover:border-[1px] hover:border-white'
      />
    </div>
  )
}
