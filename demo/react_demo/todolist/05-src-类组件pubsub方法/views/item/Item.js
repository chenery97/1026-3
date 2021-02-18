import { Component } from 'react'
import pubsub from 'pubsub-js'
import './Item.css'
export default class Item extends Component {
  handle = (id) => () => {
    pubsub.publish('changeTodoDone', id)
  }
  delHandle = (id) => () => {
    pubsub.publish('delTodo', id)
  }
  render() {
    const { todo } = this.props
    return (
      <li>
        <label>
          <input type="checkbox" checked={todo.isDone} onChange={this.handle(todo.id)} />
          <span>{todo.todoName}</span>
        </label>
        <button className="btn btn-danger" onClick={this.delHandle(todo.id)} >删除</button>
      </li>
    )
  }
}