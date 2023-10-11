import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import MessageIcon from '@mui/icons-material/Message'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined'
import ClassIcon from '@mui/icons-material/Class'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import MessagePage from 'src/pages/Chatting/pages/MessagePage'
import FriendLists from 'src/pages/Chatting/pages/FriendLists'
import ClassPage from 'src/pages/Chatting/pages/ClassPage'
import SettingPage from 'src/pages/Chatting/pages/SettingPage'

export const DashboardOutlinedIcon = [
  {
    index: 0,
    title: 'Tin nhắn',
    icon: <MessageOutlinedIcon sx={{ color: 'white', fontSize: '30px', fontWeight: '400' }} />
  },
  {
    index: 1,
    title: 'Danh sách bạn bè',
    icon: <PeopleAltOutlinedIcon sx={{ color: 'white', fontSize: '30px', fontWeight: '400' }} />
  },
  {
    index: 2,
    title: 'Lớp học',
    icon: <ClassOutlinedIcon sx={{ color: 'white', fontSize: '30px', fontWeight: '400' }} />
  },
  {
    index: 3,
    title: 'Cài đặt',
    icon: <SettingsOutlinedIcon sx={{ color: 'white', fontSize: '30px', fontWeight: '400' }} />
  }
]

export const DashboardFilledIcon = [
  {
    index: 0,
    title: 'Tin nhắn',
    icon: <MessageIcon sx={{ color: 'white', fontSize: '30px', fontWeight: '400' }} />
  },
  {
    index: 1,
    title: 'Danh sách bạn bè',
    icon: <PeopleAltIcon sx={{ color: 'white', fontSize: '30px', fontWeight: '400' }} />
  },
  {
    index: 2,
    title: 'Lớp học',
    icon: <ClassIcon sx={{ color: 'white', fontSize: '30px', fontWeight: '400' }} />
  },
  {
    index: 3,
    title: 'Cài đặt',
    icon: <SettingsIcon sx={{ color: 'white', fontSize: '30px', fontWeight: '400' }} />
  }
]

export const DashboardComponent = [
  {
    index: 0,
    component: <MessagePage />
  },
  {
    index: 1,
    component: <FriendLists />
  },
  {
    index: 2,
    component: <ClassPage />
  },
  {
    index: 3,
    component: <SettingPage />
  }
]
