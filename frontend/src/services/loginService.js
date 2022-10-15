import http from './axios/http'

export const loginService = {
  login(credentials) {
    return http.post('/api/login', credentials)
  },
}
