import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import RegisterInput from 'src/components/RegisterInput'
import path from 'src/constants/path'
import { Schema, schema } from 'src/utils/rules'
import authApi from 'src/apis/auth.api'
import { useMutation } from '@tanstack/react-query'
import { isAxiosBadRequest } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        console.log(data.data.data)
        setProfile(data.data.data.user)
        navigate(path.home)
      },
      onError: (error) => {
        console.log(errors)
        if (isAxiosBadRequest<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data
          toast.error(formError?.message)
        }
      }
    })
  })
  return (
    <>
      <div className='align-center mb-12 flex justify-between'>
        <div className='ml-5 text-3xl font-bold uppercase text-primary'>Đăng nhập</div>
        <Link to={path.register} className='mr-5 text-3xl font-bold uppercase text-slate-600 hover:text-primary'>
          Đăng ký
        </Link>
      </div>
      <form action='' onSubmit={onSubmit}>
        <RegisterInput
          name='email'
          register={register}
          type='text'
          placeholder='Nhập email của bạn'
          labelName='Email của bạn'
          errorMessage={errors.email?.message}
        />
        <RegisterInput
          name='password'
          register={register}
          type='password'
          placeholder='Nhập mật khẩu của bạn'
          labelName='Mật khẩu của bạn'
          errorMessage={errors.password?.message}
        />
        <div className='mt-2 '>
          <Link to='' className='text-sm font-medium text-primary hover:text-secondary'>
            Quên mật khẩu?
          </Link>
        </div>

        <div className='mt-4 w-full'>
          <button className='w-full rounded-md bg-primary px-2 py-2 text-center text-lg uppercase text-white hover:border-secondary hover:bg-secondary'>
            Đăng nhập
          </button>
        </div>
        <div className='mt-4 text-center'>
          <span>Bạn chưa có tài khoản?</span>
          <Link to={path.register} className='ml-2'>
            Đăng ký
          </Link>
        </div>
      </form>
    </>
  )
}
