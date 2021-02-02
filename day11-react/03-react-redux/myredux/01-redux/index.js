import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore } from 'redux'

ReactDom.render(<App />, document.getElementById('root'))

/* 
  reducer: 修改数据的函数(纯函数)，调用createStore时会进行初始化执行一次，state如果没有给默认值，则state为undefined，action默认会有一个type属性，type属性初始化为一串以 @@redux/INIT 开头的随机字符串，是为了在switch语句从避免与开发者自己定义的case匹配，在reducer函数中的switch语句中需要写一个default语句并return state
    - state
*/
function reducer(state = { count: 0 }, action) {
  console.log(state, action)
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + action.data
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - action.data
      }
    default:
      return state
  }
}

// const store = createStore(reducer, {count: 1})
const store = createStore(reducer)

console.log(store.getState())
store.dispatch({ type: 'INCREMENT', data: 9 })
console.log(store.getState())