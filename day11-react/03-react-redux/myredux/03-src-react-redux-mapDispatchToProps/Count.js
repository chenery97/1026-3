import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from './redux/actions'

class Count extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>{this.props.count}</h1>
        <button onClick={() => {
          this.props.incre(1)
        }}>increment</button>
        <button onClick={() => {
          this.props.decre(1)
        }}>decrement</button>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    count: state.count
  }
}
function mapDispatchToProps(dispatch) {
  return {
    incre(data) {
      dispatch(increment(data))
    },
    decre(data) {
      dispatch(decrement(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Count)