import React, { PureComponent } from 'react'

export default class Son extends PureComponent {
  render() {
    console.log('Son组件更新了')
    return (
      <div>
        Son组件：{this.props.num}
      </div>
    )
  }
}
