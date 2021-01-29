import React from 'react'
import './Footer.css'

export default class Footer extends React.Component {
  render() {
    const {
      tasks,
      deleteComplete,
      getAllCheckStatus,
      allStatus
    } = this.props
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={allStatus} onChange={getAllCheckStatus} />
        </label>
        <span>
          <span>已完成{tasks.reduce((prev, item) => {
            prev = item.isDone ? ++prev : prev
            return prev
          }, 0)}</span> / 全部{tasks.length}
        </span>
        <button className="btn btn-danger" onClick={deleteComplete} >清除已完成任务</button>
      </div>
    )
  }
}