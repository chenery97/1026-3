// 自定义hook
import { useState, useEffect } from 'react'
// 自定义hook函数名要使用use开头
export default function usePosition() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  function mousemoveHandle(e) {
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    console.log('挂载/更新>>>>')
    window.addEventListener('mousemove', mousemoveHandle)
    return () => {
      console.log('即将卸载>>>>')
      window.removeEventListener('mousemove', mousemoveHandle)
    }
  }, [])

  return {x, y}

}
