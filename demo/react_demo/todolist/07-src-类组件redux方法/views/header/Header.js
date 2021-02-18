import { Component } from 'react'
import './Header.css'
export default class Header extends Component {
  state = {
    todoName: ''
  }
  handle = (e) => {
    this.setState({
      todoName: e.target.value.trim()
    })
  }
  keyUpHandle = (e) => {
    const todoName = this.state.todoName
    if (e.keyCode === 13 && todoName) {
      this.props.addTodo(todoName)
      this.setState({
        todoName: ''
      })
    } 
  }
  render() {
    return (
      <div className = "todo-header" >
        <input
          type="text"
          placeholder="请输入你的任务名称，按回车键确认"
          value={this.state.todoName}
          onChange={this.handle}
          onKeyUp={this.keyUpHandle}
        />
      </div>
    )
  }
}