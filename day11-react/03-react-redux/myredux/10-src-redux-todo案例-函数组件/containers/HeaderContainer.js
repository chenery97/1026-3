import { connect } from 'react-redux'
import Header from '../pages/Header/Header'
import { addTodo } from '../redux/actions'

export default connect(null, { addTodo })(Header)