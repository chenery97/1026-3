import { useState, useEffect } from 'react'
import pubsub from 'pubsub-js'
import Header from './views/header/Header'
import Footer from './views/footer/Footer'
import List from './views/list/List'
import Item from './views/item/Item'

import './App.css'

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      todoName: '睡觉',
      isDone: true
    },
    {
      id: 2,
      todoName: '吃饭',
      isDone: false
    },
    {
      id: 3,
      todoName: '敲代码',
      isDone: false
    }
  ])
  useEffect(() => {
    console.log('组件挂载/更新完成')
    pubsub.subscribe('addTodo', (msg, todoName) => {
      const id = todos ? todos.reduce((prev, item) => prev > item.id ? prev : item.id, 0) + 1 : 1
      const obj = {
        id,
        todoName,
        isDone: false
      }
      setTodos([obj, ...todos])
    })
    pubsub.subscribe('changeTodoDone', (msg, id) => {
      const newTodos = [...todos]
      newTodos.forEach(item => {
        if (item.id === id) {
          item.isDone = !item.isDone
        }
      })
      setTodos(newTodos)
    })
    pubsub.subscribe('delTodo', (msg, id) => {
      const newTodos = todos.filter(item => item.id !== id)
      setTodos(newTodos)
    })
    pubsub.subscribe('changeAllDone', (msg, isDone) => {
      const newTodos = [...todos]
      newTodos.forEach(item => item.isDone = isDone)
      setTodos(newTodos)
    })
    pubsub.subscribe('delCompleteTodos', () => {
      const newTodos = todos.filter(item => !item.isDone)
      setTodos(newTodos)
    })
    return () => {
      console.log('组件即将卸载')
      pubsub.clearAllSubscriptions()
    }
  }, [todos])
  return (
    <div className="todo-container">
      <div className="todo-wrap">
        <Header />
        <List>
          {todos.map(item => <Item key={item.id} todo={item}></Item>)}
        </List>
        {todos.length > 0 && <Footer todos={todos} />}
      </div>
    </div>
  )
}
