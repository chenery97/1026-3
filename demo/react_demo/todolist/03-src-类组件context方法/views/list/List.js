import { Component } from 'react'
import Item from '../item/Item'
import './List.css'
export default class List extends Component {
  render() {
    return (
      <ul className="todo-main">
        <Item/>
      </ul>
    )
  }
}