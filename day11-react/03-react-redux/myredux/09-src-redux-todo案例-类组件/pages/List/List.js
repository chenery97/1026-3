import React, { Component } from 'react'
import Item from '../../containers/ItemContainer'
import './List.css'

export default class List extends Component {
  render() {
    const { todos } = this.props
    return (
      <div>
        <ul className="todo-main">
          {todos.map(item => <Item key={item.id} todo={item} />)}
        </ul>
      </div>
    )
  }
}
