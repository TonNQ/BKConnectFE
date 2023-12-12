import { getDownloadURL, ref } from 'firebase/storage'
import storage from './firebase'

export const getImageUrl = async (imageName: string) => {
  try {
    const fileRef = ref(storage, `Message_Image/${imageName}`)
    // Lấy URL của ảnh
    const url = await getDownloadURL(fileRef)
    return url
  } catch (error) {
    console.error('Error fetching image URL:', error)
  }
}
