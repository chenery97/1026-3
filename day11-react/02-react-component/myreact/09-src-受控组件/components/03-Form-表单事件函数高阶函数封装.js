import React from 'react'

export default class Input extends React.Component {
  state = {
    text: '',
    textarea: '',
    selectText: 'China',
    checkedValue: true,
  }
  // 事件函数封装
  handle = (type) => {
    return (e) => {
      console.log(type)
      const value = type === 'checkedValue' ? e.target.checked : e.target.value
      this.setState({
        [type] : value
      })
    }
  }
  render() {
    return <form>
      搜索框 <input type="text" value={this.state.text} onChange={this.handle('text')} data-name="text"></input>
      文本域 <textarea value={this.state.textarea} onChange={this.handle('textarea')} data-name="textarea"></textarea>
      下拉框 <select value={this.state.selectText} onChange={this.handle('selectText')} data-name="selectText">
        <option value='China'>中国</option>
        <option value='Japan'>日本</option>
        <option value='Korea'>韩国</option>
      </select>
      复选框 <input type="checkbox" checked={this.state.checkedValue} onChange={this.handle('checkedValue')} data-name="checkedValue"></input>
    </form>
  }
}