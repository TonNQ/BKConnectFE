import { getDownloadURL, ref } from 'firebase/storage'
import storage from './firebase'

export const getUrl = async (root: string, name: string) => {
  try {
    const fileRef = ref(storage, `${root}/${name}`)
    // Lấy URL của ảnh
    const url = await getDownloadURL(fileRef)
    return url
  } catch (error) {
    console.error('Error fetching URL:', error)
  }
}

// export const getUrlString = (root: string, name: string) => {
//   try {
//     let url: string = ''
//     getUrl(root, name)
//       .then((responseUrl) => {
//         console.log(responseUrl)
//         url = responseUrl as string
//         return url
//       })
//       .catch(() => {
//         console.error('Error: getUrlString')
//       })
//       .finally(() => {
//         return url
//       })
//     console.log(url)
//   } catch (error) {
//     console.error('Error fetching URL:', error)
//     throw error // Re-throw lỗi để bên ngoài có thể xử lý
//   }
// }
