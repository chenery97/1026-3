import { useState, useEffect } from 'react'

export default function Position(props) {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const state = {
    x,
    y
  }

  function mousemoveHandle(e) {
    setX(e.clientX)
    setY(e.clientY)
    console.log(e.clientX, e.clientY)
  }

  useEffect(() => {
    console.log('挂载/更新>>>>')
    window.addEventListener('mousemove', mousemoveHandle)
    return () => {
      console.log('即将卸载>>>>')
      window.removeEventListener('mousemove', mousemoveHandle)
    }
  }, [])

  return props.render(state)

}
