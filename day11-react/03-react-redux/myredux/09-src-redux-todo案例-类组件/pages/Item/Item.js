import React, { Component } from 'react'
import './Item.css'

export default class Item extends Component {
  render() {
    const { todo } = this.props
    return (
      <li>
        <label>
          <input type="checkbox" checked={todo.isDone} onChange={() => { this.props.setIsDone(todo.id) }} />
          <span>{todo.todoName}</span>
        </label>
        <button className="btn btn-danger" onClick={() => { this.props.delTodo(todo.id) }}>删除</button>
      </li>
    )
  }
}
