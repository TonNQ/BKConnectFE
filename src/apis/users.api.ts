import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const profileApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('/users/getProfile')
  },
  changePassword(body: { current_password: string; new_password: string }) {
    return http.put<SuccessResponse<string>>('/users/changePassword', body)
  }
}

export default profileApi
