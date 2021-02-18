import { connect } from 'react-redux'
import Footer from '../views/footer/Footer'
import {changeAllDone, delCompleteTodos} from '../redux/actions'

export default connect(state => ({ todos: state.todos }), { changeAllDone, delCompleteTodos })(Footer)
