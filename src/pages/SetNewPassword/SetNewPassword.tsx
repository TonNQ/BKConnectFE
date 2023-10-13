import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import path from 'src/constants/path'
import { omit } from 'lodash'
import PageNotFound from '../PageNotFound'

type FormData = Pick<Schema, 'password' | 'confirm_password'>
const formSchema = schema.pick(['password', 'confirm_password'])
type setNewPasswordData = FormData & { temporaryCode: string | null }

function getSecretHashFromURL() {
  const currentURL = window.location.href
  const key = '?secretHash='
  const lastIndex = currentURL.lastIndexOf(key)
  if (lastIndex !== -1) {
    return currentURL.substring(lastIndex + key.length)
  }
  return null
}

export default function SetNewPassword() {
  const navigate = useNavigate()
  const [checkedToken, setCheckedToken] = useState<boolean>(true)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(formSchema)
  })
  useEffect(
    () =>
      checkTokenMutation.mutate(getSecretHashFromURL() as string, {
        onError: () => {
          setCheckedToken(false)
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const forgetPasswordMutation = useMutation({
    mutationFn: (body: Omit<setNewPasswordData, 'confirm_password'>) => authApi.setNewPassword(body)
  })
  const checkTokenMutation = useMutation({
    mutationFn: (token: string) => authApi.checkToken(token)
  })
  const onSubmit = handleSubmit((data) => {
    const reqData = { ...omit(data, ['confirm_password']), temporaryCode: getSecretHashFromURL() }
    forgetPasswordMutation.mutate(reqData, {
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
      {checkedToken && (
        <>
          <div className='text-center text-2xl font-bold uppercase text-primary'>Đổi mật khẩu mới</div>
          <form className='flex flex-col' action='' onSubmit={onSubmit}>
            <Input
              name='password'
              register={register}
              type='password'
              placeholder='Nhập mật khẩu mới của bạn'
              errorMessage={errors.password?.message}
              className='mt-1'
              classNameLabel='text-md mt-1 font-semibold'
              classNameInput='mt-1 w-[300px] rounded-md px-4 py-2'
              classNameError='mt-1 text-sm min-h-[1.25rem] font-medium text-red-400'
              labelName='Nhập mật khẩu mới'
            />
            <Input
              name='confirm_password'
              register={register}
              type='password'
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
      )}
      {!checkedToken && <PageNotFound />}
    </>
  )
}
