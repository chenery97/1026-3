import React, { Component } from 'react'
import context from './context'

export default class Son extends Component {
  render() {
    return <context.Consumer>
      {data => <div>Son组件：{data}</div>}
    </context.Consumer>
  }
}
