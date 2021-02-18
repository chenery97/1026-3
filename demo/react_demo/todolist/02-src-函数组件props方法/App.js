import { useState } from 'react'
import Header from './views/header/Header'
import Footer from './views/footer/Footer'
import List from './views/list/List'

import './App.css'

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      todoName: '吃饭',
      isDone: true
    },
    {
      id: 2,
      todoName: '睡觉',
      isDone: false
    },
    {
      id: 3,
      todoName: '敲代码',
      isDone: false
    },
  ])
  const addTodo = function (todoName) {
    const id = todos ? todos.reduce((prev, item) => prev > item.id ? prev : item.id, 0) + 1 : 1
    const obj = {
      id,
      todoName,
      isDone: false
    }
    setTodos([obj, ...todos])
  }
  const changeTodoDone = function (id) {
    return () => {
      const newTodos = [...todos]
      newTodos.forEach(item => {
        if (item.id === id) {
          item.isDone = !item.isDone
        }
      })
      setTodos(newTodos)
    }
  }
  const delTodo = function (id) {
    return () => {
      const newTodos = todos.filter(item => item.id !== id)
      setTodos(newTodos)
    }
  }
  const changeAllDone = function (e) {
    const isDone = e.target.checked
    const newTodos = [...todos]
    newTodos.forEach(item => item.isDone = isDone)
    setTodos(newTodos)
  }
  const delCompleteTodos = function () {
    const newTodos = todos.filter(item => !item.isDone)
    setTodos(newTodos)
  }
  return (
    <div className="todo-container">
      <div className="todo-wrap">
        <Header addTodo={addTodo} />
        <List todos={todos} changeTodoDone={changeTodoDone} delTodo={delTodo} />
        {todos.length > 0 && <Footer todos={todos} changeAllDone={changeAllDone} delCompleteTodos={delCompleteTodos} />}
      </div>
    </div>
  )
}
