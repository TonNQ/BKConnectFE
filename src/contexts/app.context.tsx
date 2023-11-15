import { createContext, useState } from 'react'
import { Message, RoomInfo, RoomType } from 'src/types/room.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLocalStorage, getProfileFromLocalStorage } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  indexPage: number
  setIndexPage: React.Dispatch<React.SetStateAction<number>>
  isProfileVisible: boolean | null
  setIsProfileVisible: React.Dispatch<React.SetStateAction<boolean | null>>
  isChangePasswordVisible: boolean | null
  setIsChangePasswordVisible: React.Dispatch<React.SetStateAction<boolean | null>>
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  room: RoomType | null
  setRoom: React.Dispatch<React.SetStateAction<RoomType | null>>
  roomInfo: RoomInfo | null
  setRoomInfo: React.Dispatch<React.SetStateAction<RoomInfo | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLocalStorage(),
  setProfile: () => null,
  indexPage: 0,
  setIndexPage: () => null,
  isProfileVisible: null,
  setIsProfileVisible: () => null,
  isChangePasswordVisible: null,
  setIsChangePasswordVisible: () => null,
  messages: [],
  setMessages: () => [],
  room: null,
  setRoom: () => null,
  roomInfo: null,
  setRoomInfo: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [indexPage, setIndexPage] = useState<number>(initialAppContext.indexPage)
  const [isProfileVisible, setIsProfileVisible] = useState<boolean | null>(initialAppContext.isProfileVisible)
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState<boolean | null>(
    initialAppContext.isChangePasswordVisible
  )
  const [messages, setMessages] = useState<Message[]>(initialAppContext.messages)
  const [room, setRoom] = useState<RoomType | null>(initialAppContext.room)
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(initialAppContext.roomInfo)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        indexPage,
        setIndexPage,
        isProfileVisible,
        setIsProfileVisible,
        isChangePasswordVisible,
        setIsChangePasswordVisible,
        messages,
        setMessages,
        room,
        setRoom,
        roomInfo,
        setRoomInfo
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
