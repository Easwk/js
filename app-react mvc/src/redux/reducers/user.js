import createReducer from 'UTIL/createReducer'
import { HANDLER_ACTIONS } from 'ACTION/user'
import initState from 'STORE/initState'

export default createReducer(initState.userData,HANDLER_ACTIONS) 