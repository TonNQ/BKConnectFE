import { User } from 'src/types/user.type'

// Lấy access token từ local storage
export const setAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

// Xóa access token khỏi local storage
export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
}

// Lấy access token từ local storage
export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token') || ''
}

export const getProfileFromLocalStorage = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLocalStorage = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
