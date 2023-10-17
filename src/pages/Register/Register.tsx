import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { Schema, schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosBadRequest } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { toast } from 'react-toastify'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.register(body)
  })
  const onSubmit = handleSubmit((data) => {
    const account = omit(data, ['confirm_password'])
    registerMutation.mutate(account, {
      onSuccess: () => {
        navigate(path.active_account, { state: { email: account.email, password: account.password } })
      },
      onError: (error) => {
        if (isAxiosBadRequest<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data
          toast.error(formError?.message)
        }
      }
    })
  })
  return (
    <>
      <div className='align-center mb-12 flex justify-between'>
        <Link to={path.login} className='ml-5 text-3xl font-bold uppercase text-slate-600 hover:text-primary'>
          Đăng nhập
        </Link>
        <div className='mr-5 text-3xl font-bold uppercase text-primary'>Đăng ký</div>
      </div>
      <form action='' onSubmit={onSubmit}>
        <Input
          name='email'
          register={register}
          type='text'
          placeholder='Nhập email của bạn'
          labelName='Email của bạn'
          errorMessage={errors.email?.message}
        />
        <Input
          name='password'
          register={register}
          type='password'
          placeholder='Nhập mật khẩu của bạn'
          labelName='Mật khẩu của bạn'
          errorMessage={errors.password?.message}
        />
        <Input
          name='confirm_password'
          register={register}
          type='password'
          placeholder='Nhập lại mật khẩu của bạn'
          labelName='Nhập lại mật khẩu'
          errorMessage={errors.confirm_password?.message}
        />
        <div className='mt-4 w-full'>
          <button className='w-full rounded-md bg-primary px-2 py-2 text-center text-lg uppercase text-white hover:border-secondary hover:bg-secondary'>
            Đăng ký
          </button>
        </div>
        <div className='mt-4 text-center'>
          <span>Bạn đã có tài khoản?</span>
          <Link to={path.login} className='ml-2'>
            Đăng nhập
          </Link>
        </div>
      </form>
    </>
  )
}
