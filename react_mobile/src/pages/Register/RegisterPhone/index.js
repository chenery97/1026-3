import React, { Component } from 'react'
import { NavBar, Icon, InputItem, Button, WhiteSpace, WingBlank, Modal, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import { verifyPhone } from '../../../api/register'

console.log('registerPhone组件加载了')
class index extends Component {
  // 设置react调式工具展示的组件名
  static displayName = 'RegisterPhone'
  // 定义状态
  state = {
    // 下一步按钮的状态
    isDisabled: true,
    countryCode: 86,
  }
  // 自定义手机号校验规则
  validator = (rule, value) => {
    this.setState({
      isDisabled: /^1[3-9]\d{9}$/.test(value) ? false : true
    })
  }
  // 发送异步请求校验手机号是否已注册
  verifyPhoneHandle = async () => {
    const { getFieldValue } = this.props.form
    // 获取表单项中的手机号
    const phone = getFieldValue('phone')
    // 获取异步请求的结果
    const res = await verifyPhone(phone)
    // 判断手机号是否通过校验
    if (res.data.success) {
      Modal.alert(null, '我们将发送短信/语音验证码至:' + phone, [
        {
          text: '不同意', style: 'default'
        },
        {
          text: '同意', onPress: async () => {
            // 往本地缓存中存储手机号
            localStorage.setItem('phone', phone)
            // 跳转到验证码校验页面
            this.props.history.push('/register/code', { from: '/register/phone' })
          }, style: { backgroundColor: 'red', color: '#fff' }
        },
      ]);
    } else {
      // 不通过提示用户
      Toast.fail(res.data.message, 1.5)
    }
  }
  componentDidMount() {
    // console.log('registerPhone组件挂载了')
    // 组件挂载成功弹窗提示
    Modal.alert('注册协议及隐私政策', '在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式签署以下协议，请您务必仔细阅读、充分理解协议中的条款后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）：《硅谷用户注册协议》《硅谷隐式政策》', [
      {
        text: '不同意', onPress: () => {
          this.props.history.goBack()
        }, style: 'default'
      },
      { text: '同意', style: { backgroundColor: 'red', color: '#fff' } },
    ]);
    const countryCode = this.props.location.state && this.props.location.state.countryCode
    if (countryCode) {
      this.setState({
        countryCode
      })
    }
  }
  render() {
    const { countryCode } = this.state
    const { getFieldProps } = this.props.form
    return (
      <div className='wrap'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color='black' onClick={() => {
            this.props.history.goBack()
          }} />}
        >硅谷注册</NavBar>
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
              this.props.history.push('/country', { from: '/register/phone' })
            }}>
              <span>+{countryCode}</span>
              <Icon type='down' />
            </div>
          </InputItem>
          <WhiteSpace size='xl' />
          <WhiteSpace size='xl' />
          <WingBlank>
            <Button className='login-btn' type="warning" disabled={this.state.isDisabled} onClick={this.verifyPhoneHandle}>下一步</Button>
          </WingBlank>
        </WingBlank>
      </div>
    )
  }
}

export default createForm()(index)