import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const backgroundJobsApi = {
  setReadMessageOfRoom(params: { message_id: number }) {
    return http.put<SuccessResponse<unknown>>('/backgroundjobs/setReadMessageOfRoom', params)
  }
}

export default backgroundJobsApi
