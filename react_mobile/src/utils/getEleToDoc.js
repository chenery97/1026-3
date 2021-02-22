export function getEleToDoc(ele) {
  let obj = ele
  const leftTop = {
    l: 0,
    t: 0
  }
  while (obj) {
    if (obj === ele) {
      leftTop.l += obj.offsetLeft + obj.clientLeft
      leftTop.t += obj.offsetTop + obj.clientTop
    } else {
      leftTop.l += obj.offsetLeft
      leftTop.t += obj.offsetTop
    }
    obj = obj.offsetParent
  }
  return leftTop
}