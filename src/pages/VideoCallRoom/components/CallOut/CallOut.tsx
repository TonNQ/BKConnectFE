import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import NotifyLayout from 'src/layouts/NotifyLayout'

export default function CallOut({ message }: { message: string }) {
  return (
    <NotifyLayout>
      <div className='text-center text-2xl font-medium text-primary'>{message}</div>
      <Link
        to={path.home}
        className='rounded-md bg-primary px-10 py-1 text-center text-lg uppercase text-white hover:border-secondary hover:bg-secondary hover:text-white'
      >
        Quay lại trang chủ
      </Link>
    </NotifyLayout>
  )
}
