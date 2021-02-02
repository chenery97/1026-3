import { connect } from 'react-redux'
import Item from '../pages/Item/Item'
import { setIsDone, delTodo } from '../redux/actions'

export default connect(null, { setIsDone, delTodo })(Item)