// 此处配置 根访问路径 以及 全局错误处理

export const rootPath = 'http://localhost:8080'

export const errHandler = (e) => {
  alert('[ XHR:Failed ] 详情请看控制台')
  console.error(e)
}
