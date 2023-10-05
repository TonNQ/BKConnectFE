import { Link, useLocation } from 'react-router-dom'
import path from 'src/constants/path'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NotifyActive() {
  const location = useLocation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { email } = location.state || {}
  return (
    <>
      {/* {value && ( */}
      <>
        <div className='text-center text-lg font-bold uppercase text-primary'>Đăng ký tài khoản thành công</div>
        <div className='text-center'>
          Vui lòng kiểm tra thư của chúng tôi gửi về email <span className='font-bold text-primary'>{email}</span> để
          kích hoạt tài khoản.
        </div>
        <Link
          to={path.login}
          className='rounded-md bg-primary px-10 py-1 text-center text-lg uppercase text-white hover:border-secondary hover:bg-secondary hover:text-white'
        >
          Đăng nhập
        </Link>
        <div className='text-sm'>
          Bạn chưa nhận được thư của chúng tôi?{' '}
          <span className='font-bold text-primary hover:cursor-pointer hover:text-secondary hover:underline'>
            Gửi lại thư kích hoạt
          </span>
        </div>
      </>
      {/* )} */}
    </>
  )
}
