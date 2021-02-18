import React, { Component } from 'react'

export default class Form extends Component {
  constructor() {
    super()
    // 1.调用React.createRef()创建一个ref对象
    this.textRef = React.createRef()
    this.pRef = React.createRef()
  }
  handle = () => {
    // 3.通过this.textRef.current获取到该表单的dom元素
    console.log(this.textRef.current.value)
    this.pRef.current.innerText = this.textRef.current.value
  }
  render() {
    return (
      <div>
        {/* 2.在表单标签定义一个ref属性，指向创建的textRef对象 */}
        <input type="text" ref={this.textRef} onChange={this.handle} />
        <p ref={this.pRef}></p>
      </div>
    )
  }
}
