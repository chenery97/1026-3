import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
// 类组件，要继承react的component
class App extends React.Component{
  // 在render函数中return虚拟dom
  render() {
    return <div >
      <Header / >
      <Footer / >
      </div>
  }
}

export default App