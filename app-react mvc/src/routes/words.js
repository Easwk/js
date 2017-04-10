import { injectReducer } from 'REDUCER'
import createContainer from 'UTIL/createContainer'
import userAuth from 'UTIL/userAuth'

const connectComponent = createContainer(
  ({ userData, words }) => ({ userData, words }), // mapStateToProps
  require('ACTION/words').default               // mapActionCreators
)

export default {
	path: 'words',

	getComponent(nextState,cb){
		require.ensure([],(require)=>{
			//注入reducer
			injectReducer('words', require('REDUCER/words').default)
			
			cb(null,require("COMPONENT/Words/WordsView").default)
		},'Words')
	},
	childRoutes:[
	 //    // 获取所有words
		// {
		// 	path:'getallwords',
		// 	getComponent(nextState,cb){
		// 		require.ensure([],(require)=>{
		// 			cb(null,require("COMPONENT/Words/WordsList").default)
		// 		},'Words')
		// 	},
		// },
		//新增words
		// {
		// 	path:'addwords',
		// 	getComponent(nextState,cb){
		// 		require.ensure([],(require)=>{
		// 			cb(null,require("COMPONENT/Words/WordsInput").default)
		// 		},'WordsInput')
		// 	},
		//  onEnter: userAuth
		// },
		// //删除words
		// {
		// 	path:'delete/:wordsid',
		// 	getComponent(nextState,cb){
		// 		require.ensure([],(require)=>{
		// 			cb(null,require("COMPONENT/Words/WordsList").default)
		// 		},'Words')
		// 	},
		//	onEnter: userAuth
		// }
	]
}