import React from 'react'
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom'
import PrivateRoute from './privateroute'
import Loading from '../core/loading/loading'
import {NavigateParams, UserContext} from './utils'
import Navbar from '../core/navbar/navbar'

// Imports
const Home        = React.lazy(() => import('../pages/home/home'))
const Login       = React.lazy(() => import('../pages/login/login'))
const Done        = React.lazy(() => import('../pages/done/done'))
const Donate      = React.lazy(() => import('../pages/donate/donate'))
const Profile     = React.lazy(() => import('../pages/profile/profile'))
const Transaction = React.lazy(() => import('../pages/transaction/transaction'))
const Register    = React.lazy(() => import('../pages/register/register'))
const NgoList     = React.lazy(() => import('../pages/donate/donate'))

export default class Routing extends React.Component{
  static contextType   = UserContext
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn  : null
    }
  }
  componentDidMount(){
    this.updateLoggedIn()
  }
  updateLoggedIn = () => {
    if(this.context.user != null){
      this.context.user.checkLogin()
      .then((resp) => this.setState({isLoggedIn : true}))
      .catch((rej) => this.setState({isLoggedIn : false}))
    }
  }
  render(){
    return(
      <Router>
        <React.Suspense fallback = {<Loading />}>
          <Navbar isLoggedIn = {this.state.isLoggedIn}/>
          <Routes>
            <Route path = '/' element = {<Home />} />
            <Route path = '/login' element = {<Login 
              user = {this.context.user}
              setUser = {this.context.setUser}
            />} />
            <Route path = '/register' element = {<Register 
              user = {this.context.user}
              setUser = {this.context.setUser}
            />} />
            <Route path = '/profile' element = {
              <PrivateRoute to = '/profile'>
                <Profile user = {this.context.user}/>
              </PrivateRoute>
            }/>
            <Route path = '/ngo-companies' element = {<NgoList />}/>
          </Routes>
        </React.Suspense >
      </Router>
    )
  }
}