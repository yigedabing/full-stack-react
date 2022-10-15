import axios from 'axios'

let token = ''
export const setToken = () => {
  const loggedUserJSON = localStorage.getItem('loggedNoteappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = `bearer ${user.token}`
  }
}
setToken()

const http = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  timeout: 60000,
})

// 拦截器
http.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {}
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    console.log(error)
    return { ...error }
  }
)
http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const { code, data, msg } = error.response.data
    return {
      code: code || error.response.status,
      data: data || null,
      msg: msg || error.response.data.error,
    }
  }
)

export default http
