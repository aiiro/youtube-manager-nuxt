export default ({$axios, app}) => {
  $axios.onRequest(config => {
    const token = app.$cookies.get('jwt_token');
    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`
    }
  })
}