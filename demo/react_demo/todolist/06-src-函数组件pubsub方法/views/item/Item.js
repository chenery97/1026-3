import pubsub from 'pubsub-js'
import './Item.css'
export default function Item(props) {
  const { todo } = props
  const handle = () => {
    pubsub.publish('changeTodoDone', todo.id)
  }
  const delHandle = () => {
    pubsub.publish('delTodo', todo.id)
  }
  return (
    <li>
      <label>
        <input type="checkbox" checked={todo.isDone} onChange={handle} />
        <span>{todo.todoName}</span>
      </label>
      <button className="btn btn-danger" onClick={delHandle} >删除</button>
    </li>
  )
}