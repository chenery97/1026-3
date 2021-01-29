import React from 'react'

export default class Input extends React.Component {
  state = {
    text: '',
    textarea: '',
    selectText: 'China',
    checkedValue: true,
  }
  // 定义事件函数，大量重复的代码
  textHandle = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  textareaHandle = (e) => {
    this.setState({
      textarea: e.target.value
    })
  }
  selectHandle = (e) => {
    this.setState({
      selectText: e.target.value
    })
  }
  checkedHandle = (e) => {
    this.setState({
      checkedValue: e.target.checked
    })
  }
  render() {
    // 绑定onChange事件监听表单项的value的变化
    return <form>
      搜索框 <input type="text" value={this.state.text} onChange={this.textHandle}></input>
      文本域 <textarea value={this.state.textarea} onChange={this.textareaHandle}></textarea>
      下拉框 <select value={this.state.selectText} onChange={this.selectHandle}>
        <option value='China'>中国</option>
        <option value='Japan'>日本</option>
        <option value='Korea'>韩国</option>
      </select>
      复选框 <input type="checkbox" checked={this.state.checkedValue} onChange={this.checkedHandle}></input>
    </form>
  }
}