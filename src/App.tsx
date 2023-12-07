import { ToastContainer } from 'react-toastify'
import useRouteElements from './useRouteElements'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { getAccessTokenFromLocalStorage } from './utils/auth'
import { SocketProvider } from './contexts/socket.context'

function App() {
  const routeElements = useRouteElements()
  return (
    <SocketProvider
      // url={`wss://bkconnect.azurewebsites.net/websocket/ws?accessToken=`}
      url={`wss://localhost:7012/websocket/ws?accessToken=`}
      accessToken={getAccessTokenFromLocalStorage()}
    >
      <div>
        {routeElements}
        <ToastContainer />
      </div>
    </SocketProvider>
  )
}

export default App
