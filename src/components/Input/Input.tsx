import { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameLabel?: string
  classNameInput?: string
  classNameError?: string
  labelName?: string
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  className = 'mt-2',
  classNameLabel = 'text-md mt-2 font-semibold',
  classNameInput = 'mt-1 w-full border-b-2 border-black px-2 py-2 outline-none focus:bg-slate-50',
  classNameError = 'mt-2 text-sm min-h-[1.25rem] font-medium text-red-400',
  name,
  register,
  rules,
  labelName,
  errorMessage,
  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={className}>
      <div className={classNameLabel}>{labelName}</div>
      <input className={classNameInput} {...registerResult} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
