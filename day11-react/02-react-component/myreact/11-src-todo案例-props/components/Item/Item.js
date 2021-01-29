import React from 'react'
import './Item.css'

export default class Item extends React.Component{
  render() {
    const { task, getTaskStatus ,deleteTask } = this.props
    return (
      <li>
        <label>
          <input type="checkbox" checked={task.isDone} onChange={getTaskStatus(task.id)} />
          <span className={task.isDone ? 'done' : ''}>{task.taskName}</span>
        </label>
        <button className="btn btn-danger" onClick={deleteTask(task.id)}>删除</button>
      </li>
    )
  }
}