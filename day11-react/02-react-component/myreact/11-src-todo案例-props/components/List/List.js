import React from 'react'
import './List.css'
import Item from '../Item/Item'

export default class List extends React.Component {
  render() {
    const {
      tasks,
      getTaskStatus,
      deleteTask
    } = this.props
    return (
      <ul className="todo-main">
        {tasks.map(item => {
          return <Item
            key={item.id}
            task={item}
            getTaskStatus={getTaskStatus}
            deleteTask={deleteTask}
          />
        })}
      </ul>)
  }
}