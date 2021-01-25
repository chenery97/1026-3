import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
// 类组件，要继承react的component
class App extends React.Component{
  constructor() {
    super()
    this.state = {
      count: 0,
      content: '雷猴啊'
    }
  }
  /* es7提供了实例对象方法的新写法 */
  add = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  prev = () => {
    this.setState({
      count: this.state.count - 1
    })
  }
  render() {
    return <div >
      <span>{this.state.count}</span>
      <button onClick={this.add}>递增</button>
      {/** this.handle react底层的事件绑定 进行了普通调用 在babel编译后的严格模型下普通函数调用的this指向undefined*/ }
      <button onClick={this.prev}>递减</button>
      <p>{this.state.content}</p>
      <Header head={this.state} />
      <Footer foot={this.state} />
      </div>
  }
}

export default App