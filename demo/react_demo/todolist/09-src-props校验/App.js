import React, { Component } from 'react'
import Hello from './Hello'

export default class App extends Component {
  render() {
    return (
      <div>
        <Hello msg={'aa'} list={[1, 2, 3]} obj={{ 'color': 'red', 'fontSize': 100 }}></Hello>
        App组价此处展示props默认值：{this.props.pageSize}
      </div>
    )
  }
}

App.defaultProps = {
  pageSize: 500
}
