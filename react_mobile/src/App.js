import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { routes } from './config/routes'

import './App.css'

export default class App extends Component {
  render() {
    return (
      // 组件懒加载需要用Suspense包裹整个结构，并且需要书写fallback，在组件加载完成前渲染的效果
      <Suspense fallback={<div style={{color:'red', fontSize: 50 }}>Loading...</div>}>
        <Router>
          {routes.map(item => <Route key={item.path} path={item.path} component={item.component} exact={item.exact}></Route>)}
        </Router>
      </Suspense>
    )
  }
}
