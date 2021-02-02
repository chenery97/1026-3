import React, { Component } from 'react'

export default class Count extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>{this.props.count}</h1>
        <button onClick={() => {
          this.props.increment(1)
        }}>increment</button>
        <button onClick={() => {
          this.props.decrement(1)
        }}>decrement</button>
      </div>
    )
  }
}

