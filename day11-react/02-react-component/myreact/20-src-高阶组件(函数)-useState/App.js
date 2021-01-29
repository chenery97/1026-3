import React, { Component } from 'react'
import withForm from './withForm'
import Login from './pages/Login'
import Register from './pages/Register'

const WithLogin = withForm(Login)
const WithRegister = withForm(Register)

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>高阶组件</h1>
        <WithLogin></WithLogin>
        <WithRegister></WithRegister>
      </React.Fragment>
    )
  }
}
