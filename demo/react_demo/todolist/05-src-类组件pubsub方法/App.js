import React, { Component } from 'react'
import pubsub from 'pubsub-js'
import Header from './views/header/Header'
import Footer from './views/footer/Footer'
import List from './views/list/List'
import Item from './views/item/Item'

import './App.css'

export default class App extends Component {
  state = {
    todos: [
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
      },
    ]
  }
  componentDidMount() {
    this.addTodoToken = pubsub.subscribe('addTodo', (msg, todoName) => {
      const todos = [...this.state.todos]
      const id = todos ? todos.reduce((prev, item) => prev > item.id ? prev : item.id, 0) + 1 : 1
      const obj = {
        id,
        todoName,
        isDone: false
      }
      this.setState({
        todos: [obj, ...todos]
      })
    })
    this.changeDoneToken = pubsub.subscribe('changeTodoDone', (msg, id) => {
      const todos = [...this.state.todos]
      todos.forEach(item => {
        if (item.id === id) {
          item.isDone = !item.isDone
        }
      })
      this.setState({
        todos
      })
    })
    this.delTodoToken = pubsub.subscribe('delTodo', (msg, id) => {
      const todos = this.state.todos.filter(item => item.id !== id)
      this.setState({
        todos
      })
    })
    this.changeAllDoneToken = pubsub.subscribe('changeAllDone', (msg, isDone) => {
      const todos = [...this.state.todos]
      todos.forEach(item => item.isDone = isDone)
      this.setState({
        todos
      })
    })
    this.delCompleteTodosToken = pubsub.subscribe('delCompleteTodos', () => {
      const todos = this.state.todos.filter(item => !item.isDone)
      this.setState({
        todos
      })
    })
  }
  componentWillUnmount() {
    pubsub.clearAllSubscriptions()
  }
  render() {
    const todos = this.state.todos
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
}
