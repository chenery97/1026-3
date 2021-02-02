import { GET_USER_DATA} from './contants'
const initState = {users: []}
export default function userReducer(state = initState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        users: action.data
      }
    default:
      return state
  }
}