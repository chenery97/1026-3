import { connect } from 'react-redux'
import Footer from '../pages/Footer/Footer'
import { changeAllTodos, clearCompleted } from '../redux/actions'
export default connect(state => ({ todos: state.todos }), { changeAllTodos, clearCompleted })(Footer)