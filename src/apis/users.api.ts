import { RoomType } from 'src/types/room.type'
import { Class, Faculty, SearchFriend, SearchUser, User, UpdatedUser } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const userApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('/users/getProfile')
  },
  updateProfile(body: UpdatedUser) {
    return http.put<SuccessResponse<User>>('/users/updateProfile', body)
  },
  changePassword(body: { current_password: string; new_password: string }) {
    return http.put<SuccessResponse<string>>('/users/changePassword', body)
  },
  getAllRooms() {
    return http.get<SuccessResponse<RoomType[]>>('/rooms/getRoomsOfUser')
  },
  getRoomsByName(params: { searchKey: string }) {
    return http.get<SuccessResponse<RoomType[]>>('/rooms/searchRoomsOfUser', { params })
  },
  getAllFriends() {
    return http.get<SuccessResponse<SearchFriend[]>>('/relationships/getFriends')
  },
  searchFriends(params: { SearchKey: string }) {
    return http.get<SuccessResponse<SearchFriend[]>>('/relationships/searchFriends', {
      params
    })
  },
  searchUsers(params: { searchKey: string; pageIndex: number }) {
    return http.get<SuccessResponse<SearchUser[]>>('/users/searchUsers', {
      params
    })
  },
  getAllClasses() {
    return http.get<SuccessResponse<Class[]>>('/classes/getAllClasses')
  },
  getAllFaculties() {
    return http.get<SuccessResponse<Faculty[]>>('/faculties/getAllFaculties')
  }
}

export default userApi
