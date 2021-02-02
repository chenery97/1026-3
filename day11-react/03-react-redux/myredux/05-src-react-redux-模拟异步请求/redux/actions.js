import { DECREMENT, INCREMENT } from './constants'

function increment(data) {
  console.log(data)
  return {
    type: INCREMENT,
    data
  }
}

function decrement(data) {
  console.log(data)
  return {
    type: DECREMENT,
    data
  }
}

function incrementAsync() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment(Math.floor(Math.random() * (10 - 1) + 1)))
    }, 2000)
  }
}

function decrementAsync() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(decrement(Math.floor(Math.random() * (10 - 1) + 1)))
    }, 2000)
  }
}

export {
  increment,
  decrement,
  incrementAsync,
  decrementAsync
}