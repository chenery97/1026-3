import axios from 'axios'

function sendCode(phone) {
  return axios({
    url: '/login/digits',
    method: 'post',
    data: {
      phone
    }
  })
}

function login(phone, code) {
  return axios({
    url: '/login/phone',
    method: 'post',
    data: {
      phone,
      code
    }
  })
}

export {
  sendCode,
  login
}