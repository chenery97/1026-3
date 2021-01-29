import React from 'react'
import MouseUrl from '../assets/mouse.gif'

export default function Mouse(props) {
  let { x, y } = props.state
  return (
    <div>
      <img
        src={MouseUrl}
        alt=''
        style={{ position: 'absolute', left: x, top: y, width: 100 }}
      />
    </div>
  ) 
}
