import React from 'react'
import ReactDom from 'react-dom'

// 函数组件
function Header() {
  return <header style={{ color: 'red', fontSize: 40}}>我是头部react组件</header>
}
function Footer() {
  return <footer style={{ color: 'yellow', fontSize: 40}}>我是尾部react组件</footer>
}

/* 
function App() {
  return <div>
    <Header />
    <Footer />
  </div>
} */

// 类组件
class App extends React.Component{
  render() {
    return <div >
      <Header / >
      <Footer / >
      </div>
  }
}
// 渲染组件
ReactDom.render( < App / > , document.getElementById('root'))