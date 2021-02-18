import './Item.css'
export default function Item(props) {
  const { todo, changeTodoDone, delTodo } = props
  
  return (
    <li>
      <label>
        <input type="checkbox" checked={todo.isDone} onChange={changeTodoDone(todo.id)} />
        <span>{todo.todoName}</span>
      </label>
      <button className="btn btn-danger" onClick={delTodo(todo.id)} >删除</button>
    </li>
  )
}