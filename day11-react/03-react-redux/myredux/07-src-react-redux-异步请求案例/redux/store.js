import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './reducer'

const env = process.env.NODE_ENV
export default createStore(userReducer, env === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk))