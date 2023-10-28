import { createContext, useState } from 'react'

interface ProfileContextInterface {
  isUpdatePage: boolean
  setIsUpdatePage: React.Dispatch<React.SetStateAction<boolean>>
}

const initialProfileContext: ProfileContextInterface = {
  isUpdatePage: false,
  setIsUpdatePage: () => null
}

export const ProfileContext = createContext<ProfileContextInterface>(initialProfileContext)

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUpdatePage, setIsUpdatePage] = useState<boolean>(initialProfileContext.isUpdatePage)
  return (
    <ProfileContext.Provider
      value={{
        isUpdatePage,
        setIsUpdatePage
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}
