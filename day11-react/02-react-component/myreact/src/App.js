import React, { Component } from 'react'
import Position from './Position'
import Cat from './components/Cat'
import Mouse from './components/Mouse'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>猫抓老鼠</h1>
        <Position render={data => <Mouse state={data} />}></Position>
        <Position render={data => <Cat state={data} />}></Position>
      </div>
    )
  }
}
