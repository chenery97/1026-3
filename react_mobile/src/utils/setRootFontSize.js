// 解决适配问题
function setRootFontSize() {
  // const rootFontSize = document.documentElement.clientWidth * 100 / 375
  const rootFontSize = document.documentElement.clientWidth / 10
  document.documentElement.style.fontSize = rootFontSize + 'px'
}

setRootFontSize()

window.onresize = setRootFontSize
