import React, { Component } from 'react'
import Header from './containers/Header'
import Footer from './containers/Footer'
import List from './views/list/List'

import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header />
          <List />
          {this.props.todos.length > 0 && <Footer />}
        </div>
      </div>
    )
  }
}
