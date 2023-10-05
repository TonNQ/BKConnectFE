import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const authApi = {
  register(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/authentications/register', body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/login', body)
  },
  logout() {
    return http.post('/logout')
  }
}

export default authApi
