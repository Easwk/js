import msgService from 'SERVICE/msgService'

const ADD_MSG = 'ADD_MSG'

const addMsg = msgBody => dispatch =>
  msgService
    .add(msgBody)
    .then(msg => {
      dispatch({
        type: ADD_MSG,
        payload: msg
      })
      return msg //可以链式调用
})

export default {
	addMsg
}

export const HANDLER_ACTIONS ={
	[ADD_MSG]: (msgs, { payload }) => [ ...msgs, payload ],
}