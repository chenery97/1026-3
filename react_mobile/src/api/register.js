import axios from 'axios'

function verifyPhone(phone) {
  return axios({
    url: '/regist/verify_phone',
    method: 'post',
    data: {
      phone
    }
  })
}

function verifyCode(phone, code) {
  return axios({
    url: '/regist/verify_code',
    method: 'post',
    data: {
      phone,
      code
    }
  })
}

function register(phone, password) {
  return axios({
    url: '/regist/user',
    method: 'post',
    data: {
      phone, password
    }
  })
}
export {
  verifyPhone,
  verifyCode,
  register
}