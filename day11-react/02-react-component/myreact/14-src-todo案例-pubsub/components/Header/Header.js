import React from 'react'
import Pubsub from 'pubsub-js'
import './Header.css'

export default class Header extends React.Component {
  state = {
    taskName: ''
  }
  handle = (e) => {
    this.setState({
      taskName: e.target.value.trim()
    })
  }
  keyUpHandle = (e) => {
    if (e.keyCode === 13 && this.state.taskName !== '') {
      Pubsub.publish('add', this.state.taskName)
      this.setState({
        taskName: ''
      })
    }
  }
  render() {
    return (
      <div className="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认"
          value={this.state.taskName}
          onChange={this.handle}
          onKeyUp={this.keyUpHandle}
        />
      </div>
    )
  }
}