import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import Count from './containers/countContainer'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <h1>App组件</h1>
        <Count></Count>
      </Provider>
    )
  }
}
