import { ToastContainer } from 'react-toastify'
import useRouteElements from './useRouteElements'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { getAccessTokenFromLocalStorage } from './utils/auth'
import Overlay from './components/Overlay'
import { useState } from 'react'
import ViewImage from './components/ViewImage'
import { SocketProvider } from './contexts/socket.context'

function App() {
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false)
  const [isViewImageVisible, setIsViewImageVisible] = useState<boolean>(false)
  const routeElements = useRouteElements({
    setIsOverlayVisible: setIsOverlayVisible,
    setIsViewImageVisible: setIsViewImageVisible
  })
  return (
    <SocketProvider
      // url={`wss://bkconnect.azurewebsites.net/websocket/ws?accessToken=`}
      url={`wss://localhost:7012/websocket/ws?accessToken=`}
      accessToken={getAccessTokenFromLocalStorage()}
    >
      <div>
        {isOverlayVisible && <Overlay setIsOverlayVisible={setIsOverlayVisible} />}
        {isViewImageVisible && <ViewImage setIsViewImageVisible={setIsViewImageVisible} />}
        {routeElements}
        <ToastContainer />
      </div>
    </SocketProvider>
  )
}

export default App
