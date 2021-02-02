import React from 'react'
import './Item.css'

export default function Item(props) {
  const { todo } = props
  return (
    <li>
      <label>
        <input type="checkbox" checked={todo.isDone} onChange={() => { props.setIsDone(todo.id) }} />
        <span>{todo.todoName}</span>
      </label>
      <button className="btn btn-danger" onClick={() => { props.delTodo(todo.id) }}>删除</button>
    </li>
  )
}
