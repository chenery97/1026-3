import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createForm } from 'rc-form'
import {
  NavBar,
  Icon,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Toast
} from 'antd-mobile'
import { register } from '../../../api/register'
import './index.css'
import msg from './msg.png'
class VerifyPassword extends Component {
  state = {
    isDisabled: true,
    isShow: false
  }
  // 密码输入框规则校验的处理函数
  validator = (rules, value) => {
    const isDisabled = !/^(\d|[a-zA-Z]|[^0-9a-zA-Z]){0,9}$/.test(value) && /^\w{8,20}$/.test(value) ? false : true
    this.setState({
      isDisabled
    })
  }
  // 改变密码输入框效果处理函数
  changeShow = () => {
    this.setState({
      isShow: !this.state.isShow
    })
  }
  // 密码设置完成处理函数
  completeHandle = async () => {
    // 获取手机号、密码
    const phone = localStorage.getItem('phone')
    const password = this.props.form.getFieldValue('password')
    // 发送注册请求
    const res = await register(phone, password)
    // 判断请求结果
    if (res.data.success) {
      Toast.success('注册成功', 2)
      this.props.history.replace('/login')
    } else {
      Toast.fail(res.data.message)
    }
  }
  render() {
    const { isDisabled, isShow } = this.state
    const { getFieldProps } = this.props.form
    return (
      <div className='wrap'>
        <NavBar
          mode='light'
          icon={<Icon type='left' color='#000' />}
        >
          硅谷注册
        </NavBar>
        <WhiteSpace size='lg'></WhiteSpace>

        <WingBlank size='lg'>
          <div className='img'>
            <img src={msg} alt='' />
          </div>
          <WhiteSpace size='lg'></WhiteSpace>
          <WingBlank size='lg'>
            <div className='tip'>请设置登录密码</div>
          </WingBlank>
          <WhiteSpace size='lg'></WhiteSpace>

          <div className='code'>
            <InputItem
              {...getFieldProps('password', {
                rules: [
                  {
                    validator: this.validator
                  }
                ]
              })}
              className='psw'
              type={isShow ? 'text' : 'password'}
              clear
              placeholder='请设置8~20位登录密码'
              extra={<span className={isShow ? 'iconfont icon-yanjing' : 'iconfont icon-why-yanjing'} onClick={this.changeShow}></span>}
            ></InputItem>
          </div>
          <WingBlank size='lg'>
            <div>
              密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
            </div>
          </WingBlank>
          <WingBlank size='lg'>
            <Button className='code-next' type='warning' disabled={isDisabled} onClick={this.completeHandle}>
              完成
            </Button>
          </WingBlank>
          <WingBlank size='lg'>
            遇到问题了?
            <Link to=''>请联系客服</Link>
          </WingBlank>
        </WingBlank>
      </div>
    )
  }
}

export default createForm()(VerifyPassword)