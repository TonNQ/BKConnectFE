import http from 'src/utils/http'
import { SearchFriend } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'

const relationshipApi = {
  getAllFriends() {
    return http.get<SuccessResponse<SearchFriend[]>>('/relationships/getFriends')
  },
  searchFriends(params: { SearchKey: string }) {
    return http.get<SuccessResponse<SearchFriend[]>>('/relationships/searchFriends', {
      params
    })
  },
  unfriend(params: { SearchKey: string }) {
    return http.delete('/relationships/unfriend', {
      params
    })
  }
}

export { relationshipApi }
