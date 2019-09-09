export default ({app, store}) => {
  const token = app.$cookies.get('jwt_token')
  if (token) {
    store.dispatch('setToken', token)
  }
}
