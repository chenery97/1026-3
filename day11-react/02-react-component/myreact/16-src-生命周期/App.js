import React from 'react'
import Son from './Son'

export default class App extends React.Component {
  state = {
    flag: true
  }
  handle = () => {
    this.setState({
      flag: !this.state.flag
    })
  }
  render() {
    return <div>
      <button type='button' onClick={this.handle}>App组件发布消息</button>
      {this.state.flag && <Son />}
    </div>
  }
}