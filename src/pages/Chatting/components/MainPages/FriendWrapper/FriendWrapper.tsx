import { useState } from 'react'
import FriendList from './pages/FriendList'
import GroupList from './pages/GroupList'
import RequestList from './pages/RequestList'

export default function FriendWrapper() {
  // 0 = FriendList, 1 = GroupList, 2 = RequestList
  const [pageIndex, setPageIndex] = useState<number>(0)
  switch (pageIndex) {
    case 0:
      return <FriendList setPageIndex={setPageIndex} />
    case 1:
      return <GroupList setPageIndex={setPageIndex} />
    case 2:
      return <RequestList setPageIndex={setPageIndex} />
    default:
      return <FriendList setPageIndex={setPageIndex} />
  }
}
