import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardComponent } from 'src/constants/items'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { clearLocalStorage, getAccessTokenFromLocalStorage } from 'src/utils/auth'

export default function Chatting() {
  const { setIsAuthenticated, setProfile, profile, isAuthenticated } = useContext(AppContext)
  const { indexPage } = useContext(AppContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    setIsAuthenticated(false)
    setProfile(null)
    clearLocalStorage()
    navigate(path.login)
  }
  console.log(isAuthenticated)
  console.log(profile)
  console.log(Boolean(getAccessTokenFromLocalStorage()))
  return (
    <>
      {DashboardComponent.map((element) => {
        if (element.index === indexPage) {
          return element.component
        }
      })}
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
