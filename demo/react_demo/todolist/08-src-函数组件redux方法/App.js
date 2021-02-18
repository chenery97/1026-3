import Header from './containers/Header'
import Footer from './containers/Footer'
import List from './views/list/List'

import './App.css'

export default function App(props) {
  return (
    <div className="todo-container">
      <div className="todo-wrap">
        <Header />
        <List />
        {props.todos.length > 0 && <Footer />}
      </div>
    </div>
  )
}
