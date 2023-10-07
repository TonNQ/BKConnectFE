import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { useContext } from 'react'

export default function PageNotFound() {
  const { isAuthenticated } = useContext(AppContext)
  return (
    <>
      <div className='text-center text-2xl font-bold uppercase text-primary'>404 - Page not found</div>
      <div className='text-center text-lg'>Chúng tôi không thể tìm thấy trang mà bạn đang tìm kiếm.</div>
      <Link
        to={isAuthenticated ? path.home : path.login}
        className='rounded-md bg-primary px-10 py-1 text-center text-lg uppercase text-white hover:border-secondary hover:bg-secondary hover:text-white'
      >
        Quay lại
      </Link>
    </>
  )
}
