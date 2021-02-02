import React from 'react'
import Header from './containers/HeaderContainer'
import Footer from './containers/FooterContainer'
import List from './containers/ListContainer'
import './App.css'

export default function App(props) {
  return (
    <div className="todo-container">
      <div className="todo-wrap">
        <Header></Header>
        {props.todos.length > 0 && (
          <>
            <List></List>
            <Footer></Footer>
          </>
        )}

      </div>
    </div>
  )
}
