import createReducer from 'UTIL/createReducer'
import { HANDLER_ACTIONS } from 'ACTION/words'
import initState from 'STORE/initState'

export default createReducer(initState.words,HANDLER_ACTIONS) 