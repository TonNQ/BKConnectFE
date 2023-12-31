import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import MessageIcon from '@mui/icons-material/Message'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
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
    title: 'Thông báo',
    icon: <NotificationsNoneIcon sx={{ color: 'white', fontSize: '30px' }} />,
    onlySideComponent: true,
    toggleComponent: 'notification'
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
    title: 'Thông báo',
    icon: <NotificationsNoneIcon sx={{ color: 'white', fontSize: '30px' }} />
  }
]
