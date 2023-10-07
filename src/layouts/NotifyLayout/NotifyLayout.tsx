import background from '../../assets/images/background_authen.png'

interface Props {
  children?: React.ReactNode
}

export default function NotifyLayout({ children }: Props) {
  return (
    <div className='relative m-0 h-[100vh] w-full bg-cover p-0' style={{ backgroundImage: `url(${background})` }}>
      <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center space-x-2 space-y-4 rounded-md bg-slate-50 bg-opacity-60 px-6 py-5 shadow-lg'>
        {children}
      </div>
    </div>
  )
}
