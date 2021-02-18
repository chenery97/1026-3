import React, { Component } from 'react'

export default class Son extends Component {
  shouldComponentUpdate(props, state) {
    return props.num !== this.props.num
  }
  render() {
    console.log('Son组件更新了')
    return (
      <div>
        Son组件：{this.props.num}
      </div>
    )
  }
}
