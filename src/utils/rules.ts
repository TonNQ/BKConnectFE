import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

// current_password: dùng cho đổi mật khẩu, password = new_password
type Rules = {
  [key in 'email' | 'password' | 'confirm_password' | 'current_password']?: RegisterOptions
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    minLength: {
      value: 20,
      message: 'Độ dài tối thiểu là 20 kí tự'
    },
    maxLength: {
      value: 30,
      message: 'Độ dài tối đa là 30 kí tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Mật khẩu là bắt buộc'
    },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message: 'Mật khẩu có ít nhất một kí tự chữ, một kí tự số và một kí tự đặc biệt'
    },
    minLength: {
      value: 8,
      message: 'Mật khẩu tối thiểu 8 kí tự'
    },
    maxLength: {
      value: 30,
      message: 'Mật khẩu tối đa 30 kí tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại mật khẩu là bắt buộc'
    },
    minLength: {
      value: 8,
      message: 'Mật khẩu tối thiểu 8 kí tự'
    },
    maxLength: {
      value: 30,
      message: 'Mật khẩu tối đa 30 kí tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại password không khớp'
        : undefined
  },
  current_password: {
    required: {
      value: true,
      message: 'Mật khẩu hiện tại là bắt buộc'
    },
    minLength: {
      value: 8,
      message: 'Mật khẩu tối thiểu 8 kí tự'
    },
    maxLength: {
      value: 30,
      message: 'Mật khẩu tối đa 30 kí tự'
    }
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(20, 'Độ dài tối thiểu là 20 kí tự')
    .max(30, 'Độ dài tối đa là 30 kí tự')
    .matches(/dut\.udn\.vn$/, 'Email phải có đuôi .dut.udn.vn'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(8, 'Mật khẩu tối thiểu 8 kí tự')
    .max(30, 'Mật khẩu tối đa 30 kí tự')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Mật khẩu có ít nhất một kí tự chữ, một kí tự số và một kí tự đặc biệt'
    ),
  confirm_password: yup
    .string()
    .required('Nhập lại mật khẩu là bắt buộc')
    .min(8, 'Mật khẩu tối thiểu 8 kí tự')
    .max(30, 'Mật khẩu tối đa 30 kí tự')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không đúng'),
  current_password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(8, 'Mật khẩu tối thiểu 8 kí tự')
    .max(30, 'Mật khẩu tối đa 30 kí tự')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Mật khẩu có ít nhất một kí tự chữ, một kí tự số và một kí tự đặc biệt'
    )
})

export type Schema = yup.InferType<typeof schema>
