import React, { Component } from 'react'

export default function withFrom(MyComponent) {
  return class extends Component {
    // 定义一个静态属性displayName 用于react devtools 调试工具的展示组件名
    // 在传递进来的组件的静态属性name前拼接with字符串，用于标识使用了高阶组件，with可以随意起，但一般都按照约定俗成
    static displayName = 'with' + MyComponent.name
    state = {
      username: '',
      password: '',
      repassword: ''
    }
    handle = (name) => (e) => {
      this.setState({
        [name]: e.target.value
      })
    }
    render() {
      return (
        // 在高阶组件里要把state、共用的方法和props传递出去
          <MyComponent {...this.state} handle={this.handle} {...this.props} />
      )
    }
  }
  }
