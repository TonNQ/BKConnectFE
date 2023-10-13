import { createContext, useState } from 'react'
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
  setIsChangePasswordVisible: () => null
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
        setIsChangePasswordVisible
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
