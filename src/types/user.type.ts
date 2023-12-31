type Role = 'Student' | 'Teacher'

export interface User {
  user_id: string
  name: string
  email: string
  gender: boolean
  birthday: string
  class_id: number
  class_name: string
  faculty_id: string
  faculty_name: string
  role: Role
  active: boolean
  avatar: string
}

export interface UpdatedUser {
  user_id: string
  name: string
  gender: boolean
  birthday: string
  class_id: number
  faculty_id: string
  avatar: string
}

export interface SearchFriend {
  user_id: string
  name: string
  class_name: string
  avatar: string
  friend_time: string
  isFriend: boolean
}

export interface SearchUser {
  user_id: string
  name: string
  class_name: string
  avatar: string
  is_friend: boolean
  sender_friend_request: string | null
}

// Gộp SearchUser và SearchFriend, chỉ lấy những thông tin cần thiết cho việc thêm vào nhóm
export interface SimpleUser {
  user_id: string
  name: string
  avatar: string
}

export interface MemberOfRoom {
  id: string
  name: string
  avatar: string
  is_admin: boolean
}

export interface Faculty {
  faculty_id: string
  faculty_name: string
}

export interface Class {
  class_id: number
  class_name: string
  faculty_id: string
  faculty_name: string
}
