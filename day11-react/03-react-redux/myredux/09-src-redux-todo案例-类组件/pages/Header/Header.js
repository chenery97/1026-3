import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {
  state = {
    data: ''
  }
  handle = (e) => {
    this.setState({
      data: e.target.value.trim()
    })
  }
  keyUpHandle = (e) => {
    const todoName = this.state.data
    if (todoName && e.keyCode === 13) {
      this.props.addTodo(todoName)
      this.setState({
        data: ''
      })
    }
  }
  render() {
    // console.log(this.props)
    return (
      <div>
        <div className="todo-header">
          <input
            type="text"
            placeholder="请输入你的任务名称，按回车键确认"
            value={this.state.data}
            onChange={this.handle}
            onKeyUp={this.keyUpHandle}
          />
        </div>
      </div>
    )
  }
}
