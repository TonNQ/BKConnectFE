/* eslint-disable @typescript-eslint/no-explicit-any */
// import { createContext, useState, useRef, useEffect } from 'react'
// import { SocketData } from 'src/types/socket.type'
import React, { createContext, useState, useRef, useContext, useEffect } from 'react'
import { ReceiveSocketData, WebSocketDataType } from 'src/types/socket.type'
import { Message, RoomInfo, RoomType } from 'src/types/room.type'
import { AppContext } from './app.context'
import { Notification, NotificationType } from 'src/types/notification.type'
import { convertToDateTimeServer, getDateTimeNow } from 'src/utils/utils'
import { MemberOfRoom } from 'src/types/user.type'
import { toast } from 'react-toastify'
import messageApi from 'src/apis/messages.api'
import roomApi from 'src/apis/rooms.api'

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
  roomList: RoomInfo[] | null
  setRoomList: React.Dispatch<React.SetStateAction<RoomInfo[] | null>>
  room: RoomType | null
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>
  roomInfo: RoomInfo | null
  setRoomInfo: React.Dispatch<React.SetStateAction<RoomInfo | null>>
  addMemberToRoomId: number | null
  setAddMemberToRoomId: React.Dispatch<React.SetStateAction<number | null>>
  notifications: Notification[]
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
  members: MemberOfRoom[]
  setMembers: React.Dispatch<React.SetStateAction<MemberOfRoom[]>>
  selectedImage: string | null
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  files: string[]
  setFiles: React.Dispatch<React.SetStateAction<string[]>>
  documents: string[]
  setDocuments: React.Dispatch<React.SetStateAction<string[]>>
}

const initialSocketContext: SocketContextInterface = {
  connectWs: () => null,
  closeWs: () => null,
  wsState: 0,
  wsRef: { current: null },
  messages: [],
  setMessages: () => [],
  roomList: null,
  setRoomList: () => null,
  room: null,
  setRoom: () => null,
  roomInfo: null,
  setRoomInfo: () => null,
  addMemberToRoomId: null,
  setAddMemberToRoomId: () => null,
  notifications: [],
  setNotifications: () => [],
  members: [],
  setMembers: () => [],
  selectedImage: null,
  setSelectedImage: () => null,
  images: [],
  setImages: () => [],
  files: [],
  setFiles: () => [],
  documents: [],
  setDocuments: () => []
}

export const SocketContext = createContext<SocketContextInterface>(initialSocketContext)

