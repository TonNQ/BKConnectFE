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
    return http.post<AuthResponse>('/logout')
  },
  forgetPassword(body: { email: string }) {
    return http.post('/forgotPassword', body)
  },
  setNewPassword(body: { password: string; temporaryCode: string | null }) {
    return http.post('/resetPassword', body)
  },
  checkToken(seretHash: string) {
    return http.post('/checkToken?secretHash=' + seretHash)
  }
}

export default authApi
