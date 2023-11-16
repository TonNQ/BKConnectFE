import { FriendRequest } from 'src/types/friendRequest.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const friendRequestApi = {
  getListOfReceivedFriendRequests() {
    return http.get<SuccessResponse<FriendRequest[]>>('/friendRequests/getListOfReceivedFriendRequests')
  },
  removeFriendRequest(params: { SearchKey: string }) {
    return http.delete('/friendRequests/removeFriendRequest', { params })
  },
  searchListOfReceivedFriendRequests(params: { SearchKey: string }) {
    return http.get('/friendRequests/searchListOfReceivedFriendRequests', {
      params
    })
  }
}

export { friendRequestApi }
