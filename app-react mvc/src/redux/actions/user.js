import userService from 'SERVICE/userService'

const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'

// Action Creator 方式创建action

const logDone = (userData) =>({
	type : LOG_IN,
	payload : userData
})

const login = (formData) =>{
	return dispatch=>{
		userService.login(JSON.stringify(formData)).then( re => dispatch(logDone(re)))
	}
}

const login1 = (username,password) =>{
	return dispatch=>{
		userService.login1(username,password).then( re => dispatch(logDone(re)))
	}
}

const logout = ()=>{
	return dispatch=>({
		type : LOG_OUT
	})
}

export default {
	logDone , login , login1
}


//处理action的handler函数
export const HANDLER_ACTIONS = {
	[LOG_IN] : (userData,{ payload })=> payload ,
	[LOG_OUT] : () => null
}