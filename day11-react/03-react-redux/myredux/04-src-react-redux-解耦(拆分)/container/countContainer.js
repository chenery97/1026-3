/* 
  Count展示组件的容器组件，存放Count组件用到的数据和操作数据的方法，导出一个封装后的Count组件
*/

import { connect } from 'react-redux'
import Count from '../Count'
import { increment, decrement } from '../redux/actions'

/* 
  connect 简写模式
    第一次调用
      - 第一个参数是一个函数，返回一个对象，函数的参数是redux中管理的所有数据的对象，返回的对象是组件需要用到的数据
      - 第二个参数是一个对象，对象中的函数底层封装调用了dispatch方法
    第二次调用
      - 参数是要使用redux管理数据的组件
*/
export default connect(state => ({ count: state.count }), { increment, decrement })(Count)