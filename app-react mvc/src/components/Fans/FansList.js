import React, { Component } from 'react'
import { Table } from 'antd'
class FansList extends Component{
	constructor(props) {
		super(props);
		this.state={
			dataSource:[
				{
					key: 1,
					name: '金城武',
  					age: 32,
  					address: '成都市牛市口牛市街1号'
				},
				{
					key: 2,
					name: '吴彦祖',
  					age: 35,
  					address: '成都市牛市口牛市街2号'
				},
				{
					key: 3,
					name: '彭于晏',
  					age: 33,
  					address: '成都市牛市口牛市街3号'
				},
				{
					key: 4,
					name: '科比布莱恩特',
  					age: 35,
  					address: '成都市牛市口牛市街4号'
				},
				{
					key: 5,
					name: '奥尼尔',
  					age: 40,
  					address: '成都市牛市口牛市街5号'
				},
				{
					key: 6,
					name: '德莱文',
  					age: 35,
  					address: '成都市牛市口牛市街6号'
				},
				{
					key: 7,
					name: '德玛西亚',
  					age: 35,
  					address: '成都市牛市口牛市街7号'
				},
				{
					key: 8,
					name: '后羿',
  					age: 35,
  					address: '成都市牛市口牛市街8号'
				}
			],
			columns:[
				{
					title: '姓名',
  					dataIndex: 'name',
  					key: 'name'
				},
				{
					title: '年龄',
  					dataIndex: 'age',
  					key: 'age'
				},
				{
					title: '住址',
  					dataIndex: 'address',
  					key: 'address'
				}
			]
		}
	}

	render(){
		return(
			<Table dataSource={this.state.dataSource} columns={this.state.columns} />
		)
	}	
}

export default FansList