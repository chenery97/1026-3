import {DECREMENT, INCREMENT} from './constants'

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

export {
  increment,
  decrement
}