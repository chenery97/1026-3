import React from 'react'

export default function Register (props) {
  const { username, password, repassword, update } = props
  return (
    <div>
      <h1>注册</h1>
      <form>
        用户名:
          <input
          type='text'
          value={username}
          onChange={update('username')}
        />
        <br />
          密码:
          <input
          type='password'
          value={password}
          onChange={update('password')}
        />
        <br />
          确认密码:
          <input
          type='password'
          value={repassword}
          onChange={update('repassword')}
        />
        <input type='button' value='注册' />
      </form>
    </div>
  )
}
