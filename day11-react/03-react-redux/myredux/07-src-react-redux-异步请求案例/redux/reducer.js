import { GET_USER_DATA, SET_FLAG } from './contants'
const initState = {users: [], flag: 'all'}
export default function userReducer(state = initState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        users: action.data
      }
    case SET_FLAG:
      return {
        ...state,
        flag: action.flag
      }
    default:
      return state
  }
}