// 函数组件
import React from 'react'

class Header extends React.Component{
  render() {
  /* 类组件在当前组件实例对象上有props属性，这个属性上存放了从父组件传递过来的数据 */
    // console.log(this.props)
    return <header style={{ color: 'red', fontSize: 40 }}>我是头部react组件{this.props.head.count}</header>
  }
}

export default Header