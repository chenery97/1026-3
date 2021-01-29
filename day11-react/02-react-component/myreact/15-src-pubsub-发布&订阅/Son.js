import React, { Component } from 'react'
import Pubsub from 'pubsub-js'

export default class Son extends Component {
  state = {
    msg: ''
  }
  fn = (msg, data) => {
    console.log('Son组件接收数据：', data)
    this.setState({
      msg: data
    })
  }
  func = (msg, data) => {
    console.log('Son组件func接收数据', data)
  }
  componentDidMount() {
    console.log('组件挂载阶段')
    Pubsub.subscribe('sendMsg', this.fn)
  }
  offHandle = () => {
    Pubsub.unsubscribe(this.fn)
  }
  onHandle = () => {
    Pubsub.subscribe('sendMsg', this.func)
  }
  componentWillUnmount() {
    Pubsub.unsubscribe(this.func)
  }
  render() {
    return (
      <div>
        <span>{this.state.msg}</span>
        <button type='button' onClick={this.offHandle}>Son组件关闭订阅</button>
        <button type='button' onClick={this.onHandle}>Son组件开启订阅</button>
      </div>
    )
  }
}
