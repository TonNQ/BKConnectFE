/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import avatar from 'src/assets/images/avatar.jpg'
import { ConvertDMY } from 'src/utils/utils'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import storage from 'src/utils/firebase'
import userApi from 'src/apis/users.api'
import { setProfileToLocalStorage } from 'src/utils/auth'
import { User } from 'src/types/user.type'
import { getUrl } from 'src/utils/getFileFromFirebase'

interface Props {
  isUpdatePage: boolean
  setIsUpdatePage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ShowProfile({ isUpdatePage, setIsUpdatePage }: Props) {
  const { profile, setProfile } = useContext(AppContext)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  // upload ảnh lên firebase
  const avatarRef = useRef<HTMLInputElement | null>(null)

  const handleChangePage = () => {
    setIsUpdatePage(!isUpdatePage)
  }
  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0]
    if (selectedFile) {
      setSelectedFile(selectedFile)
    }
  }
  const handleUploadSelectedFile = () => {
    if (!selectedFile) {
      toast.error('Vui lòng chọn 1 ảnh!')
    } else {
      const isImage = selectedFile.type.startsWith('image')
      if (isImage) {
        const directory = `/Avatar/${profile?.user_id}`
        const storageRef = ref(storage, directory)
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, selectedFile)

        uploadTask.on(
          'state_changed',
          () => {
            // const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            // // update progress
            // setPercent(percent)
          },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then(() => {
              userApi
                .changeAvatar({ avatar: profile?.user_id as string })
                .then((response) => {
                  setProfile((prevProfile) =>
                    prevProfile
                      ? {
                          ...prevProfile,
                          avatar: response.data.data
                        }
                      : null
                  )
                  setProfileToLocalStorage({ ...profile, avatar: response.data.data } as User)
                  toast.success('Cập nhật ảnh đại diện thành công')
                })
                .catch(() => {
                  toast.error('Cập nhật ảnh đại diện thất bại')
                })
            })
          }
        )
      } else {
        toast.error('Vui lòng chọn file dạng ảnh')
      }
    }
  }
  const handleOpenImgSelection = () => {
    if (avatarRef.current) {
      avatarRef.current.click()
    }
  }
  useEffect(() => {
    getUrl('Avatar', profile?.avatar as string)
      .then((url) => {
        if (url) {
          setAvatarUrl(url)
        }
      })
      .catch((error) => console.error(error))
  })
  useEffect(() => {
    // Thực hiện tải lên Firebase khi có sự thay đổi trong state
    if (selectedFile) {
      handleUploadSelectedFile()
    }
  }, [selectedFile])
  console.log()
  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='relative h-[120px] w-[120px] pt-[100%]'>
          <img
            src={avatarUrl ? avatarUrl : avatar}
            alt=''
            className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[2px] border-solid border-grayColor bg-white object-cover'
          />
          <div
            className='absolute bottom-0 right-[4px] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-grayColor hover:cursor-pointer hover:bg-gray-200'
            onClick={handleOpenImgSelection}
          >
            <CameraAltIcon sx={{ fontSize: `22px` }} />
          </div>
          <input type='file' accept='image/*' onChange={handleChangeAvatar} ref={avatarRef} className='hidden' />
        </div>
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
