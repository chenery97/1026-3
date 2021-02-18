import { Component } from 'react'
import './Footer.css'
export default class Footer extends Component {
  render() {
    const { todos, changeAllDone, delCompleteTodos } = this.props
    const completeCount = todos.reduce((prev, item) => item.isDone ? ++prev : prev, 0)
    const allCount = todos.length
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={completeCount === allCount} onChange={changeAllDone} />
        </label>
        <span>
          <span>已完成{completeCount}</span> / 全部{allCount}
        </span>
        <button className="btn btn-danger" onClick={delCompleteTodos}>清除已完成任务</button>
      </div>
    )
  }
}