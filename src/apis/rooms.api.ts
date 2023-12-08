import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { GroupRoom, RoomInfo, RoomType } from 'src/types/room.type'
import { MemberOfRoom } from 'src/types/user.type'

const roomApi = {
  getRoomOfUser(params: { SearchKey: string }) {
    return http.get<SuccessResponse<RoomInfo[]>>('/rooms/getRoomsOfUser', {
      params
    })
  },
  getRoomsByName(params: { searchKey: string }) {
    return http.get<SuccessResponse<RoomType[]>>('/rooms/searchRoomsOfUser', { params })
  },
  getInformationOfRoom(params: { SearchKey: number }) {
    return http.get<SuccessResponse<RoomInfo>>('/rooms/getInformationOfRoom', {
      params
    })
  },
  getListOfMembersInRoom(params: { SearchKey: number }) {
    return http.get<SuccessResponse<MemberOfRoom[]>>('/rooms/getListOfMembersInRoom', { params })
  },
  getListOfPublicRooms() {
    return http.get<SuccessResponse<GroupRoom[]>>('/rooms/getListOfPublicRooms')
  },
  searchListOfPublicRooms(params: { SearchKey: string }) {
    return http.get<SuccessResponse<GroupRoom[]>>('/rooms/searchListOfPublicRooms', {
      params
    })
  },
  removeUserFromRoom(body: { user_id: string; room_id: number }) {
    return http.post<SuccessResponse<string>>('/rooms/removeUserFromRoom', body)
  },
  leaveRoom(body: { user_id: string; room_id: number }) {
    return http.post<SuccessResponse<string>>('/rooms/leaveRoom', body)
  }
}

export default roomApi
