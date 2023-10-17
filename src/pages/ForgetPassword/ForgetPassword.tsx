import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import { isAxiosBadRequest } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'

type FormData = Pick<Schema, 'email'>
const emailSchema = schema.pick(['email'])

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(emailSchema)
  })
  const forgetPasswordMutation = useMutation({
    mutationFn: (body: FormData) => authApi.forgetPassword(body)
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    forgetPasswordMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        toast.success(data.data.message)
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
      <div className='text-center text-2xl font-bold uppercase text-primary'>Quên mật khẩu</div>
      <div className='text-center'>Vui lòng nhập email của bạn vào ô bên dưới</div>
      <form className='flex flex-col' action='' onSubmit={onSubmit}>
        <Input
          name='email'
          register={register}
          type='text'
          placeholder='Nhập email của bạn'
          errorMessage={errors.email?.message}
          classNameInput='my-1 w-[300px] rounded-md px-4 py-2'
          classNameError='mt-2 text-sm font-medium text-red-400'
          classNameLabel='hidden'
        />
        <div className='mt-4 text-center'>
          <button className='rounded-md bg-primary px-10 py-1 text-center text-lg uppercase text-white hover:border-secondary hover:bg-secondary hover:text-white'>
            Xác nhận
          </button>
        </div>
      </form>
    </>
  )
}
