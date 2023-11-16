import { FriendRequest } from 'src/types/friendRequest.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const friendRequestApi = {
  getListOfReceivedFriendRequests() {
    return http.get<SuccessResponse<FriendRequest[]>>('/friendRequests/getListOfRecievedFriendRequests')
  },
  removeFriendRequest(params: { SearchKey: string }) {
    return http.delete('/friendRequests/removeFriendRequest', { params })
  }
}

export { friendRequestApi }
