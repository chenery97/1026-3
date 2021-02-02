import { combineReducers } from 'redux'
import flagReducer from './flagReducer'
import userReducer from './userReducer'

export default combineReducers({
  flagReducer,
  userReducer
})