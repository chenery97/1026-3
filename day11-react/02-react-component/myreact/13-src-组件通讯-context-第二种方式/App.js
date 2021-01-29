import React, { Component } from 'react'
import Far from './Far'
import context from './context'

export default class App extends Component {
  state = {
    msg: '爷爷好'
  }
  render() {
    return (
      <context.Provider value={this.state.msg}>
        App组件：
        <Far />
      </context.Provider>
    )
  }
}