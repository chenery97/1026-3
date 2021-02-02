import React, { useState } from 'react'
import './Header.css'

export default function Header(props) {
  const [data, setData] = useState('')
  function handle(e) {
    setData(e.target.value.trim())
  }
  function keyUpHandle(e) {
    const todoName = data
    if (todoName && e.keyCode === 13) {
      props.addTodo(todoName)
      setData('')
    }
  }
  // console.log(this.props)
  return (
    <div>
      <div className="todo-header">
        <input
          type="text"
          placeholder="请输入你的任务名称，按回车键确认"
          value={data}
          onChange={handle}
          onKeyUp={keyUpHandle}
        />
      </div>
    </div>
  )
}