export const SocketProvider = ({ url, accessToken, children }: Props) => {
  const [wsState, setWsState] = useState<number>(BaseConfig.webSocketState.NOTCONNECTED)
  const [messages, setMessages] = useState<Message[]>(initialSocketContext.messages)
  // roomList: danh sách room của người dùng
  const [roomList, setRoomList] = useState<RoomInfo[] | null>(initialSocketContext.roomList)
  // room: room đang chọn
  const [room, setRoom] = useState<RoomType | null>(initialSocketContext.room)
  // roomInfo: thông tin của room mà user đang xem
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(initialSocketContext.roomInfo)
  // roomId xác định có phải là add new group hay add members to group
  const [addMemberToRoomId, setAddMemberToRoomId] = useState<number | null>(initialSocketContext.addMemberToRoomId)
  const [notifications, setNotifications] = useState<Notification[]>(initialSocketContext.notifications)
  const [members, setMembers] = useState<MemberOfRoom[]>(initialSocketContext.members)
  // Lưu url của ảnh cần zoom (view image)
  const [selectedImage, setSelectedImage] = useState<string | null>(initialSocketContext.selectedImage)
  // Images list of room
  const [images, setImages] = useState<string[]>(initialSocketContext.images)
  // Files list of room
  const [files, setFiles] = useState<string[]>(initialSocketContext.files)
  // Files list in class room (documents)
  const [documents, setDocuments] = useState<string[]>(initialSocketContext.documents)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectCount = useRef<number>(0)
  const maxReconnectAttempts = 20 // Số lần tái kết nối tối đa
  const reconnectInterval = 3000 // Thời gian giữa các lần tái kết nối (ms)
  const { profile } = useContext(AppContext)
  // const { profile, room, messages, setMessages } = useContext(AppContext)
  // let messagesData: Message[] = []
  let roomData: RoomType | null = null
  // let roomInfoData: RoomInfo | null = null
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
            if (receiveMsg.message.sender_id !== profile?.user_id || receiveMsg.message.message_type === 'System') {
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
          setRoomList((prevRoomList) => {
            if (prevRoomList === null) return null
            let indexOfChangedRoom = -1
            // new_last_message để cho BE xử lý bằng cách gửi thêm trường last_message qua socket
            prevRoomList = prevRoomList?.map((roomItem, index) => {
              if (receiveMsg.message.room_id === roomItem.id) {
                indexOfChangedRoom = index
                const newRoom: RoomInfo = {
                  ...roomItem,
                  last_message: receiveMsg.message.last_message,
                  last_message_time: receiveMsg.message.send_time
                }
                return newRoom
              } else {
                return roomItem
              }
            })
            if (indexOfChangedRoom !== -1) {
              const newRoomList = [
                prevRoomList[indexOfChangedRoom],
                ...prevRoomList.slice(0, indexOfChangedRoom),
                ...prevRoomList.slice(indexOfChangedRoom + 1)
              ]
              return newRoomList
            } else {
              return prevRoomList
            }
          })
          break
        }
        case WebSocketDataType.IsNotification: {
          if (receiveMsg.notification.notification_type === NotificationType.IsOutRoom) {
            setRoomList((prevRoomList) => {
              if (prevRoomList === null) return null
              return prevRoomList?.filter((r) => r.id !== receiveMsg.notification.room_message?.room_id)
            })
            setRoomInfo((prevRoomInfo) => {
              if (prevRoomInfo?.id === receiveMsg.notification.room_message?.room_id) {
                setMessages([])
                setMembers([])
                return null
              } else {
                return prevRoomInfo
              }
            })
          } else if (receiveMsg.notification.notification_type === NotificationType.IsPostFile)
            setNotifications((prevNotifications) => {
              return [receiveMsg.notification, ...prevNotifications]
            })
          setDocuments((prevDocuments) => {
            return [receiveMsg.notification.post_file?.file_name as string, ...prevDocuments]
          })
          break
        }
        case WebSocketDataType.IsOnline: {
          setRoomInfo((prevRoomInfo) => {
            if (prevRoomInfo?.friend_id === receiveMsg.user_id) {
              return {
                ...prevRoomInfo,
                is_online: true
              }
            } else {
              return prevRoomInfo
            }
          })
          setRoomList((prevRoomList) => {
            if (prevRoomList === null) return null
            return prevRoomList?.map((room) => {
              if (room.friend_id === receiveMsg.user_id) {
                return {
                  ...room,
                  is_online: true
                }
              } else {
                return room
              }
            })
          })
          break
        }
        case WebSocketDataType.IsOffline: {
          setRoomInfo((prevRoomInfo) => {
            if (prevRoomInfo?.friend_id === receiveMsg.user_id) {
              return {
                ...prevRoomInfo,
                is_online: false,
                last_online: getDateTimeNow()
              }
            } else {
              return prevRoomInfo
            }
          })
          setRoomList((prevRoomList) => {
            if (prevRoomList === null) return prevRoomList
            return prevRoomList?.map((room) => {
              if (room.friend_id === receiveMsg.user_id) {
                return {
                  ...room,
                  is_online: false,
                  last_online: convertToDateTimeServer(new Date())
                }
              } else {
                return room
              }
            })
          })
          break
        }
        case WebSocketDataType.IsChangedRoomInfo: {
          setRoomInfo((prevRoomInfo) => {
            if (receiveMsg.changed_room_info.room_id === prevRoomInfo?.id) {
              setMembers((prevMembers) => {
                if (receiveMsg.changed_room_info.left_member_id !== null) {
                  return prevMembers.filter((m) => m.id !== receiveMsg.changed_room_info.left_member_id)
                } else if (receiveMsg.changed_room_info.new_member_list !== null) {
                  return [...prevMembers, ...(receiveMsg.changed_room_info.new_member_list as MemberOfRoom[])]
                } else {
                  return prevMembers
                }
              })
            }
            if (prevRoomInfo === null) return null
            else {
              return {
                ...prevRoomInfo,
                total_member: receiveMsg.changed_room_info.total_member
              }
            }
          })
          break
        }
        case WebSocketDataType.IsCreateGroupRoom: {
          setRoomList((prevRoomList) => {
            if (prevRoomList === null) return prevRoomList
            return [receiveMsg.room_info, ...prevRoomList]
          })
          if (receiveMsg.user_id === profile?.user_id) {
            setRoomInfo(receiveMsg.room_info)
            // Get all messages of new group
            const fetchMessages = async () => {
              try {
                const response = await messageApi.getMessagesByRoom({ SearchKey: receiveMsg.room_info.id })
                const newMessages = response.data.data
                setMessages(newMessages)
              } catch (error: any) {
                const typedError: Error = error as Error
                toast.error(typedError.message)
              }
            }
            // Get all members of new group
            const fetchMembers = async () => {
              try {
                const response = await roomApi.getListOfMembersInRoom({ SearchKey: receiveMsg.room_info.id })
                const newMemberList = response.data.data
                setMembers(newMemberList)
              } catch (error: any) {
                const typedError: Error = error as Error
                toast.error(typedError.message)
              }
            }
            fetchMessages()
            fetchMembers()
          }
          break
        }
        default: {
          break
        }
      }
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
      value={{
        connectWs,
        closeWs,
        wsState,
        wsRef,
        messages,
        setMessages,
        roomList,
        setRoomList,
        room,
        setRoom,
        roomInfo,
        setRoomInfo,
        addMemberToRoomId,
        setAddMemberToRoomId,
        notifications,
        setNotifications,
        members,
        setMembers,
        selectedImage,
        setSelectedImage,
        images,
        setImages,
        files,
        setFiles,
        documents,
        setDocuments
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
