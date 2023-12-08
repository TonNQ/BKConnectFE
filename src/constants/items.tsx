import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import MessageIcon from '@mui/icons-material/Message'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined'
import ClassIcon from '@mui/icons-material/Class'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

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
