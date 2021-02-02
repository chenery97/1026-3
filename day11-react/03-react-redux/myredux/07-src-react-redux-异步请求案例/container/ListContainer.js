import { connect } from 'react-redux'
import List from '../pages/List'
import { getUserDataAsync, setFlag } from '../redux/actions'

export default connect(
  state => ({ users: state.users, flag: state.flag }),
  { getUserDataAsync, setFlag }
)(List)