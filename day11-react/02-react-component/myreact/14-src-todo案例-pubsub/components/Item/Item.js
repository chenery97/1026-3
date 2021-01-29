import React from 'react'
import Pubsub from 'pubsub-js'
import './Item.css'

export default class Item extends React.Component{
  handle = (id) => () => {
    Pubsub.publish('changeStatus', id)
  }
  delHandle = (id) => () => {
    Pubsub.publish('delTask', id)
  }
  render() {
    const {task} = this.props
    return (
      <li>
        <label>
          <input type="checkbox" checked={task.isDone} onChange={this.handle(task.id)} />
          <span >{task.taskName}</span>
        </label>
        <button className="btn btn-danger" onClick={this.delHandle(task.id)} >删除</button>
      </li>
    )
  }
}