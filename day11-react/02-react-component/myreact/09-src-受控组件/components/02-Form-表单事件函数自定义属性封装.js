import React from 'react'

export default class Input extends React.Component {
  state = {
    text: '',
    textarea: '',
    selectText: 'China',
    checkedValue: true,
  }
  // 事件函数封装
  handle = (e) => {
    // 获取触发事件函数的自定义属性name的值
    const name = e.target.dataset.name
    // 根据自定义属性name的值确定要控制的值
    const value = name === 'checkedValue' ? e.target.checked : e.target.value
    // 设置组件状态
    this.setState({
      [name] : value
    })
  }
  render() {
    return <form>
      搜索框 <input type="text" value={this.state.text} onChange={this.handle} data-name="text"></input>
      文本域 <textarea value={this.state.textarea} onChange={this.handle} data-name="textarea"></textarea>
      下拉框 <select value={this.state.selectText} onChange={this.handle} data-name="selectText">
        <option value='China'>中国</option>
        <option value='Japan'>日本</option>
        <option value='Korea'>韩国</option>
      </select>
      复选框 <input type="checkbox" checked={this.state.checkedValue} onChange={this.handle} data-name="checkedValue"></input>
    </form>
  }
}