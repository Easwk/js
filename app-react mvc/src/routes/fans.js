

export default {

	path: 'fans',

	getComponent(nextState,cb){
		require.ensure([],(require)=>{
			cb(null,require('COMPONENT/Fans/FansList').default)
		},'FansList')
	}
}