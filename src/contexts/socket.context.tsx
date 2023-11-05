/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useRef, useEffect } from 'react'
import { SocketData } from 'src/types/socket.type'

interface SocketContextInterface {
  // socket: WebSocket | null
  // setSocket: React.Dispatch<React.SetStateAction<WebSocket | null>>
  // socketRef: React.MutableRefObject<WebSocket | null>
  // socketData: SocketData | null
  // setSocketData: React.Dispatch<React.SetStateAction<SocketData | null>>
  socket: WebSocket | null
  data: any
}

const initialSocketContext: SocketContextInterface = {
  // socket: null,
  // setSocket: () => null,
  // socketRef:
  // socketData: null,
  // setSocketData: () => null
  socket: null,
  data: null
}

export const SocketContext = createContext<SocketContextInterface>(initialSocketContext)

export const SocketProvider = ({ url, children }: { url: string; children: React.ReactNode }) => {
  // const [socket, setSocket] = useState<WebSocket | null>(initialSocketContext.socket)
  // const [socketData, setSocketData] = useState<SocketData | null>(initialSocketContext.socketData)
  // return (
  //   <SocketContext.Provider
  //     value={{
  //       socket,
  //       setSocket,
  //       socketData,
  //       setSocketData
  //     }}
  //   >
  //     {children}
  //   </SocketContext.Provider>
  // )
  const socketRef = useRef<WebSocket | null>(null)
  const [socketData, setSocketData] = useState<SocketData | null>(null)
  const reconnectCount = useRef<number>(0)
  const maxReconnectAttempts = 5 // Số lần tái kết nối tối đa
  const reconnectInterval = 3000 // Thời gian giữa các lần tái kết nối (ms)

  useEffect(() => {
    const connectSocket = () => {
      socketRef.current = new WebSocket(url)
      console.log(socketRef)

      // Xử lý khi mở kết nối
      socketRef.current.onopen = (event) => {
        console.log('WebSocket connected:', event)
        reconnectCount.current = 0
      }

      // Xử lý khi nhận được dữ liệu từ máy chủ
      socketRef.current.onmessage = (event) => {
        const receivedData = JSON.parse(event.data)
        setSocketData(receivedData)
      }

      // Xử lý khi có lỗi kết nối
      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      // Xử lý khi đóng kết nối
      socketRef.current.onclose = (event) => {
        console.log('WebSocket closed:', event)
        if (reconnectCount.current < maxReconnectAttempts) {
          // Thử kết nối lại sau một khoảng thời gian
          setTimeout(() => {
            reconnectCount.current++
            connectSocket()
          }, reconnectInterval)
        } else {
          console.error('WebSocket reconnect attempts exceeded.')
        }
      }
    }

    connectSocket()

    return () => {
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [url])
  return (
    <SocketContext.Provider value={{ socket: socketRef.current, data: socketData }}>{children}</SocketContext.Provider>
  )
}
