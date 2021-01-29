import { Component } from 'react'

export default class Position extends Component {
  state = {
    x: 0,
    y: 0
  }
  mousemoveHandle = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }
  componentDidMount() {
    window.addEventListener('mousemove', this.mousemoveHandle)
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mousemoveHandle)
  }
  render() {
    return this.props.children(this.state)
  }
}
