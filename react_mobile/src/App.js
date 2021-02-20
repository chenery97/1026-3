import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { routes } from './config/routes'

export default class App extends Component {
  render() {
    return (
      <Router>
        {routes.map(item => <Route key={item.path} path={item.path} component={item.component} exact={item.exact}></Route>)}
      </Router>
    )
  }
}
