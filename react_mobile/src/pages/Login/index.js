import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NavBar, Icon, InputItem, WingBlank, Button, WhiteSpace, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import { sendCode, login } from '../../api/login'

console.log('login组件加载了')
class Login extends Component {
  state = {
    countryCode: 86,
    isDisabled: true,
    isSend: false,
    count: 5,
    loginBtnDisabled: true
  }
  toRegister = () => {
    this.props.history.push('/register/phone', { from: '/login' })
  }
  // 输入框规则验证
  validator = (rule, value) => {
    switch (rule.field) {
      case 'phone':
        const isDisabled = !/^1[3-9]\d{9}$/.test(value)
        // 设置状态
        this.setState({
          isDisabled,
        })
        break
      case 'code':
        const loginBtnDisabled = !/^\d{6}$/.test(value)
        // 设置状态
        this.setState({
          loginBtnDisabled
        })
        break
      default:
        break
    }
  }
  getPhoneCode = async () => {
    // 获取输入框的手机号
    const { getFieldValue } = this.props.form
    const phone = getFieldValue('phone')
    // 解构count
    let { count } = this.state
    // 发送获取验证码请求
    const res = await sendCode(phone)
    // 设置倒计时
    this.timer = setInterval(() => {
      count--
      if (count === 0) {
        clearInterval(this.timer)
        this.setState({
          count: 5,
          isSend: false,
          isDisabled: false
        })
        return
      }
      this.setState({
        count,
        isSend: true,
        isDisabled: true
      })
    }, 1000)
    // 判断发送结果，给用户提示
    if (res.data.success) {
      Toast.success('验证码发送成功', 2)
    } else {
      Toast.fail('验证码发送失败，请重新获取', 2)
    }
  }
  sendLoginRequest = async () => {
    // 获取手机号和验证码
    const { getFieldValue } = this.props.form
    const phone = getFieldValue('phone')
    const code = getFieldValue('code')
    // 发送登录请求
    const res = await login(phone, code)
    // 根据请求结果，提示用户
    if (res.data.success) {
      Toast.success('登录成功', 2)
      this.props.history.push('/home', { from: '/login' })
    } else {
      Toast.fail(res.data.message, 2)
    }
  }
  componentDidMount() {
    // console.log('login组件挂载了')
    const countryCode = this.props.location.state && this.props.location.state.countryCode
    if (countryCode) {
      this.setState({
        countryCode
      })
    }
  }
  render() {
    const { isDisabled, countryCode, isSend, count, loginBtnDisabled } = this.state
    const { getFieldProps } = this.props.form
    return (
      <div className='wrap'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color='black' />}
        >硅谷注册登录</NavBar>
        <WingBlank>
          <InputItem
            {...getFieldProps('phone', {
              rules: [
                {
                  validator: this.validator
                }
              ]
            })}
            clear
            placeholder="请输入手机号"
          >
            <div className='ipt-phone' onClick={() => {
              this.props.history.push('/country', { from: '/login' })
            }}>
              <span>+{countryCode}</span>
              <Icon type='down' />
            </div>
          </InputItem>
          <div className='ipt-phone'>
            <InputItem
              {...getFieldProps('code', {
                rules: [
                  {
                    validator: this.validator
                  }
                ]
              })}
              placeholder="请输入手机验证码"
            >
            </InputItem>
            <button
              className={isDisabled ? 'ipt-code' : 'ipt-code active'}
              onClick={this.getPhoneCode}
              disabled={isDisabled}>
              {isSend ? `重新获取(${count}s)` : '获取验证码'}
            </button>
          </div>
          <WhiteSpace size='xl' />
          <WingBlank>
            <Button className='login-btn' type="warning" disabled={loginBtnDisabled} onClick={this.sendLoginRequest}>登录</Button>
            <WhiteSpace size='xl' />
            <div className='login-nav'>
              <div>账号密码登录</div>
              <div onClick={this.toRegister}>手机快速注册</div>
            </div>
            <div className='login-other'>
              <div className='line'></div>
              <div className='text'>其他登录方式</div>
              <div className='line'></div>
            </div>
            <div className='other-oauth'>
              <i className='iconfont icon-huaban88' onClick={() => {
                // 想github提供的接口发送第三方授权请求
                window.location.href = 'https://github.com/login/oauth/authorize?client_id=cb862da50a4563f157db'
              }}></i>
              <i className='iconfont icon-changgewechat'></i>
              <i className='iconfont icon-qq'></i>
            </div>
            <div className='login-footer'>
              <span>未注册的手机号验证后将自动创建硅谷账号，登录即代表您已同意</span>
              <Link to=''>硅谷隐式政策</Link>
            </div>
          </WingBlank>
        </WingBlank>
      </div>
    )
  }
}

export default createForm()(Login)