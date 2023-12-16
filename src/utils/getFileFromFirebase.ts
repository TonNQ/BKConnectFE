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
