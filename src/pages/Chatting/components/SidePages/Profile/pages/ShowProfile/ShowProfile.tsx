/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import avatar from 'src/assets/images/avatar.jpg'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import { ConvertDMY } from 'src/utils/utils'

interface Props {
  isUpdatePage: boolean
  setIsUpdatePage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ShowProfile({ isUpdatePage, setIsUpdatePage }: Props) {
  const { profile } = useContext(AppContext)
  const handleChangePage = () => {
    setIsUpdatePage(!isUpdatePage)
  }
  return (
    <>
      <div className='flex items-center justify-between'>
        <img
          src={profile?.avatar !== null ? profile?.avatar : avatar}
          alt=''
          className='mx-auto h-[120px] w-[120px] rounded-full border-[2px] border-solid border-white'
        />
      </div>
      <div className='mt-4 text-2xl font-thin'>{profile?.name}</div>
      <div className='mt-8 w-full grow'>
        <div className='my-4 grid grid-cols-6 '>
          <span className='col-span-2'>Vai trò: </span>
          <span className='col-span-4 font-semibold text-primary'>
            {profile?.role === 'Student' ? 'Sinh viên' : 'Giảng viên'}
          </span>
        </div>
        <div className='my-4 grid grid-cols-6 '>
          <span className='col-span-2'>MSSV: </span>
          <span className='col-span-4 font-semibold text-primary'>{profile?.user_id}</span>
        </div>
        <div className='my-4 grid grid-cols-6 '>
          <span className='col-span-2'>Khoa : </span>
          <span className='col-span-4 font-semibold text-primary'>
            {profile?.faculty_name === null ? 'Không xác định' : profile?.faculty_name}
          </span>
        </div>
        <div className='my-4 grid grid-cols-6 '>
          <span className='col-span-2'>Lớp : </span>
          <span className='col-span-4 font-semibold text-primary'>
            {profile?.class_name === null ? 'Không xác định' : profile?.class_name}
          </span>
        </div>
        <div className='my-4 grid grid-cols-6 '>
          <span className='col-span-2'>Giới tính: </span>
          <span className='col-span-4 font-semibold text-primary'>{profile?.gender === true ? 'Nam' : 'Nữ'}</span>
        </div>
        <div className='my-4 grid grid-cols-6 '>
          <span className='col-span-2'>Ngày sinh : </span>
          <span className='col-span-4 font-semibold text-primary'>{ConvertDMY(profile?.birthday as string)}</span>
        </div>
      </div>
      <div
        className='flex w-full items-center justify-center rounded-md bg-stone-100 py-2 text-center hover:cursor-pointer hover:bg-stone-200'
        onClick={handleChangePage}
      >
        <DriveFileRenameOutlineOutlinedIcon />
        <span className='ml-2 font-semibold'>Cập nhật thông tin</span>
      </div>
    </>
  )
}
