import React, { Component } from 'react'
import { connect } from 'react-redux'

class Count extends Component {
  render() {
    // console.log(this.props)
    return (
      <div>
        <h1>{this.props.count}</h1>
        <button onClick={() => {
          this.props.dispatch({type: 'INCREMENT', data: 1})
        }}>increment</button>
        <button onClick={() => {
          this.props.dispatch({type: 'DECREMENT', data: 1})
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

export default connect(mapStateToProps)(Count)