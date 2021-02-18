import { Component } from 'react'
import context from '../../context'
import './Item.css'
export default class Item extends Component {
  render() {
    return (
      <context.Consumer>
        {data => data.todos.map(item => 
          <li key={item.id}>
            <label>
              <input type="checkbox" checked={item.isDone} onChange={() => data.changeTodoDone(item.id)} />
              <span>{item.todoName}</span>
            </label>
            <button className="btn btn-danger" onClick={() => data.delTodo(item.id)} >删除</button>
          </li>
        )}
      </context.Consumer>
    )
  }
}