import React from 'react'
import { Carousel } from 'antd'
import 'ASSET/less/index'


const Words = ({children , location})=>(
	<div className="jumbotron word-page">
		<div className="word-page1">
			<Carousel autoplay className="word-page2">
		    <div><h3>“我有科比退役时候的签名球服”</h3></div>
		    <div><h3>“请问你王者荣耀哪个区，带你飞”</h3></div>
		    <div><h3>“易志伟就是一个老司机”</h3></div>
		    <div><h3>“让我们红尘作伴活的潇潇洒洒”</h3></div>
		    <div><h3>“一树梨花压海棠”</h3></div>
			</Carousel>
			<span className="word-foot"><h3>--罗韬</h3></span>
		</div>
		{ children }
	</div>
)

export default Words