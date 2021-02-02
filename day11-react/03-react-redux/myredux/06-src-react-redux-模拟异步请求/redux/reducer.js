import { INCREMENT, DECREMENT} from './constants'

export default function (state = { count: 0 }, action) {
  switch (action.type) {
    case INCREMENT: 
      return {
        ...state,
        count: state.count + action.data
      }
    case DECREMENT:
      return {
        ...state,
        count: state.count - action.data
      }
    default:
      return state
  }
}