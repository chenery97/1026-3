import React, {PureComponent} from 'react'
import Son from './Son'
/* 
  PureComponent:
    内部自动实现了shouldComponentUpdate钩子，不需要再手动比较
    纯组件内部通过分别 对比 前后两次 props 和 state 的值， 来决定是否重新渲染组件
    注：浅层对比，如果对比的是引用类型，需要创建新数据，不要直接在原数据上修改，要改变内存地址
*/
export default class App extends PureComponent {
  state = {
    num: 0
  }
  changeNum() {
    const num = Math.floor(Math.random() * 3 + 1)
    return num
  }
  handle = () => {
    this.setState({
      num: this.changeNum()
    })
  }
  render() {
    console.log('App组件更新了')
    return (
      <div>
        <div>App组件：{this.state.num}</div>
        <button onClick={this.handle}>更新num</button>
        <Son ></Son>
      </div>
    )
  }
}
