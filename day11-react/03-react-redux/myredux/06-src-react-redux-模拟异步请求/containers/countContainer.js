import { connect } from 'react-redux'
import Count from '../Count'
import { increment, decrement, incrementAsync, decrementAsync } from '../redux/actions'

export default connect(
  (state) => ({ count: state.count }),
  { increment, decrement, incrementAsync, decrementAsync }
)(Count)