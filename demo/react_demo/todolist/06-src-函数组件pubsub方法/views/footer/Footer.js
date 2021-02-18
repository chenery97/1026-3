import pubsub from 'pubsub-js'
import './Footer.css'
export default function Footer(props) {
  const { todos } = props
  const allCount = todos.length
  const completeCount = todos.reduce((prev, item) => item.isDone ? ++prev : prev, 0)
  const handle = function (e) {
    pubsub.publish('changeAllDone', e.target.checked)
  }
  const delHandle = function () {
    pubsub.publish('delCompleteTodos')
  }
  return (
    <div className="todo-footer">
      <label>
        <input type="checkbox" checked={completeCount === allCount} onChange={handle} />
      </label>
      <span>
        <span>已完成{completeCount}</span> / 全部{allCount}
      </span>
      <button className="btn btn-danger" onClick={delHandle} >清除已完成任务</button>
    </div>
  )
}