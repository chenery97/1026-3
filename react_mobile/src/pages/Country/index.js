import React, { Component } from 'react'
import { NavBar, Icon, List } from 'antd-mobile'
import { getCountries } from '../../api/country'
import { getEleToDoc } from '../../utils/getEleToDoc'
import './index.css'
const Item = List.Item
export default class index extends Component {
  state = {
    countries: {},
    isActive: '*'
  }
  async componentDidMount() {
    // 组件挂载成功发送获取国家的请求
    const res = await getCountries()
    // 判断获取结果
    if (res.data.success) {
      // 保存数据
      this.setState({
        countries: res.data.data
      })
    }
    // 滚动条事件处理函数
    window.onscroll = () => {
      // 获取国家对象
      const { countries } = this.state
      // 获取国家对象中所有key
      const countryKeys = Object.keys(countries)
      // 获取文档高度和可视窗口高度
      const docHeight = document.documentElement.scrollHeight
      const winHeight = document.documentElement.offsetHeight
      // 获取滚动条的位置
      const scrollLocation = window.pageYOffset || document.documentElement.scrollTop
      // 定义一个对象，用于存放每个list元素距离文档顶部的距离
      const topObj = {}
      // 遍历所有key
      countryKeys.forEach(item => {
        // 根据key获取list元素
        const ele = document.getElementById(item)
        // 获取list元素距离文档顶部的距离
        const top = getEleToDoc(ele).t
        // 保存到对象中
        topObj[item] = top
      })
      // 获取topObj对象中所有key和value
      const topKeys = Object.keys(topObj)
      const topValues = Object.values(topObj)
      // 遍历key
      topKeys.forEach((item, index) => {
        // 判断滚动条当前的位置，因为用offsetTop获取的是整数（向上取整），所以会有一点偏差，判断的时候 -1
        if (scrollLocation >= topObj[item] - 1 && scrollLocation < topValues[index + 1]) {
          this.setState({
            isActive: item
          })
        }
      })
      // 判断滚动条是否拖动到底
      if (docHeight === scrollLocation + winHeight) {
        this.setState({
          isActive: countryKeys[countryKeys.length - 1]
        })
      }
    }
  }
  // 组件即将卸载把滚动条事件清除
  componentWillUnmount() {
    window.onscroll = null
  }
  render() {
    const { countries, isActive } = this.state
    // 获取对象中所有key组成的数组
    const countryKeys = Object.keys(countries)
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" color='black' onClick={() => {
            this.props.history.goBack()
          }} />}
        >国家或地区</NavBar>
        {countryKeys.map(item => {
          // 根据key获取对应的数组
          const itemList = countries[item]
          return <List key={item} id={item} renderHeader={() => item} className="my-list">
            {itemList.map((item, index) => {
              // 获取对象中的key
              const key = Object.keys(item)[0]
              return <Item key={index} className='wrap' extra={item[key]} onClick={() => {
                this.props.history.replace(this.props.location.state.from, { countryCode: item[key] })
              }}>{key}</Item>
            })}
          </List>
        })}
        <div className='countryNav'>
          {countryKeys.map(item => <button key={item} className={isActive === item ? 'active' : ''} onClick={() => {
            const element = document.getElementById(item)
            element.scrollIntoView()
            this.setState({
              isActive: item
            })
          }}>{item}</button>)}
        </div>
      </div>
    )
  }
}
