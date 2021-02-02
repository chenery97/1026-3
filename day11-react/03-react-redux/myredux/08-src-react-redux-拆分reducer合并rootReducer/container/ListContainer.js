import { connect } from 'react-redux'
import List from '../pages/List'
import { getUserDataAsync, setFlag } from '../redux/actions'

export default connect(
  state => ({ users: state.userReducer.users, flag: state.flagReducer.flag }),
  { getUserDataAsync, setFlag }
)(List)