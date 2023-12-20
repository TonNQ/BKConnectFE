/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from 'src/utils/rules'
import { Class, Faculty, UpdatedUser } from 'src/types/user.type'
import userApi from 'src/apis/users.api'
import { AppContext } from 'src/contexts/app.context'
import avatar from 'src/assets/images/avatar.jpg'
import Input from 'src/components/Input'
import { ConvertYMD, isAxiosBadRequest } from 'src/utils/utils'
import { useMutation } from '@tanstack/react-query'
import { ErrorResponse } from 'src/types/utils.type'
import { toast } from 'react-toastify'
import { getUrl } from 'src/utils/getFileFromFirebase'
import { setProfileToLocalStorage } from 'src/utils/auth'

interface Props {
  isUpdatePage: boolean
  setIsUpdatePage: React.Dispatch<React.SetStateAction<boolean>>
}

type FormData = Pick<Schema, 'name' | 'birthday' | 'class_id' | 'faculty_id' | 'gender'>
const profileSchema = schema.pick(['name', 'birthday', 'class_id', 'faculty_id', 'gender'])

export default function UpdateProfile({ isUpdatePage, setIsUpdatePage }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(profileSchema)
  })
  const { profile, setProfile } = useContext(AppContext)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [viewedClasses, setViewedClasses] = useState<Class[]>([])

  useEffect(() => {
    getUrl('Avatar', profile?.avatar as string)
      .then((url) => {
        if (url) {
          setAvatarUrl(url)
        }
      })
      .catch((error) => console.error(error))
    userApi.getAllClasses().then((response) => {
      setClasses(response.data.data)
      setViewedClasses(response.data.data)
    })
    userApi.getAllFaculties().then((response) => {
      setFaculties(response.data.data)
    })
    setValue('class_id', profile?.class_id || 0)
    setValue('faculty_id', profile?.faculty_id || '')
  }, [])
  useEffect(() => {
    setValue('faculty_id', getValues().faculty_id ?? '')
  }, [setValue, getValues().faculty_id])

  useEffect(() => {
    setValue('class_id', getValues().class_id ?? 0)
  }, [setValue, getValues().class_id])
  const handleChangePage = () => {
    setIsUpdatePage(!isUpdatePage)
  }
  const handleChangeFaculty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedFaculty = event.target.value
    if (newSelectedFaculty === '') {
      setViewedClasses(classes)
      setValue('class_id', classes[0].class_id)
    } else {
      const newClasses: Class[] = classes.filter((element) => element.faculty_id === newSelectedFaculty)
      setViewedClasses(newClasses)
      setValue('faculty_id', newSelectedFaculty)
      setValue('class_id', newClasses[0].class_id)
    }
  }
  const handleChangeClass = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedClass = Number(event.target.value)
    const newSelectedFaculty = viewedClasses.find((element) => element.class_id === newSelectedClass)?.faculty_id || ''
    setValue('faculty_id', newSelectedFaculty)
    setValue('class_id', newSelectedClass)
  }
  const updateProfileMutation = useMutation({
    mutationFn: (body: UpdatedUser) => userApi.updateProfile(body)
  })
  const onSubmit = handleSubmit((data) => {
    const user: UpdatedUser = {
      avatar: profile?.avatar as string,
      birthday: data.birthday.toJSON(),
      class_id: data.class_id,
      faculty_id: data.faculty_id,
      gender: data.gender === 'Nam',
      name: data.name,
      user_id: profile?.user_id as string
    }
    updateProfileMutation.mutate(user, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        setProfile(data.data.data)
        setProfileToLocalStorage(data.data.data)
        setIsUpdatePage(!isUpdatePage)
      },
      onError: (error) => {
        if (isAxiosBadRequest<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data
          toast.error(formError?.message)
        }
      }
    })
  })
  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='relative h-[120px] w-[120px] pt-[100%]'>
          <img
            src={avatarUrl ? avatarUrl : avatar}
            alt=''
            className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[2px] border-solid border-grayColor bg-white object-cover'
          />
        </div>
      </div>
      <form className='mx-2 mt-1 w-full grow' action='' onSubmit={onSubmit}>
        <Input
          name='name'
          type='text'
          register={register}
          labelName='Tên người dùng'
          defaultValue={profile?.name}
          className=''
          classNameLabel='text-sm mt-1 font-semibold'
          classNameInput='border-[1px] w-full mt-1 border-stone-300 px-2 py-2 outline-1 rounded-md focus:bg-slate-100'
          classNameError='mt-1 text-xs min-h-[1rem] font-medium text-red-400'
          errorMessage={errors.name?.message}
        />
        <Input
          name='birthday'
          type='date'
          register={register}
          labelName='Ngày sinh'
          defaultValue={ConvertYMD(profile?.birthday as string)}
          className=''
          classNameLabel='text-sm mt-1 font-semibold'
          classNameInput='border-[1px] w-full mt-1 border-stone-300 px-2 py-2 outline-1 rounded-md focus:bg-slate-100'
          classNameError='mt-1 text-xs min-h-[1rem] font-medium text-red-400'
          errorMessage={errors.birthday?.message}
        />
        <div>
          <div className='mt-1 text-sm font-semibold'>Giới tính</div>
          <select
            className='mt-1 w-full rounded-md border-[1px] border-stone-300 px-2 py-2 outline-1 focus:bg-slate-100'
            defaultValue={profile?.gender === true ? 'Nam' : 'Nữ'}
            {...register('gender')}
          >
            <option value='Nam'>Nam</option>
            <option value='Nữ'>Nữ</option>
          </select>
          <div className='mt-1 min-h-[1rem] text-xs font-medium text-red-400'>{errors.gender?.message}</div>
        </div>
        <div>
          <div className='mt-1 text-sm font-semibold'>Khoa</div>
          <select
            className='mt-1 w-full rounded-md border-[1px] border-stone-300 px-2 py-2 outline-1 focus:bg-slate-100'
            {...register('faculty_id', { onChange: handleChangeFaculty })}
            defaultValue={getValues().faculty_id ?? ''}
          >
            <option value='' disabled>
              Vui lòng chọn một khoa
            </option>
            {faculties.map((element) => (
              <option key={element.faculty_id} value={element.faculty_id}>
                {element.faculty_name}
              </option>
            ))}
          </select>
          <div className='mt-1 min-h-[1rem] text-xs font-medium text-red-400'>{errors.faculty_id?.message}</div>
        </div>
        <div>
          <div className='mt-1 text-sm font-semibold'>Lớp</div>
          <select
            className='mt-1 w-full rounded-md border-[1px] border-stone-300 px-2 py-2 outline-1 focus:bg-slate-100'
            {...register('class_id', { onChange: handleChangeClass })}
            defaultValue={getValues().class_id ?? 0}
          >
            <option value={0} disabled>
              Vui lòng chọn một lớp
            </option>
            {viewedClasses.map((element) => (
              <option key={element.class_id} value={element.class_id}>
                {element.class_name}
              </option>
            ))}
          </select>
          <div className='mt-1 min-h-[1rem] text-xs font-medium text-red-400'>{errors.class_id?.message}</div>
        </div>
        <div className='mt-2 w-full'>
          <button className='text-md w-full rounded-md bg-primary px-2 py-1 text-center uppercase text-white hover:border-secondary hover:bg-secondary'>
            Cập nhật thông tin
          </button>
          <div
            className='text-md mt-2 flex w-full items-center justify-center rounded-md bg-stone-100 py-1 text-center hover:cursor-pointer hover:bg-stone-200'
            onClick={handleChangePage}
          >
            <span className='ml-2 font-semibold uppercase'>Quay lại</span>
          </div>
        </div>
      </form>
    </>
  )
}
