import axios from 'axios'

export const refreshToken = async () => {
  return axios.post('/api/users/refresh', {}, { withCredentials: true })
}

export default { refreshToken }
