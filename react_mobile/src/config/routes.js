import React from 'react'

// 组件懒加载，只加载用户所在页面需要的组件，没用到的不加载
const Home = React.lazy(() => import('../pages/Home'))
const Login = React.lazy(() => import('../pages/Login'))
const RegisterPhone = React.lazy(() => import('../pages/Register/RegisterPhone'))
const RegisterCode = React.lazy(() => import('../pages/Register/RegisterCode'))
const RegisterPassword = React.lazy(() => import('../pages/Register/RegisterPassword'))
const Country = React.lazy(() => import('../pages/Country'))

const routes = [{
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register/phone',
    component: RegisterPhone
  },
  {
    path: '/register/code',
    component: RegisterCode
  },
  {
    path: '/register/password',
    component: RegisterPassword
  },
  {
    path: '/country',
    component: Country
  }
]

export {
  routes
}