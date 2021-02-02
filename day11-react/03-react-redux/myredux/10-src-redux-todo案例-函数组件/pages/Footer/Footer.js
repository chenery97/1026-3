import React from 'react'
import './Footer.css'

export default function Footer(props) {
  const { todos } = props
  const allTodos = todos.length
  const completeTodos = todos.reduce((prev, item) => {
    item.isDone && prev++
    return prev
  }, 0)
  return (
    <div>
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={allTodos && completeTodos === allTodos} onChange={(e) => props.changeAllTodos(e.target.checked)} />
        </label>
        <span>
          <span>已完成{completeTodos}</span> / 全部{allTodos}
        </span>
        <button className="btn btn-danger" onClick={props.clearCompleted}>清除已完成任务</button>
      </div>
    </div>
  )
}
