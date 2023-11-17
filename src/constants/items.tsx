import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import MessageIcon from '@mui/icons-material/Message'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined'
import ClassIcon from '@mui/icons-material/Class'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ClassPage from 'src/pages/Chatting/components/MainPages/ClassPage'
import SettingPage from 'src/pages/Chatting/components/MainPages/SettingPage'
import RoomList from 'src/pages/Chatting/components/SidePages/RoomList'
import ClassList from 'src/pages/Chatting/components/SidePages/ClassList'
import MessageWrapper from 'src/pages/Chatting/components/MainPages/MessageWrapper/MessageWrapper'
import FriendWrapper from 'src/pages/Chatting/components/MainPages/FriendWrapper/FriendWrapper'
import SearchUsers from 'src/pages/Chatting/components/SidePages/SearchUsers'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Notification from 'src/pages/Chatting/components/SidePages/Notification/Notification'

export const DashboardOutlinedIcon = [
  {
    index: 0,
    title: 'Tin nhắn',
    icon: <MessageOutlinedIcon sx={{ color: 'white', fontSize: '30px' }} />,
    onlySideComponent: false
  },
  {
    index: 1,
    title: 'Danh sách bạn bè',
    icon: <PeopleAltOutlinedIcon sx={{ color: 'white', fontSize: '30px' }} />,
    onlySideComponent: false
  },
  {
    index: 2,
    title: 'Lớp học',
    icon: <ClassOutlinedIcon sx={{ color: 'white', fontSize: '30px' }} />,
    onlySideComponent: false
  },
  {
    index: 3,
    title: 'Thông báo',
    icon: <NotificationsNoneIcon sx={{ color: 'white', fontSize: '30px' }} />,
    onlySideComponent: true,
    toggleComponent: 'notification'
  },
  {
    index: 4,
    title: 'Cài đặt',
    icon: <SettingsOutlinedIcon sx={{ color: 'white', fontSize: '30px' }} />,
    onlySideComponent: true,
    toggleComponent: 'setting'
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
    title: 'Thông báo',
    icon: <NotificationsNoneIcon sx={{ color: 'white', fontSize: '30px' }} />
  },
  {
    index: 4,
    title: 'Cài đặt',
    icon: <SettingsOutlinedIcon sx={{ color: 'white', fontSize: '30px' }} />
  }
]

export const DashboardComponent = [
  {
    index: 0,
    sideComponent: <RoomList />,
    mainComponent: <MessageWrapper />,
  },
  {
    index: 1,
    sideComponent: <SearchUsers />,
    mainComponent: <FriendWrapper />,
  },
  {
    index: 2,
    sideComponent: <ClassList />,
    mainComponent: <ClassPage />,
  },
  {
    index: 3,
    sideComponent: <Notification />,
  },
  {
    index: 4,
    sideComponent: <SettingPage />,
  }
]
