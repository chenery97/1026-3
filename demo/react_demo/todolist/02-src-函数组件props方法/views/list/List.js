import Item from '../item/Item'
import './List.css'
export default function List(props) {
  const {todos, changeTodoDone, delTodo} = props
  return (
    <ul className="todo-main">
      {
        todos.map(item => < Item key={item.id} todo={item} changeTodoDone={changeTodoDone} delTodo={delTodo} / > )
      }
    </ul>
  )
}