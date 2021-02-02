import { connect } from 'react-redux'
import List from '../pages/List/List'

export default connect(state => ({ todos: state.todos }), {})(List)