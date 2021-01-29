import React from 'react'

export default class Input extends React.Component {
  constructor() {
    super()
    this.textRef = React.createRef()
    this.textareaRef = React.createRef()
    this.selectRef = React.createRef()
    this.checkRef = React.createRef()
  }
  state = {
    text: '',
    selectText: 'China',
  }

  handle = (e) => {
    console.log(this.textRef.current.value)
    console.log(this.selectRef.current.value)
  }

  render() {
    return <form>
      搜索框 <input type="text" ref={this.textRef}></input>
      下拉框 <select ref={this.selectRef}>
        <option value='China'>中国</option>
        <option value='Japan'>日本</option>
        <option value='Korea'>韩国</option>
      </select>
      <button type='button' onClick={this.handle}>获取数据</button>
    </form>
  }
}