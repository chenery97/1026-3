import { Component } from 'react'
import pubsub from 'pubsub-js'
import './Footer.css'
export default class Footer extends Component {
  handle = (e) => {
    pubsub.publish('changeAllDone', e.target.checked)
  }
  delCompleteTodosHandle = () => {
    pubsub.publish('delCompleteTodos')
  }
  render() {
    const {todos} = this.props
    const allCount = todos.length
    const completeCount = todos.reduce((prev, item) => item.isDone ? ++prev : prev, 0)
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={completeCount === allCount} onChange={this.handle} />
        </label>
        <span>
          <span>已完成{completeCount}</span> / 全部{allCount}
        </span>
        <button className="btn btn-danger" onClick={this.delCompleteTodosHandle} >清除已完成任务</button>
      </div>
    )
  }
}