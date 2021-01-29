import React from 'react'
import './List.css'

export default class List extends React.Component {
  render() {
    return (
      <ul className="todo-main">
        {this.props.children}
      </ul>)
  }
}