const path = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  active_account: '/active_account',
  forget_password: '/forget_password',
  set_new_password: '/set_new_password/:id'
} as const

export default path
