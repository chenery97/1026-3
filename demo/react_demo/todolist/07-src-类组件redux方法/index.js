import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/stroe'
import App from './containers/App'

ReactDOM.render(<Provider store={store}><App></App></Provider>, document.getElementById('root'))