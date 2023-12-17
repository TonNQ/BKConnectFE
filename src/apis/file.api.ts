import { FileInClass } from 'src/types/file.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const fileApi = {
  getAllFiles(params: { SearchKey: number }) {
    return http.get<SuccessResponse<FileInClass[]>>('/files/getAllFiles', { params })
  },
  addFileInClass(body: { path: string; room_id: number }) {
    return http.post('/files/addFileInClass', body)
  }
}

export default fileApi
