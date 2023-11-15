/* eslint-disable @typescript-eslint/no-explicit-any */
// import { createContext, useState, useRef, useEffect } from 'react'
// import { SocketData } from 'src/types/socket.type'
import { createContext, useState, useRef, useContext, useEffect } from 'react'
import { ReceiveSocketData, WebSocketDataType } from 'src/types/socket.type'
import { Message, RoomInfo, RoomType } from 'src/types/room.type'
import { AppContext } from './app.context'

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

interface Props {
  url: string
  accessToken: string
  children: React.ReactNode
}
interface SocketContextInterface {
  connectWs: () => void
  closeWs: () => void
  wsState: number
  wsRef: React.MutableRefObject<WebSocket | null>
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  room: RoomType | null
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>
  roomInfo: RoomInfo | null
  setRoomInfo: React.Dispatch<React.SetStateAction<RoomInfo | null>>
}

const initialSocketContext: SocketContextInterface = {
  connectWs: () => null,
  closeWs: () => null,
  wsState: 0,
  wsRef: { current: null },
  messages: [],
  setMessages: () => [],
  room: null,
  setRoom: () => null,
  roomInfo: null,
  setRoomInfo: () => null
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
  // const { profile, room, messages, setMessages } = useContext(AppContext)
  let messagesData: Message[] = []
  let roomData: RoomType | null = null
  let roomInfoData: RoomInfo | null = null
  useEffect(() => {
    // Clean up the WebSocket connection on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  // start web socket connection in this function
  const connectWs = () => {
    setWsState(BaseConfig.webSocketState.CONNECTING)

    wsRef.current = new WebSocket(url + accessToken)

    wsRef.current.onopen = () => {
      console.log('socket open')
      setWsState(BaseConfig.webSocketState.OPEN)
    }

    wsRef.current.onmessage = async (e) => {
      const receiveMsg: ReceiveSocketData = JSON.parse(e.data)
      switch (receiveMsg.data_type) {
        case WebSocketDataType.IsMessage: {
          await new Promise<void>((resolve) => {
            setRoom((prevRoom) => {
              roomData = prevRoom
              resolve() // Gọi resolve để tiếp tục sau khi setRoom hoàn thành
              return prevRoom
            })
          })
          setMessages((prevMessages) => {
            if (receiveMsg.message.room_id !== roomData?.id) return prevMessages
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
          })
          break
        }
        default: {
        }
      }
      // setMessages((prevMessages) => {
      //   switch (receiveMsg.data_type) {
      //     case WebSocketDataType.IsMessage: {
      //       setRoom((prevRoom) => {
      //         console.log('prevRoom: ', prevRoom)
      //         return prevRoom
      //       })
      //       console.log(roomData)
      //       if (receiveMsg.message.room_id === roomData?.id) return prevMessages
      //       if (receiveMsg.message.sender_id !== profile?.user_id) {
      //         // Sử dụng prevMessages để đảm bảo rằng bạn đang cập nhật trên trạng thái mới nhất
      //         return [receiveMsg.message, ...prevMessages]
      //       } else {
      //         const indexToUpdate = prevMessages.findIndex(
      //           (message) => message.message_id === 0 && message.temp_id === receiveMsg.message.temp_id
      //         )
      //         if (indexToUpdate !== -1) {
      //           const updatedMessages = [
      //             ...prevMessages.slice(0, indexToUpdate),
      //             receiveMsg.message,
      //             ...prevMessages.slice(indexToUpdate + 1)
      //           ]
      //           return updatedMessages
      //         } else {
      //           return prevMessages
      //         }
      //       }
      //     }
      //     default: {
      //     }
      //   }
      //   // When unchanging state, return current state
      //   return prevMessages
      // })
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
