import React, { Component } from 'react'
import PropTypes from 'prop-types' // 下载并引入该包

export default class Hello extends Component {
  // 在组件的静态属性中定义propTypes对象
  static propTypes = {
    // 指定属性值的数据类型要求，string、number、object、array、bool、func、symbol等
    // 指定属性值的其他要求，isRequired(必须传的)
    msg: PropTypes.string.isRequired,
    list: PropTypes.array,
    obj: PropTypes.shape({
      color: PropTypes.string,
      fontSize: PropTypes.number
    })
  }
  // 在组件的静态属性中定义defaultProps对象
  static defaultProps = {
    // 若没传指定的属性，可以使用默认值
    pageSize: 100
  }
  render() {
    const {obj} = this.props
    return (
      <div style={{...obj}}>
        Hello Component
        <br/>
        Hello组价此处展示props的默认值：{this.props.pageSize}
      </div>
    )
  }
}

/* Hello.defaultProps = {
  pageSize : 200
} */