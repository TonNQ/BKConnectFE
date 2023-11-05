import { useContext } from 'react'
import { SocketContext } from 'src/contexts/socket.context'

export const useSocket = () => {
  return useContext(SocketContext)
}

// const useSocket = (url: string, access_token: string) => {
//   const { setSocketData } = useContext(SocketContext)
//   const [socket, setSocket] = useState<WebSocket | null>(null)
//   const reconnectCount = useRef<number>(0)
//   const maxReconnectAttempts = 5 // Số lần tái kết nối tối đa
//   const reconnectInterval = 3000 // Thời gian giữa các lần tái kết nối (ms)

//   const connectSocket = () => {
//     const newSocket = new WebSocket(url)

//     newSocket.onopen = (event) => {
//       console.log('WebSocket connected:', event)
//       setSocket(newSocket)
//       const onlineMessage = {
//         user_id: getProfileFromLocalStorage()?.user_id,
//         data_type: WebSocketDataType.IsOnline,
//         message: null,
//         friend_request: null
//       }
//       newSocket.send(JSON.stringify(onlineMessage))
//       reconnectCount.current = 0
//     }

//     newSocket.onmessage = (event) => {
//       console.log('WebSocket message received:', event.data)
//       setSocketData(event.data)
//     }

//     newSocket.onerror = (error) => {
//       console.error('WebSocket error:', error)
//     }

//     newSocket.onclose = (event) => {
//       console.log('WebSocket closed:', event)
//       if (reconnectCount.current < maxReconnectAttempts) {
//         // Thử kết nối lại sau một khoảng thời gian
//         setTimeout(() => {
//           reconnectCount.current++
//           connectSocket()
//         }, reconnectInterval)
//       } else {
//         console.error('WebSocket reconnect attempts exceeded.')
//         // Tải lại trang sau khi vượt quá số lần tái kết nối
//         window.location.reload()
//       }
//     }
//   }

//   useEffect(() => {
//     connectSocket()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [url, access_token])

//   return socket
// }

// export default useSocket
