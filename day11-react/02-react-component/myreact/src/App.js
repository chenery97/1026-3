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
    if (this.state.count >= 10) return
    this.setState({
      count: this.state.count + 1
    })
  }
  prev = () => {
    if (this.state.count <= 0) return
    this.setState({
      count: this.state.count - 1
    })
  }
  render() {
    return <div >
      <span>{this.state.count}</span>
      <button onClick={this.add}>递增</button>
      <button onClick={this.prev}>递减</button>
      <p>{this.state.content}</p>
      <Header head={this.state} />
      <Footer foot={this.state} />
      </div>
  }
}

export default App