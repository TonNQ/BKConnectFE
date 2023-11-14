/* eslint-disable @typescript-eslint/no-explicit-any */
// import { createContext, useState, useRef, useEffect } from 'react'
// import { SocketData } from 'src/types/socket.type'
import { createContext, useState, useRef, useContext } from 'react'
import { ReceiveSocketData, WebSocketDataType } from 'src/types/socket.type'
import { Message, RoomInfo, RoomType } from 'src/types/room.type'
import { AppContext } from './app.context'

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
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  wsRef: React.MutableRefObject<WebSocket | null>
  room: RoomType | null
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>
  roomInfo: RoomInfo | null
  setRoomInfo: React.Dispatch<React.SetStateAction<RoomInfo | null>>
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
  messages: [],
  setMessages: () => [],
  wsRef: { current: null },
  room: null,
  setRoom: () => null,
  roomInfo: null,
  setRoomInfo: () => null
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
  const [wsState, setWsState] = useState<number>(BaseConfig.webSocketState.NOTCONNECTED)
  const [messages, setMessages] = useState<Message[]>(initialSocketContext.messages)
  const [room, setRoom] = useState<RoomType | null>(initialSocketContext.room)
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(initialSocketContext.roomInfo)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectCount = useRef<number>(0)
  const maxReconnectAttempts = 5 // Số lần tái kết nối tối đa
  const reconnectInterval = 3000 // Thời gian giữa các lần tái kết nối (ms)
  const { profile } = useContext(AppContext)
  // start web socket connection in this function
  const connectWs = () => {
    setWsState(BaseConfig.webSocketState.CONNECTING)

    wsRef.current = new WebSocket(url + accessToken)

    wsRef.current.onopen = () => {
      console.log('socket open')
      setWsState(BaseConfig.webSocketState.OPEN)
    }

    wsRef.current.onmessage = (e) => {
      const receiveMsg: ReceiveSocketData = JSON.parse(e.data)
      setMessages((prevMessages) => {
        switch (receiveMsg.data_type) {
          case WebSocketDataType.IsMessage: {
            if (receiveMsg.message.sender_id !== profile?.user_id) {
              // Sử dụng prevMessages để đảm bảo rằng bạn đang cập nhật trên trạng thái mới nhất
              return [receiveMsg.message, ...prevMessages]
            } else {
              const indexToUpdate = prevMessages.findIndex(
                (message) => message.message_id === 0 && message.temp_id === receiveMsg.message.temp_id
              )
              if (indexToUpdate !== -1) {
                const updatedMessages = [
                  ...prevMessages.slice(0, indexToUpdate),
                  receiveMsg.message,
                  ...prevMessages.slice(indexToUpdate + 1)
                ]
                return updatedMessages
              } else {
                return prevMessages
              }
            }
          }
          default: {
          }
        }
        // Nếu không thay đổi state, trả về state hiện tại
        return prevMessages
      })
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
  return (
    <SocketContext.Provider
      value={{ connectWs, closeWs, wsState, wsRef, messages, setMessages, room, setRoom, roomInfo, setRoomInfo }}
    >
      {children}
    </SocketContext.Provider>
  )
}
