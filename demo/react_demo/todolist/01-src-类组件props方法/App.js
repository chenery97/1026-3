import React, { Component } from 'react'
import Header from './views/header/Header'
import Footer from './views/footer/Footer'
import List from './views/list/List'

import './App.css'

export default class App extends Component {
  state = {
    todos: [
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
    ]
  }
  addTodo = (todoName) => {
    const todos = [...this.state.todos]
    const id = todos.length ? todos.reduce((prev, item) => item.id > prev ? item.id : prev, 0) + 1 : 1
    const obj = {
      id,
      todoName,
      isDone: false
    }
    this.setState({
      todos: [obj, ...todos]
    })
  }
  changeTodoDone = (id) => () => {
    const todos = [...this.state.todos]
    todos.forEach(item => {
      if (item.id === id) {
        item.isDone = !item.isDone
      }
    })
    this.setState({
      todos
    })
  }
  delTodo = (id) => () => {
    const todos = this.state.todos.filter(item => item.id !== id)
    this.setState({
      todos
    })
  }
  changeAllDone = (e) => {
    const isDone = e.target.checked
    const todos = this.state.todos
    todos.forEach(item => item.isDone = isDone)
    this.setState({
      todos
    })
  }
  delCompleteTodos = () => {
    const todos = this.state.todos.filter(item => !item.isDone)
    this.setState({
      todos
    })
  }
  render() {
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List todos={this.state.todos} changeTodoDone={this.changeTodoDone} delTodo={this.delTodo} />
          {this.state.todos.length > 0 && <Footer todos={this.state.todos} changeAllDone={this.changeAllDone} delCompleteTodos={this.delCompleteTodos} />}
        </div>
      </div>
    )
  }
}
