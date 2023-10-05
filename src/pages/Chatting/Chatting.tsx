import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { clearLocalStorage } from 'src/utils/auth'

export default function Chatting() {
  const { setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    setIsAuthenticated(false)
    setProfile(null)
    clearLocalStorage()
    navigate(path.login)
  }
  return (
    <div>
      Chatting {profile?.email}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
