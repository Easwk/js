import { rootPath, errHandler } from './config'
//=========================================================
// deferred的用法参考阮一峰:
// http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html
//=========================================================
const xhr = ({ url, body = null, method = 'get' }) => {
  const defer = $.Deferred()

  $.ajax({
    type: method,
    url: rootPath + url,
    data: body,
    beforeSend: function(request){
      request.setRequestHeader('Content-type','application/json')
    }
    /*xhrFields: { // 跨域允许带上 cookie
      withCredentials: ['http://localhost:9090']
    },
    crossDomain: true*/
  })
  .done(defer.resolve)
  .fail(errHandler)

  return defer.promise()
}

export default xhr
