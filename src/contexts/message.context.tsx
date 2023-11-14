import { createContext, useState } from 'react'
import { Message, RoomInfo, RoomType } from 'src/types/room.type'

interface MessageContextInterface {
  // messages: Message[]
  // setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  room: RoomType | null
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>
  roomInfo: RoomInfo | null
  setRoomInfo: React.Dispatch<React.SetStateAction<RoomInfo | null>>
}

const initialMessageContext: MessageContextInterface = {
  // messages: [],
  // setMessages: () => [],
  room: null,
  setRoom: () => null,
  roomInfo: null,
  setRoomInfo: () => null
}

export const MessageContext = createContext<MessageContextInterface>(initialMessageContext)

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  // const [messages, setMessages] = useState<Message[]>(initialMessageContext.messages)
  const [room, setRoom] = useState<RoomType | null>(initialMessageContext.room)
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(initialMessageContext.roomInfo)
  return (
    <MessageContext.Provider
      value={{
        // messages,
        // setMessages,
        room,
        setRoom,
        roomInfo,
        setRoomInfo
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
