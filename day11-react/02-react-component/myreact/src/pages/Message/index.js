import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom'
import Detail from '../Detail'

export default class index extends Component {
  state = {
    msg: 'hello react-router-dom'
  }
  pushHandle = () => {
    this.props.history.push('/home/message/4', this.state)
  }
  replaceHandle = () => {
    this.props.history.replace('/home/message/5', this.state)
  }
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to='/home/message/1'>message001</Link>
          </li>
          <li>
            <Link to='/home/message/2'>message002</Link>
          </li>
          <li>
            <Link to='/home/message/3'>message003</Link>
          </li>
        </ul>
        <button onClick={this.pushHandle}>添加</button>
        <button onClick={this.replaceHandle}>替换</button>
        <Route path='/home/message/:id' component={Detail} ></Route>
      </div>
    )
  }
}
