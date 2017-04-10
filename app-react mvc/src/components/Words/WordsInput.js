import React from 'react'
import { Input } from 'antd'

class WordsInput extends Component{
	render(){
		return(
			<form onSubmit={
				(e)=>{
					e.preventDefault()
				    this.handleSubmit()
				}
			}>
			<Input placeholder="录入涛哥名言" />
			</form>
		)
	}
}

export default WordsInput