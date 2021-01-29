import React, { Component } from 'react'
import Pubsub from 'pubsub-js'

export default class Son extends Component {
  constructor() {
    super()
    console.log('constructor执行>>>>')
  }
  state = {
    msg: ''
  }
  componentDidMount() {
    console.log('componentDidMount挂载完成阶段>>>>')
  }
  handle = (e) => {
    Pubsub.publish('sendMsg', 'hello pubsub')
    this.setState({
      msg: e.target.value
    })
    console.log('状态更新>>>>')
  }
  componentDidUpdate() {
    console.log('componentDidUpdate更新阶段>>>>')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount即将卸载阶段>>>>')
  }
  render() {
    console.log('render>>>>>')
    return (
      <div>
        <button type='button' onClick={this.handle}>{this.state.msg || '按钮'}</button>
      </div>
    )
  }
}