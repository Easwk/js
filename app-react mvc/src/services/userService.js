import xhr from './xhr/'

 class UserService{
 	// 1. 检查用户登录
 	checkLogin(username){
 		return xhr({
 			url:'/user/checkUser/'+username,
 		})
 	}
 	// 2. 用户登录
 	login(UserData){
 		return xhr({
 			url:'/user/login',
 			body:UserData,
 			method:'post'
 		})
 	}
 	// 3. 用户登录 get
 	login1(username,password){
 		return xhr({
 			url: '/user/login1/'+username+'/'+password,
 			method:'get'
 		})
 	}
 }

 export default new UserService()