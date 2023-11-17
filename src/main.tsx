import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './contexts/app.context.tsx'
import { SocketProvider } from './contexts/socket.context.tsx'
import { getAccessTokenFromLocalStorage } from './utils/auth.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <SocketProvider
          // url={`wss://bkconnect.azurewebsites.net/websocket/ws?accessToken=`}
          url={`wss://localhost:7012/websocket/ws?accessToken=`}
          accessToken={getAccessTokenFromLocalStorage()}
        >
          <App />
        </SocketProvider>
      </AppProvider>
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
)
