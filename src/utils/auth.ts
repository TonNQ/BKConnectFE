import authApi from 'src/apis/auth.api'
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

export const refreshToken = async () => {
  try {
    const response = await authApi.getToken()
    console.log(response)
    const { access_token } = response.data.data.access_token
    setAccessTokenToLocalStorage(access_token)
  } catch (error) {
    console.log(error)
  }
}
