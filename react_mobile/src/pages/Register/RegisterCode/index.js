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
  Toast,
} from 'antd-mobile'
import { sendCode } from '../../../api/login'
import { verifyCode } from '../../../api/register'
import './index.css'
import msg from './msg.png'

const initCount = 5
class VerifyCode extends Component {
  state = {
    isSend: true,
    count: initCount,
    isDisabled: true
  }
  // 发送手机验证码处理函数
  getPhoneCode = async () => {
    // 如果获取验证码按钮不可用，直接结束
    if (!this.state.isSend) return
    // 获取倒计时
    let { count } = this.state
    // 获取手机号
    const phone = localStorage.getItem('phone')
    // 发送验证码
    const res = await sendCode(phone)
    // 判断响应结果
    if (res.data.success) {
      // 倒计时效果
      this.timer = setInterval(() => {
        count--
        if (count === 0) {
          clearInterval(this.timer)
          this.setState({
            isSend: true,
            count: initCount
          })
          return
        }
        this.setState({
          isSend: false,
          count
        })
      }, 1000)
      // 发送成功提示用户
      Toast.success('验证码发送成功，请注意查收', 2)
    } else {
      Toast.fail('验证码发送失败，请重新点击获取')
    }
  }
  // 手机验证码规则校验处理函数
  validator = (rule, value) => {
    this.setState({
      isDisabled: /^\d{6}$/.test(value) ? false : true
    })
  }
  // 检测手机验证码处理函数
  checkCode = async () => {
    // 获取验证码
    const code = this.props.form.getFieldValue('code')
    // 获取手机号
    const phone = localStorage.getItem('phone')
    // 发送验证码校验请求
    const res = await verifyCode(phone, code)
    // 判断校验结果
    if (res.data.success) {
      this.props.history.push('/register/password', { from: '/register/code' })
    } else {
      Toast.fail('验证码错误', 2)
    }
  }
  componentDidMount() {
    // 挂载成功发送验证码
    this.getPhoneCode()
  }
  render() {
    const { isSend, count, isDisabled } = this.state
    const { getFieldProps } = this.props.form
    return (
      <div className='wrap'>
        <NavBar
          mode='light'
          icon={<Icon type='left' color='#000' onClick={() => {
            this.props.history.goBack()
          }} />}
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
            <div>
              我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
            </div>
          </WingBlank>
          <WhiteSpace size='lg'></WhiteSpace>

          <div className='code'>
            <InputItem {...getFieldProps('code', {
              rules: [
                {
                  validator: this.validator
                }
              ]
            })} clear placeholder='请输入手机验证码'></InputItem>
            <button className={isSend ? 'code-btn active' : 'code-btn'} onClick={this.getPhoneCode}>{isSend ? `点击获取` : `重新发送(${count}s)`}</button>
          </div>
          <WingBlank size='lg'>
            <Button className='code-next' type='warning' disabled={isDisabled} onClick={this.checkCode}>
              下一步
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

export default createForm()(VerifyCode)