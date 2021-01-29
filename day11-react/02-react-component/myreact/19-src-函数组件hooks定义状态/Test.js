import React, {useState, useEffect} from 'react'

export default function Test() {
  let [num, setNum] = useState(0)
  function addHandle() {
    setNum(++num)
  }
  useEffect(() => {
    console.log('挂载/更新>>>>> 1')
    return () => {
      console.log('即将卸载>>>>> 1')
    }
  }, [num])
  useEffect(() => {
    console.log('挂载/更新>>>>> 2')
    return () => {
      console.log('即将卸载>>>>> 2')
    }
  }, [])
  return (
    <>
      <h1>Test组件</h1>
      <p>{num}</p>
      <button type="button" onClick={addHandle}>Test组件add按钮</button>
    </>
  )
}