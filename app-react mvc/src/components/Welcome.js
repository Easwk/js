import React from 'react'
import { Link } from 'react-router'

const Welcome = () => (
  <div className="jumbotron">
    <h1>罗韬说:</h1>
    <p>唯有爱与美食不可辜负，罗老师用其丰富的人生经历告诫我们做人之道。想要学习到更多的知识，请猛戳下方按钮</p>
    <p><Link to="words" className="btn btn-primary btn-lg">经典语录</Link></p>
    <p><Link to="fans" className="btn btn-primary btn-lg">成为粉丝</Link></p>
  </div>
)

export default Welcome
