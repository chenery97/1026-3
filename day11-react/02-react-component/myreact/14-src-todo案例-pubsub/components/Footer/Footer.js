import React from 'react'
import './Footer.css'

export default class Footer extends React.Component {
  render() {
    const { tasks, completeCount, changeAllCheckStatus, delAllCompleteTasks} = this.props
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={completeCount === tasks.length} onChange={changeAllCheckStatus} />
        </label>
        <span>
          <span>已完成{completeCount}</span> / 全部{tasks.length}
        </span>
        <button className="btn btn-danger" onClick={delAllCompleteTasks} >清除已完成任务</button>
      </div>
    )
  }
}