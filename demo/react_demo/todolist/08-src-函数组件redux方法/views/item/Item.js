import './Item.css'
export default function Item(props) {
  const { todos, changeTodoDone, delTodo } = props
  
  return todos.map( item => 
    <li key={item.id}>
      <label>
        <input type="checkbox" checked={item.isDone} onChange={() => changeTodoDone(item.id)} />
        <span>{item.todoName}</span>
      </label>
      <button className="btn btn-danger" onClick={() => delTodo(item.id)} >删除</button>
    </li>
  )
}