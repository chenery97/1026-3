const author = 'module2'
const age = 23

/*
  module.exports的使用
    - module.exports = xxx
    - module.exports = {xxx: xxx}
    - module.exports.xxx = xxx
*/
module.exports = author
module.exports = {
  author
}

module.exports.age = age