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
  render() {
    return <div >
      <span>{this.state.count}</span>
      <button onClick={() => {
        this.setState({
          count: this.state.count + 1
        })
      }}>递增</button>
      <button onClick={() => {
        this.setState({
          count: this.state.count - 1
        })
      }}>递减</button>
      <p>{this.state.content}</p>
      <Header / >
      <Footer / >
      </div>
  }
}

export default App