import axios from 'axios'
import { GET_USER_DATA, SET_FLAG } from './contants'

function getUserData(data) {
  return {
    type: GET_USER_DATA,
    data
  }
}

function getUserDataAsync(username) {
  return dispatch => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/search/users',
      params: {
        username
      }
    }).then(value => dispatch(getUserData((value.data.items))))
  }
}
function setFlag(flag) {
  return {
    type: SET_FLAG,
    flag
  }
}
export {
  getUserData,
  getUserDataAsync,
  setFlag
}