export default function reducer(state = { count: 0, msg: 'hehe' }, action) {
  switch (action.type) {
    case 'INCREMENT': 
      return {
        ...state,
        count: state.count + action.data
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - action.data
      }
    default:
      return state
  }
}