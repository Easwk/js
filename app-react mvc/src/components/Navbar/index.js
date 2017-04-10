import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import LoginForm from './LoginForm'
import LogoutDropdown from './LogoutDropdown'

@connect(
  ({userData}) => ({userData}),
  require('ACTION/user').default
)
export default class Navbar extends Component {

  render () {

    let {
      userData, login, logout, login1, // 通过 connect 获取
      location: { pathname }   // 通过 App 传入
    } = this.props

    return (
      <div className="row clearfix">
        <div className="col-md-12 column">
          <nav className="navbar navbar-default" role="navigation">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#nav-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to='/' className="navbar-brand">
                听罗老师讲故事
              </Link>
            </div>
            <div className="collapse navbar-collapse" id="nav-collapse">
              <ul className="nav navbar-nav">
                <li className={pathname === '/' && 'active'}>
                  <IndexLink to='/'>
                    欢迎页
                  </IndexLink>
                </li>
                <li className={pathname.startsWith('/words') && 'active'}>
                  <Link to='/words'>
                    经典语录
                  </Link>
                </li>
                <li className={pathname.startsWith('/fans') && 'active'}>
                  <Link to='/fans'>
                    成为粉丝
                  </Link>
                </li>
              </ul>
              {
                userData ? <LogoutDropdown userData={userData} logout={logout}/> : <LoginForm login={login}/>
              }
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
