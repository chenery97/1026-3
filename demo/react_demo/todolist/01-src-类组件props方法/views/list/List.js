import { Component } from 'react'
import Item from '../item/Item'
import './List.css'
export default class List extends Component {
  render() {
    const { todos, changeTodoDone, delTodo } = this.props
    return (
      <ul className="todo-main">
        {todos.map(item => <Item key={item.id} todo={item} changeTodoDone={changeTodoDone} delTodo={delTodo} />)}
      </ul>
    )
  }
}