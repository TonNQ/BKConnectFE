/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import { Box, TextField, Button, Typography, Avatar, Grid, Paper } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'

interface Message {
  id: string
  text: string
  sender: string
}

const messagesExp: Message[] = []

interface User {
  id: number
  name: string
  online: boolean
}

const users: User[] = []

const ChatUI = () => {
  const [connection, setConnection] = useState<null | HubConnection>(null)
  const [input, setInput] = React.useState('')

  const [messages, setMessages] = React.useState<Message[]>(messagesExp)
  const [usersList, setUsersList] = useState<User[]>(users)
  const [userName, setName] = useState('Unknown')

  const handleSend = async () => {
    if (input.trim() !== '') {
      if (connection) await connection.send('SendMessage', userName, input)
      setInput('')
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(event.target.value)
  }

  const ketnoi = () => {
    const connect = new HubConnectionBuilder()
      .withUrl('https://bkconnect.azurewebsites.net/chatHub?name=' + userName, { withCredentials: false })
      .withAutomaticReconnect()
      .build()

    setConnection(connect)
  }

  const ngatketnoi = () => {
    if (connection) connection.stop()
  }

  React.useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('ReceiveMessage', (user, message) => {
            const mess: Message = {
              id: new Date().getTime().toString(),
              text: message,
              sender: user
            }
            setMessages((prev) => [...prev, mess])
          })
          connection.on('NotifyOnline', (user) => {
            console.log('on', user)
            const ex = usersList.find((u) => u.name === user)
            if (ex) {
              ex.online = true
              setUsersList(usersList)
            } else {
              const u: User = {
                id: messages.length + 1,
                name: user,
                online: true
              }
              setUsersList((prev) => [...prev, u])
            }
          })

          connection.on('NotifyOffline', (user) => {
            console.log('off', user)
            const ex = usersList.find((u) => u.name === user)
            if (ex) {
              ex.online = false
              setUsersList(usersList)
            }
          })
        })
        .catch((error) => console.log(error))
    }
  }, [connection])

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'grey.200'
      }}
    >
      <Box>
        <input type='text' value={userName} onChange={(e) => setName(e.target.value)} />
        <button onClick={ketnoi}>Ket noi</button>
        <button onClick={ngatketnoi}>Ngat Ket noi</button>
      </Box>

      <Box>
        <h1> List Friends </h1>
        <ul>
          {usersList.map((user) => (
            <li key={user.id} style={{ color: user.online ? 'green' : 'red' }}>
              {user.name}
            </li>
          ))}
        </ul>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <Message key={message.id} message={message} userName={userName} />
        ))}
      </Box>
      <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              size='small'
              fullWidth
              placeholder='Type a message'
              variant='outlined'
              value={input}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth color='primary' variant='contained' endIcon={<SendIcon />} onClick={handleSend}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const Message = ({ message, userName }: { message: Message; userName: string }) => {
  const isBot = message.sender !== userName
  console.log(message)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isBot ? 'row' : 'row-reverse',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ bgcolor: isBot ? 'primary.main' : 'secondary.main' }}>{isBot ? message.sender[0] : 'U'}</Avatar>
        <Paper
          variant='outlined'
          sx={{
            p: 2,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            backgroundColor: isBot ? 'primary.light' : 'secondary.light',
            borderRadius: isBot ? '20px 20px 20px 5px' : '20px 20px 5px 20px'
          }}
        >
          <Typography variant='body1'>{message.text}</Typography>
        </Paper>
      </Box>
    </Box>
  )
}

export default ChatUI
