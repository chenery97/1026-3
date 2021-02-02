import { INCREMENT, DECREMENT } from './constants'

function increment(data) {
  return {
    type: INCREMENT,
    data
  }
}
function decrement(data) {
  return {
    type: DECREMENT,
    data
  }
}

function incrementAsync() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment(2))
    }, 1000)
  }
}
function decrementAsync() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(decrement(2))
    }, 1000);
  }
}
export {
  increment,
  decrement,
  incrementAsync,
  decrementAsync
}