import React, { Component } from 'react'
import context from './context'

export default class Son extends Component {
  static contextType = context
  render() {
    return <div>Son组件：{this.context}</div>
  }
}
