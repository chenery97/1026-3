import { connect } from 'react-redux'
import Header from '../views/header/Header'
import { addTodo } from '../redux/actions'

export default connect(null, { addTodo })(Header)
