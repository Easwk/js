import React, { Component , PropTypes } from 'react'
import userService from 'SERVICE/userService'
import 'ASSET/less/index'

export default class LoginForm extends Component{
	constructor(props){
		super(props)
		this.state={
			username:'',
			password:''
		}
		this.handleUserNameChange = this.handleUserNameChange.bind(this)
		this.handlePassWordChange = this.handlePassWordChange.bind(this)
	}

	static contextTypes = {
    	router: PropTypes.object.isRequired
	}

	//获取用户输入用户名
	handleUserNameChange = (evt)=>{
		this.setState({username: evt.target.value})
	}

	handlePassWordChange = (event)=>{
		this.setState({password: event.target.value})
	}

	handleSubmit = ()=>{
		let username = this.state.username
		if(!username) return alert("用户名不能为空")
		let password = this.state.password
		if(!password) return alert("密码不能为空")
		userService.checkLogin(username).then(res=>{
			if(res.code == 0){
				alert(res.info)
				return this.context.router.replace("/")
			}
		})
		// 发送action
		let userData = {
			username : username,
			password : password
		}
		this.props.login(userData)
	}
	render(){
		return(
			<form role="search" className="navbar-form navbar-right" onSubmit={
					(e)=>{
						e.preventDefault() // 防页面跳转
						this.handleSubmit()
					}
				}>
				<div className="form-group">
					<input className="form-control" type="text" 
					       value={this.state.username} placeholder="请输入用户名" onChange={this.handleUserNameChange} />
					<input className="form-control btn-mar-left"
					       type="password" placeholder="请输入密码" onChange={this.handlePassWordChange} />
				</div>
				<button type="submit" className="btn btn-success btn-mar-left">登录</button>
			</form>
		)
	}
}