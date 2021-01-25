// 函数组件
function Footer(props) {
  /* 函数组件要拿到父组件传过来的数据，要定义一个props形参接收 */
  // console.log(props)
  return <footer style={{ color: 'skyblue', fontSize: 40 }}>我是尾部react组件{props.foot.count}</footer>
}

export default Footer