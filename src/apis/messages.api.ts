import { Message } from 'src/types/room.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const messageApi = {
  getMessagesByRoom(params: { SearchKey: number }) {
    return http.get<SuccessResponse<Message[]>>('/messages/getAllMessages', { params })
  },
  getAllImageMessages(params: { SearchKey: number }) {
    return http.get<SuccessResponse<Message[]>>('/messages/getAllImageMessages', { params })
  },
  getAllFileMessages(params: { SearchKey: number }) {
    return http.get<SuccessResponse<Message[]>>('/messages/getAllFileMessages', { params })
  }
}

export default messageApi
