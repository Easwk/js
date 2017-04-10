import xhr from './xhr/'

class MsgService {
	add (msgBody) {
	    return xhr({
	      method: 'post',
	      url: '/msg',
	      body: msgBody
	    })
	}
}

export default new MsgService()