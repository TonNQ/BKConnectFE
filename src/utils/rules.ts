import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

// current_password: dùng cho đổi mật khẩu, password = new_password
type Rules = {
  [key in
    | 'email'
    | 'password'
    | 'confirm_password'
    | 'current_password'
    | 'name'
    | 'birthday'
    | 'class_id'
    | 'faculty_id'
    | 'gender']?: RegisterOptions
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
      value: 12,
      message: 'Độ dài tối thiểu là 12 kí tự'
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
  // name: {
  //   required: {
  //     value: true,
  //     message: 'Vui lòng nhập tên của bạn'
  //   },
  //   minLength: {
  //     value: 1,
  //     message: 'Tên của bạn phải có tối thiểu 1 kí tự'
  //   },
  //   maxLength: {
  //     value: 50,
  //     message: 'Tên của bạn chỉ có thể có tối đa 50 kí tự'
  //   }
  // },
  // birthday: {
  //   required: {
  //     value: true,
  //     message: 'Vui lòng chọn ngày sinh'
  //   },
  //   validate: (value) => {
  //     if (value > new Date()) return 'Thời gian không được sau thời gian hiện tại'
  //     return undefined
  //   }
  // }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(12, 'Độ dài tối thiểu là 12 kí tự')
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
    ),
  name: yup.string().required('Vui lòng nhập tên của bạn').max(50, 'Tên của bạn chỉ có thể có tối đa 50 kí tự'),
  birthday: yup
    .date()
    .transform((_, originalValue) => {
      if (originalValue) {
        const parsedDate = new Date(originalValue)
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate
        }
      }
      return null
    })
    .required('Vui lòng nhập ngày sinh hợp lệ')
    .min(new Date('1900-01-01'), 'Năm sinh phải lớn hơn hoặc bằng 1900')
    .max(new Date(), 'Ngày sinh không được sau thời gian hiện tại'),
  class_id: yup.number().notOneOf([0], 'Vui lòng chọn lớp').required('Vui lòng chọn lớp'),
  faculty_id: yup.string().notOneOf([''], 'Vui lòng chọn khoa').required('Vui lòng chọn khoa'),
  gender: yup.string().notOneOf([''], 'Vui lòng chọn giới tính').required('Vui lòng chọn giới tính')
})

export type Schema = yup.InferType<typeof schema>
