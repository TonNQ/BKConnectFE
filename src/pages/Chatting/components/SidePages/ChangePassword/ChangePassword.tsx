/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useForm } from 'react-hook-form'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import 'src/index.css'
import classNames from 'classnames'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import userApi from 'src/apis/users.api'
import { toast } from 'react-toastify'
import { ErrorResponse } from 'src/types/utils.type'
import { isAxiosBadRequest } from 'src/utils/utils'

type FormData = Pick<Schema, 'current_password' | 'password' | 'confirm_password'>
const changePasswordSchema = schema.pick(['current_password', 'password', 'confirm_password'])

export default function ChangePassword() {
  const { isChangePasswordVisible, setIsChangePasswordVisible } = useContext(AppContext)
  const toggleChangePasswordComponent = () => {
    setIsChangePasswordVisible(!isChangePasswordVisible)
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(changePasswordSchema)
  })
  const changePasswordMutation = useMutation({
    mutationFn: (body: { current_password: string; new_password: string }) => userApi.changePassword(body)
  })
  const onSubmit = handleSubmit((data) => {
    const account = {
      current_password: data.current_password,
      new_password: data.password
    }
    changePasswordMutation.mutate(account, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        setIsChangePasswordVisible(false)
      },
      onError: (error) => {
        if (isAxiosBadRequest<ErrorResponse<{ current_password: string; new_password: string }>>(error)) {
          toast.error(error.response?.data.message)
        }
      }
    })
  })
  return (
    <div
      className={classNames(
        'absolute left-[70px] top-0 z-10 flex h-[100vh] w-[320px] min-w-[320px] flex-col bg-white shadow-md',
        {
          'slide-in': isChangePasswordVisible === true,
          'slide-out': isChangePasswordVisible === false,
          'tranform -translate-x-full': isChangePasswordVisible === null
        }
      )}
    >
      <div className='m-4 flex items-center'>
        <div className='flex items-center justify-center hover:cursor-pointer' onClick={toggleChangePasswordComponent}>
          <ArrowBackIosIcon sx={{ fontSize: '18px' }} />
        </div>
        <div className='ml-4 text-2xl font-semibold'>Thay đổi mật khẩu</div>
      </div>

      <form action='' onSubmit={onSubmit} className='mx-8 my-8'>
        <Input
          name='current_password'
          register={register}
          type='password'
          placeholder='Nhập mật khẩu hiện tại'
          labelName='Mật khẩu hiện tại'
          errorMessage={errors.current_password?.message}
        />
        <Input
          name='password'
          register={register}
          type='password'
          placeholder='Nhập mật khẩu mới'
          labelName='Mật khẩu mới'
          errorMessage={errors.password?.message}
        />
        <Input
          name='confirm_password'
          register={register}
          type='password'
          placeholder='Nhập lại mật khẩu mới'
          labelName='Xác nhận mật khẩu mới'
          errorMessage={errors.confirm_password?.message}
        />

        <div className='mt-4 w-full'>
          <button className='w-full rounded-md bg-primary px-2 py-1 text-center text-lg uppercase text-white hover:border-secondary hover:bg-secondary'>
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  )
}
