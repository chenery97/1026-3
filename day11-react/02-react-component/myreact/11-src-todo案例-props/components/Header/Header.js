import React from 'react'
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
    // 判断是按下回车键，并且输入框的值不为空
    if (e.keyCode === 13 && this.state.taskName !== '') {
      // 把新任务名传递给父组件
      this.props.getNewTask(this.state.taskName)
      // 把输入框的值重置
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