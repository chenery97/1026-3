import { Component } from 'react'
import context from '../../context'
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
  keyUpHandle = (addTodo) => (e) => {
    const todoName = this.state.todoName
    if (e.keyCode === 13 && todoName) {
      addTodo(todoName)
      this.setState({
        todoName: ''
      })
    }
  }
  render() {
    return (
      <context.Consumer>
        {data => (
          <div className="todo-header" >
            <input
              type="text"
              placeholder="请输入你的任务名称，按回车键确认"
              value={this.state.todoName}
              onChange={this.handle}
              onKeyUp={this.keyUpHandle(data.addTodo)}
            />
          </div>
        )}
      </context.Consumer>
    )
  }
}