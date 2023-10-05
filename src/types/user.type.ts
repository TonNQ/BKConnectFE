type Role = 'Student' | 'Teacher'

export interface User {
  user_id: string
  name: string
  email: string
  gender: boolean
  birthday: string
  class: string
  role: Role
  active: boolean
  avatar: string
}
