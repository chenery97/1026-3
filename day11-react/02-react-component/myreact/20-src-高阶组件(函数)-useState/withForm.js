import React, { useState } from 'react'

export default function withForm(MyComponent) {

  return function WithForm() {
    WithForm.displayName = 'with' + MyComponent.name
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const state = {
      username,
      password,
      repassword
    }

    function updateHandle(name) {
      return (e) => {
        name === 'username' && setUsername(e.target.value)
        name === 'password' && setPassword(e.target.value)
        name === 'repassword' && setRepassword(e.target.value)
      }
    }
    return (
      <MyComponent {...state} update={updateHandle}></MyComponent>
    )
  }
}
