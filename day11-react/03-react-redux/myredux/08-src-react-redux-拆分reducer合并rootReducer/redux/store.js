import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'

const env = process.env.NODE_ENV
export default createStore(rootReducer, env === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk))