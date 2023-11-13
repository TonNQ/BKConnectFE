/* eslint-disable @typescript-eslint/no-explicit-any */
// import { createContext, useState, useRef, useEffect } from 'react'
// import { SocketData } from 'src/types/socket.type'
import { createContext, useState, useRef } from 'react'

// interface SocketContextInterface {
//   // socket: WebSocket | null
//   // setSocket: React.Dispatch<React.SetStateAction<WebSocket | null>>
//   // socketRef: React.MutableRefObject<WebSocket | null>
//   // socketData: SocketData | null
//   // setSocketData: React.Dispatch<React.SetStateAction<SocketData | null>>
//   socket: WebSocket | null
//   data: any
// }

interface SocketContextInterface {
  connectWs: () => void
  closeWs: () => void
  wsState: number
  message: any[]
}

interface Props {
  url: string
  accessToken: string
  children: React.ReactNode
}

// const initialSocketContext: SocketContextInterface = {
//   // socket: null,
//   // setSocket: () => null,
//   // socketRef:
//   // socketData: null,
//   // setSocketData: () => null
//   socket: null,
//   data: null
// }
const initialSocketContext: SocketContextInterface = {
  connectWs: () => null,
  closeWs: () => null,
  wsState: 0,
  message: []
}

const BaseConfig = {
  // socket has four state
  webSocketState: {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
    NOTCONNECTED: 4 // I've added this so we can use it to understand that the connection hasn't started yet.
  }
}

export const SocketContext = createContext<SocketContextInterface>(initialSocketContext)

export const SocketProvider = ({ url, accessToken, children }: Props) => {
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
  // const socketRef = useRef<WebSocket | null>(null)
  // const [socketData, setSocketData] = useState<SocketData | null>(null)
  // const reconnectCount = useRef<number>(0)
  // const maxReconnectAttempts = 5 // Số lần tái kết nối tối đa
  // const reconnectInterval = 3000 // Thời gian giữa các lần tái kết nối (ms)

  // useEffect(() => {
  //   socketRef.current = new WebSocket(url + accessToken)
  //   console.log(socketRef)

  //   // Xử lý khi mở kết nối
  //   socketRef.current.onopen = (event) => {
  //     console.log('WebSocket connected:', event)
  //     reconnectCount.current = 0
  //   }

  //   // Xử lý khi nhận được dữ liệu từ máy chủ
  //   socketRef.current.onmessage = (event) => {
  //     console.log('WebSocket message:', event.data)
  //     const receivedData = JSON.parse(event.data)
  //     setSocketData(receivedData)
  //   }

  //   // Xử lý khi có lỗi kết nối
  //   socketRef.current.onerror = (error) => {
  //     console.error('WebSocket error:', error)
  //   }

  //   // Xử lý khi đóng kết nối
  //   socketRef.current.onclose = (event) => {
  //     console.log('WebSocket closed:', event)
  //     if (event.code === 1000) {
  //       // Mã lỗi 1000 thường là mã đóng chuẩn, có thể là do máy khách đóng
  //       console.log('Kết nối đã được đóng bởi máy khách:', event.reason)
  //     } else {
  //       // Mã lỗi khác có thể là do máy chủ đóng
  //       console.log('Kết nối đã được đóng bởi máy chủ:', event.reason)
  //     }
  //     // if (reconnectCount.current < maxReconnectAttempts) {
  //     //   // Thử kết nối lại sau một khoảng thời gian
  //     //   setTimeout(() => {
  //     //     reconnectCount.current++
  //     //     connectSocket()
  //     //   }, reconnectInterval)
  //     // } else {
  //     //   console.error('WebSocket reconnect attempts exceeded.')
  //     // }
  //   }

  //   // return () => {
  //   //   if (socketRef.current) {
  //   //     socketRef.current.close()
  //   //   }
  //   // }
  // }, [])
  const [wsState, setWsState] = useState<number>(BaseConfig.webSocketState.NOTCONNECTED)
  const [message, setMessages] = useState<any>([])
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectCount = useRef<number>(0)
  const maxReconnectAttempts = 5 // Số lần tái kết nối tối đa
  const reconnectInterval = 3000 // Thời gian giữa các lần tái kết nối (ms)

  // start web socket connection in this function
  const connectWs = () => {
    setWsState(BaseConfig.webSocketState.CONNECTING)

    wsRef.current = new WebSocket(url + accessToken)

    wsRef.current.onopen = () => {
      console.log('socket open')
      setWsState(BaseConfig.webSocketState.OPEN)
    }

    wsRef.current.onmessage = (e) => {
      console.log('message')
      console.log(e.data)
      setMessages(JSON.parse(e.data))
    }

    wsRef.current.onclose = () => {
      console.log('socket closed by server')
      setWsState(BaseConfig.webSocketState.CLOSED)
      if (reconnectCount.current < maxReconnectAttempts) {
        // Thử kết nối lại sau một khoảng thời gian
        setTimeout(() => {
          reconnectCount.current++
          connectWs()
        }, reconnectInterval)
      } else {
        console.error('WebSocket reconnect attempts exceeded.')
      }
    }
  }

  const closeWs = () => {
    if (wsRef.current) wsRef.current.close()
    console.log('socket closed by client')
    setWsState(BaseConfig.webSocketState.CLOSED)
  }
  return <SocketContext.Provider value={{ connectWs, closeWs, wsState, message }}>{children}</SocketContext.Provider>
}
