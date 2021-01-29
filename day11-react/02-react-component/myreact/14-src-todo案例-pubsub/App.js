import React from 'react'
import Pubsub from 'pubsub-js'
import './App.css'
import Header from './components/Header/Header'
import List from './components/List/List'
import Footer from './components/Footer/Footer'
import Item from './components/Item/Item'

export default class App extends React.Component {
  state = {
    tasks: [
      {
        id: 1,
        taskName: '睡觉',
        isDone: true
      },
      {
        id: 9,
        taskName: '吃饭',
        isDone: false
      },
      {
        id: 5,
        taskName: '敲代码',
        isDone: false
      },
    ]
  }
  componentDidMount() {
    this.addToken = Pubsub.subscribe('add', (msg, data) => {
      // 定义一个变量接收状态的数据，不直接修改状态
      const newTasks = [...this.state.tasks]
      // 计算id
      const id = newTasks.length ? newTasks.reduce((prev, item) => prev > item.id ? prev : item.id, 0) + 1 : 1
      // 定义对象，存放新任务的属性
      const obj = {
        id,
        taskName: data,
        isDone: false
      }
      // 重新设置状态
      this.setState({
        tasks: [obj, ...newTasks]
      })
    })
    this.changeStatusToken = Pubsub.subscribe('changeStatus', (msg, data) => {
      // 定义一个变量接收状态中的数据，不直接修改状态的数据
      const newTasks = [...this.state.tasks]
      // 变量数组，判断id，改变对应isDone属性值
      newTasks.forEach(item => {
        if (item.id === data) item.isDone = !item.isDone
      })
      // 重新设置状态
      this.setState({
        tasks: newTasks
      })
    })
    this.delTaskToken = Pubsub.subscribe('delTask', (msg, data) => {
      const newTasks = this.state.tasks.filter(item => item.id !== data)
      this.setState({
        tasks: newTasks
      })
    })
  }
  // 改变全选按钮的状态
  changeAllCheckStatus = () => {
    const { tasks } = this.state
    // 获取当前全选按钮的状态
    const status = tasks.every(item => item.isDone)
    // 定义一个变量接收状态中的数据，不直接修改状态
    const newTasks = [...tasks]
    // 遍历修改所有任务的完成状态
    newTasks.forEach(item => item.isDone = !status)
    // 更新状态
    this.setState({
      tasks: newTasks
    })
  }
  // 清除所有已完成的任务
  delAllCompleteTasks = () => {
    const { tasks } = this.state
    const newTasks = tasks.filter(item => !item.isDone)
    this.setState({
      tasks: newTasks
    })
  }
  // 组件即将卸载，取消订阅
  componentWillUnmount() {
    Pubsub.clearAllSubscriptions()
    /* Pubsub.unsubscribe(this.addToken)
    Pubsub.unsubscribe(this.changeStatusToken)
    Pubsub.unsubscribe(this.delTaskToken) */
  }
  render() {
    const { tasks } = this.state
    return (<div className="todo-container">
      <div className="todo-wrap">
        <Header />
        {this.state.tasks.length > 0 && (<div><List>
          {this.state.tasks.map(item => <Item key={item.id} task={item}></Item>)}
        </List>
          < Footer
            tasks={tasks}
            completeCount={tasks.reduce((prev, item) => item.isDone ? ++prev : prev, 0)}
            changeAllCheckStatus={this.changeAllCheckStatus}
            delAllCompleteTasks={this.delAllCompleteTasks}
          /></div>)}
      </div>
    </div>)
  }
}