import { ToastContainer } from 'react-toastify'
import useRouteElements from './useRouteElements'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { getAccessTokenFromLocalStorage } from './utils/auth'
import { SocketProvider } from './contexts/socket.context'
import Overlay from './components/Overlay'
import { useState } from 'react'

function App() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const routeElements = useRouteElements({ setIsOverlayVisible: setIsOverlayVisible })
  return (
    <SocketProvider
      // url={`wss://bkconnect.azurewebsites.net/websocket/ws?accessToken=`}
      url={`wss://localhost:7012/websocket/ws?accessToken=`}
      accessToken={getAccessTokenFromLocalStorage()}
    >
      <div>
        {isOverlayVisible && <Overlay setIsOverlayVisible={setIsOverlayVisible} />}
        {routeElements}
        <ToastContainer />
      </div>
    </SocketProvider>
  )
}

export default App
