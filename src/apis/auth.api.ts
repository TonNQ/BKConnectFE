import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const authApi = {
  register(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/register', body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/login', body)
  },
  logout() {
    return http.post('/logout')
  },
  forgetPassword(body: { email: string }) {
    return http.post('/forgotPassword', body)
  },
  setNewPassword(body: { password: string; secretHash: string | undefined }) {
    return http.post('/setNewPassword', body)
  }
}

export default authApi
