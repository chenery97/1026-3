import { Component } from 'react'
import './List.css'
export default class List extends Component {
  render() {
    return (
      <ul className="todo-main">
        {this.props.children}
      </ul>
    )
  }
}