import {useState} from 'react'
import context from '../../context'
import './Header.css'
export default function Header() {
  const [todoName, setTodoName] = useState('')
  const handle = function (e) {
    setTodoName(e.target.value.trim())
  }
  const keyUpHandle = function (addTodo) {
    return (e) => {
      if (e.keyCode === 13 && todoName) {
        addTodo(todoName)
        setTodoName('')
      }
    }
  }
  return (
    <context.Consumer>
      {data => (
        <div className = "todo-header" >
          <input
            type="text"
            placeholder="请输入你的任务名称，按回车键确认"
            value={todoName}
            onChange={handle}
            onKeyUp={keyUpHandle(data.addTodo)}
          />
        </div>
      )}
    </context.Consumer>
  )
}