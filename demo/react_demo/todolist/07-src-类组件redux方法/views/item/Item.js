import { Component } from 'react'
import './Item.css'
export default class Item extends Component {
  render() {
    const { todos, changeTodoDone, delTodo } = this.props
    return todos.map(item =>
      <li key={item.id}>
        <label>
          <input type="checkbox" checked={item.isDone} onChange={() => changeTodoDone(item.id)} />
          <span>{item.todoName}</span>
        </label>
        <button className="btn btn-danger" onClick={() => delTodo(item.id)} >删除</button>
      </li>
    )
  }
}