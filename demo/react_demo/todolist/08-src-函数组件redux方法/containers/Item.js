import { connect } from 'react-redux'
import Item from '../views/item/Item'
import { changeTodoDone, delTodo } from '../redux/actions'

export default connect(state => ({ todos: state.todos }), { changeTodoDone, delTodo })(Item)