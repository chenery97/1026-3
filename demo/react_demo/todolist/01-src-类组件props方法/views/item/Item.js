import { Component } from 'react'
import './Item.css'
export default class Item extends Component {
  mouseHandle = (bgColor, isShow) => (e) => {
    const nodeName = e.target.nodeName
    const ele = e.target
    if (nodeName === 'LI') {
      ele.style.background = bgColor
      ele.children[1].style.display = isShow
    } else if (nodeName === 'LABEL') {
      ele.parentNode.style.background = bgColor
      ele.parentNode.children[1].style.display = isShow
    }
  }
  render() {
    const {
      todo,
      changeTodoDone,
      delTodo
    } = this.props
    return (
      <li onMouseEnter = {
        this.mouseHandle('#eee', 'block')
      } onMouseLeave={
        this.mouseHandle('#fff', 'none')
      } >
        <label>
          <input type="checkbox" checked={todo.isDone} onChange={changeTodoDone(todo.id)} />
          <span>{todo.todoName}</span>
        </label>
        <button className="btn btn-danger" style={{'display':'none'}} onClick={delTodo(todo.id)}>删除</button>
      </li>
    )
  }
}