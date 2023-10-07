import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from 'src/utils/rules'
import RegisterInput from 'src/components/RegisterInput'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'password' | 'confirm_password'>
const formSchema = schema.pick(['password', 'confirm_password'])

export default function SetNewPassword() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(formSchema)
  })
  const forgetPasswordMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => {
      const newData = { ...body, secretHash: id }
      console.log(newData)
      return authApi.setNewPassword(newData)
    }
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    forgetPasswordMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success(data.data.message, {
          autoClose: 3000
        })
        setTimeout(() => {
          navigate(path.login)
        }, 3000)
      },
      onError: () => {
        console.log(errors)
      }
    })
  })
  return (
    <>
      <div className='text-center text-2xl font-bold uppercase text-primary'>Đổi mật khẩu mới</div>
      <form className='flex flex-col' action='' onSubmit={onSubmit}>
        <RegisterInput
          name='password'
          register={register}
          type='text'
          placeholder='Nhập mật khẩu mới của bạn'
          errorMessage={errors.password?.message}
          className='mt-1'
          classNameLabel='text-md mt-1 font-semibold'
          classNameInput='mt-1 w-[300px] rounded-md px-4 py-2'
          classNameError='mt-1 text-sm min-h-[1.25rem] font-medium text-red-400'
          labelName='Nhập mật khẩu mới'
        />
        <RegisterInput
          name='confirm_password'
          register={register}
          type='text'
          placeholder='Xác nhận mật khẩu mới của bạn'
          errorMessage={errors.confirm_password?.message}
          className='mt-0'
          classNameLabel='text-md mt-1 font-semibold'
          classNameInput='mt-1 w-[300px] rounded-md px-4 py-2'
          classNameError='mt-1 text-sm min-h-[1.25rem] font-medium text-red-400'
          labelName='Xác nhận mật khẩu mới'
        />
        <div className='mt-4 text-center'>
          <button className='rounded-md bg-primary px-10 py-1 text-center text-lg uppercase text-white hover:border-secondary hover:bg-secondary hover:text-white'>
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </>
  )
}
