import dut from 'src/assets/images/DUT_img.jpg'

export default function ImageCard() {
  return (
    <div className='relative w-full pt-[100%] '>
      <img
        src={dut}
        alt={dut}
        className='absolute left-0 top-0 h-full w-full rounded-md bg-white object-cover hover:cursor-pointer hover:border-[1px] hover:border-white'
      />
    </div>
  )
}
