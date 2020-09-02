import axios from 'axios';

const serverUrl = 'https://immense-wave-33493.herokuapp.com';

export const api = axios.create({
    baseURL: `${serverUrl}/api`,
})

export const createUser = payload => api.post('/user/register', payload)
export const loginUser = payload => {
  return api.post('/user/login', payload)
}

export const getAllUsers = () => api.get('/users')
