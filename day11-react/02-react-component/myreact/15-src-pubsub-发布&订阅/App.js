import React from 'react'
import Pubsub from 'pubsub-js'
import Son from './Son'

export default class App extends React.Component {
  handle = () => {
    Pubsub.publish('sendMsg', 'hello pubsub')
  }
  render() {
    return <div>
      <button type='button' onClick={this.handle}>App组件发布消息</button>
      <Son />
    </div>
  }
}