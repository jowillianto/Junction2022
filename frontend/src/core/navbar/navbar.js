import React from 'react'
import { Link } from 'react-router-dom'
import { NavigateParamsContext } from '../../routes/utils'
import './navbar.css'

export default class Navbar extends React.Component{
  static contextType = NavigateParamsContext
  constructor(props){
    super(props)
    this.linkList   = [{
      href  : '/', 
      name  : 'Home'
    }, {
      href  : '/ngo-companies', 
      name  : 'NGO List'
    }]
  }
  navButton = (href : String, name : String) => {
    return (
      <Link to = {href}>{name}</Link>
    )
  }
  renderLeft = () => {
    return (
      <div className = 'navbar-left'>
        <div className = 'navbar-left-logo'>
          <p>Logo </p>
        </div>
        <div className = 'navbar-left-button'>
          {this.linkList.map(
            (val) => this.navButton(
              val.href, val.name
            )
          )}
        </div>
      </div>
    )
  }
  renderRight = () => {
    if(this.props.isLoggedIn)
      return (
        <div className = 'navbar-right'>
          <div className = 'navbar-right-donate'>
            <Link to = '/donate'>Donate</Link> 
          </div>
          <div className = 'navbar-right-usr-icn'>
            <Link to = '/profile'></Link>
          </div>
        </div>
      )
    else
      return(
        <div className = 'navbar-right'>
          <div className = 'navbar-right-login'>
            <Link to = '/login'>Login</Link> 
          </div>
          <div className = 'navbar-right-usr-icn'>
            <Link to = '/register'>Register</Link>
          </div>
        </div>
      )
  }
  render(){
    return(
      <nav>
        {this.renderLeft()}
        {this.renderRight()}
      </nav>
    )
  }
}