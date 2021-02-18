import React, { Component } from 'react'
import Header from './views/header/Header'
import Footer from './views/footer/Footer'
import List from './views/list/List'

import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header />
          <List />
          <Footer />
        </div>
      </div>
    )
  }
}
