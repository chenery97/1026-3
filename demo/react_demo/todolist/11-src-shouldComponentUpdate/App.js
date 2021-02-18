import React, { Component } from 'react'
import Son from './Son'

export default class App extends Component {
  state = {
    num: 0
  }
  changeNum() {
    const num = Math.floor(Math.random() * 3 + 1)
    return num
  }
  handle = () => {
    this.setState({
      num: this.changeNum()
    })
  }
  shouldComponentUpdate(props, state) {
    // this.state、this.props原来的
    // state、props最新的
    console.log('shouldComponentUpdate>>>', props, state)
    return this.state.num !== state.num
  }
  render() {
    console.log('App组件更新了')
    return (
      <div>
        <div>App组件：{this.state.num}</div>
        <button onClick={this.handle}>更新num</button>
        <Son ></Son>
      </div>
    )
  }
}
