;
(async function () {
  const oUl = document.querySelector('.nav ul')
  const oCon = document.querySelector('.con')
  const re = await axios.get('http://localhost:5000/getNav')
  const { NAV } = re.data
  let str = ''
  NAV.forEach(item => {
    str += `<li><a href="#">${item}</a></li>`
  })
  oUl.innerHTML = str
  const oAs = oUl.querySelectorAll('li a')
  oUl.onclick = async function (e) {
    if (e.target.nodeName !== 'A') return
    if (e.target.dataset.show) return
    const fileName = e.target.innerText
    const re = await axios.post('http://localhost:5000/getActicle', {
      fileName
    })
    oCon.innerHTML = re.data
    oAs.forEach(item => {
      delete item.dataset.show
    })
    e.target.dataset.show = true

    const oPres = oCon.querySelectorAll('pre')
    Array.from(oPres).reduce((prev, item) => {
      const lang = item.className.slice(5)
      if (!prev.includes(lang)) {
        document.styleSheets[0].addRule('pre.' + item.className + '::after', 'content:"' + lang + '"')
        return [...prev, lang]
      }
      return prev
    }, [])
  }
})()