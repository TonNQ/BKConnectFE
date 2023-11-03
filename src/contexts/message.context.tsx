import { createContext, useState } from 'react'
import { Message, RoomType } from 'src/types/room.type'

interface MessageContextInterface {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  room: RoomType | null
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>
}

const initialMessageContext: MessageContextInterface = {
  messages: [],
  setMessages: () => [],
  room: null,
  setRoom: () => null
}

export const MessageContext = createContext<MessageContextInterface>(initialMessageContext)

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessageContext.messages)
  const [room, setRoom] = useState<RoomType | null>(initialMessageContext.room)
  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        room,
        setRoom
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
