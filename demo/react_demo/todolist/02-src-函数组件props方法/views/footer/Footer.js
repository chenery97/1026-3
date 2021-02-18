import './Footer.css'
export default function Footer(props) {
  const { todos, changeAllDone, delCompleteTodos } = props
  const completeCount = todos.reduce((prev, item) => item.isDone ? ++prev : prev, 0)
  const allCount = todos.length
  return (
    <div className="todo-footer">
      <label>
        <input type="checkbox" checked={completeCount === allCount} onChange={changeAllDone} />
      </label>
      <span>
        <span>已完成{completeCount}</span> / 全部{allCount}
      </span>
      <button className="btn btn-danger" onClick={delCompleteTodos}>清除已完成任务</button>
    </div>
  )
}