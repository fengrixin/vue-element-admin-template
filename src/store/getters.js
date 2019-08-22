const getters = {
  routers: state => state.permission.routers,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  role: state => state.user.role,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
