import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'

export default class App extends Component {
  render() {
    return (
      // Router 监听浏览器地址栏的变化
      <Router>
        <div>
          {/* 相当于a标签，只是没有a标签的默认行为，点击不会给服务器发送请求，to相当于href属性 */}
          <Link to='/home'>首页</Link><br />
          <Link to='/detail'>详情页</Link>

          {/* 当Router监听到浏览器地址栏发生变化后，会去Route中匹配对应的路由并渲染对应的组件 */}
          {/* 匹配时会对所有的Route一一进行匹配，而且是一层一层的进行匹配，匹配到的都会渲染出来，给组件添加exact可以进行精确匹配 */}
          <Route path='/' component={Home} exact></Route>
          <Route path='/home' component={Home}></Route>
          <Route path='/detail' component={Detail}></Route>
        </div>
      </Router>
    )
  }
}
