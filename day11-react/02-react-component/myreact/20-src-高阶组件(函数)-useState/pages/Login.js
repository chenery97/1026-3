import React from 'react'

export default function Login (props) {
  const { username, password, update } = props
  return (
    <div>
      <h1>登录</h1>
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
        <input type='button' value='登录' />
      </form>
    </div>
  )
}
