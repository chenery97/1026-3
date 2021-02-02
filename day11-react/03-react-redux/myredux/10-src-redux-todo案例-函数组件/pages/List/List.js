import React from 'react'
import Item from '../../containers/ItemContainer'
import './List.css'

export default function List(props) {
  const { todos } = props
  return (
    <div>
      <ul className="todo-main">
        {todos.map(item => <Item key={item.id} todo={item} />)}
      </ul>
    </div>
  )
}
