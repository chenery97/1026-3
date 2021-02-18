import { useState } from 'react'
import './Header.css'
export default function Header(props) {
  const [todoName, setTodoName] = useState('')
  const handle = function (e) {
    setTodoName(e.target.value.trim())
  }
  const keyUpHandle = function (e) {
    if (e.keyCode === 13 && todoName) {
      props.addTodo(todoName)
      setTodoName('')
    }
  }
  return (
    <div className = "todo-header" >
      <input
        type="text"
        placeholder="请输入你的任务名称，按回车键确认"
        value={todoName}
        onChange={handle}
        onKeyUp={keyUpHandle}
      />
    </div>
  )

}