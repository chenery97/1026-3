import React, { Component } from 'react'
import Header from './views/header/Header'
import Footer from './views/footer/Footer'
import List from './views/list/List'

import './App.css'

export default class App extends Component {
  state = {
    data: 'hello App'
  }
  handle()  {
    console.log(this.state.data)
  }
  render() {
    console.log(App.prototype)
    console.log(this)
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
