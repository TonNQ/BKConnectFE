import dut from 'src/assets/images/DUT_img.jpg'

interface Props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <div className='absolute left-0 top-0 h-full w-[50%]'>
        <img src={dut} alt='' className='h-full w-full' />
      </div>
      <div className=' absolute right-0 top-0 m-auto flex h-full w-[50%] items-center justify-center px-36 py-12'>
        <div className='block w-full'>{children}</div>
      </div>
    </div>
  )
}
