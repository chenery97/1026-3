import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import List from './components/List/List'
import Footer from './components/Footer/Footer'

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
    ],
    allStatus: false
  }
  // 获取新添加的任务
  getNewTask = (taskName) => {
    const newTasks = [...this.state.tasks]
    // 定义id
    const id = newTasks.length ? newTasks.reduce((prev, item) => item.id > prev ? item.id : prev, 0) + 1 : 1
    // 接收到Header组件传递过来的新的任务
    // 定义一个对象，设置任务的属性
    const obj = {
      id,
      taskName,
      isDone: false
    }
    // 重新设置APP组件的state中的数据
    this.setState({
      tasks: [obj, ...newTasks],
      allStatus: false
    })
  }
  // 获取全选按钮的状态
  getAllCheckStatus = () => {
    // 接收到Footer组件传递过来的全选按钮的状态
    // 重新设置APP组件的state中的数据
    const status = !this.state.allStatus
    const newTasks = [...this.state.tasks]
    newTasks.forEach(item => item.isDone = status)
    this.setState({
      tasks: newTasks,
      allStatus: status
    })
  }
  // 获取单个任务对象，更改该任务对象的状态属性
  getTaskStatus = (id) => () => {
    // 重新设置App组件的state中的数据
    const newTasks = [...this.state.tasks]
    newTasks.forEach(item => {
      if (item.id === id) item.isDone = !item.isDone
    })
    // 获取任务列表中的所有任务的状态，如果状态都为true，则证明任务全部被选中
    const allStatus = newTasks.every(item => item.isDone)
    this.setState({
      tasks: newTasks,
      allStatus
    })
  }
  // 删除任务
  deleteTask = (id) => () => {
    const newTasks = [...this.state.tasks]
    // 重新设置状态
    this.setState({
      // 判断任务列表中的id和要删除的任务的id
      tasks: newTasks.filter(item => item.id !== id)
    })
  }
  // 删除已完成的任务
  deleteComplete = () => {
    const newTasks = this.state.tasks.filter(item => !item.isDone)
    this.setState({
      tasks: newTasks
    })
    if (!newTasks.length) {
      this.setState({
        allStatus: false
      })
    }
  }
  render() {
    return (<div className="todo-container">
      <div className="todo-wrap">
        <Header getNewTask={this.getNewTask} />
        {this.state.tasks.length > 0 && <div>
          <List tasks={this.state.tasks} getTaskStatus={this.getTaskStatus} deleteTask={this.deleteTask} />
          < Footer tasks={
            this.state.tasks
          }
            getAllCheckStatus={
              this.getAllCheckStatus
            }
            allStatus={
              this.state.allStatus
            }
            deleteComplete={
              this.deleteComplete
            } /></div>}
      </div>
    </div>)
  }
}