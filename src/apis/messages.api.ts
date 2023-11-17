import { Message } from 'src/types/room.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const messageApi = {
  getMessagesByRoom(params: { SearchKey: number }) {
    return http.get<SuccessResponse<Message[]>>('/messages/getAllMessages', { params })
  }
}

export default messageApi
