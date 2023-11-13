import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { RoomInfo, RoomType } from 'src/types/room.type'

const roomApi = {
  getAllRooms() {
    return http.get<SuccessResponse<RoomType[]>>('/rooms/getRoomsOfUser')
  },
  getRoomsByName(params: { searchKey: string }) {
    return http.get<SuccessResponse<RoomType[]>>('/rooms/searchRoomsOfUser', { params })
  },
  getInformationOfRoom(params: { SearchKey: number }) {
    return http.get<SuccessResponse<RoomInfo>>('/rooms/getInformationOfRoom', {
      params
    })
  }
}

export default roomApi
