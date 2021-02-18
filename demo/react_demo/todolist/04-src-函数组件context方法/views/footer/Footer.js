import context from '../../context'
import './Footer.css'
export default function Footer() {
  return (
    <context.Consumer>
      {data => {
        const allCount = data.todos.length
        const completeCount = data.todos.reduce((prev, item) => item.isDone ? ++prev : prev, 0)
        return (
        <div className="todo-footer">
          <label>
            <input type="checkbox" checked={completeCount === allCount} onChange={data.changeAllDone} />
          </label>
          <span>
              <span>已完成{completeCount}</span> / 全部{allCount}
          </span>
          <button className="btn btn-danger" onClick={data.delCompleteTodos}>清除已完成任务</button>
        </div>
      )}}
    </context.Consumer>
  )
}