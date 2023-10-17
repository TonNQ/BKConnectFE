import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import MessageIcon from '@mui/icons-material/Message'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined'
import ClassIcon from '@mui/icons-material/Class'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import MessagePage from 'src/pages/Chatting/pages/MainPages/MessagePage'
import ClassPage from 'src/pages/Chatting/pages/MainPages/ClassPage'
import SettingPage from 'src/pages/Chatting/pages/MainPages/SettingPage'
import FriendList from 'src/pages/Chatting/pages/SidePages/FriendList'
import RoomList from 'src/pages/Chatting/pages/SidePages/RoomList'
import ClassList from 'src/pages/Chatting/pages/SidePages/ClassList'
import FriendPage from 'src/pages/Chatting/pages/MainPages/FriendPage/FriendPage'
import Profile from 'src/pages/Chatting/pages/SidePages/Profile'

export const DashboardOutlinedIcon = [
  {
    index: 0,
    title: 'Tin nhắn',
    icon: <MessageOutlinedIcon sx={{ color: 'white', fontSize: '30px' }} />
  },
  {
    index: 1,
    title: 'Danh sách bạn bè',
    icon: <PeopleAltOutlinedIcon sx={{ color: 'white', fontSize: '30px' }} />
  },
  {
    index: 2,
    title: 'Lớp học',
    icon: <ClassOutlinedIcon sx={{ color: 'white', fontSize: '30px' }} />
  },
  {
    index: 3,
    title: 'Cài đặt',
    icon: <SettingsOutlinedIcon sx={{ color: 'white', fontSize: '30px' }} />
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
    sideComponent: <RoomList />,
    mainComponent: <MessagePage />
  },
  {
    index: 1,
    sideComponent: <FriendList />,
    mainComponent: <FriendPage />
  },
  {
    index: 2,
    sideComponent: <ClassList />,
    mainComponent: <ClassPage />
  },
  {
    index: 3,
    sideComponent: <Profile />,
    mainComponent: <SettingPage />
  }
]

export const data = [
  {
    facultyId: 1,
    facultyName: 'CNTT',
    classes: [
      {
        classId: 1,
        className: '21T_DT'
      },
      {
        classId: 2,
        className: '21T_DT2'
      },
      {
        classId: 3,
        className: '21TCLC_DT2'
      }
    ]
  },
  {
    facultyId: 2,
    facultyName: 'Điện',
    classes: [
      {
        classId: 4,
        className: '20DT'
      },
      {
        classId: 5,
        className: '21DT'
      },
      {
        classId: 6,
        className: '22DT'
      }
    ]
  }
]