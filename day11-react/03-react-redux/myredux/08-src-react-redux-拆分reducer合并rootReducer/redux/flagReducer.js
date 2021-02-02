import { SET_FLAG } from './contants'
const initState = {flag: 'all'}
export default function flagReducer(state = initState, action) {
  switch (action.type) {
    case SET_FLAG:
      return {
        ...state,
        flag: action.flag
      }
    default:
      return state
  }
}