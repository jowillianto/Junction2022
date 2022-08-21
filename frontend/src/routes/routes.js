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
const NgoList     = React.lazy(() => import('../pages/ngo_list/ngo_list'))
const NgoDetail   = React.lazy(() => import('../pages/ngo_detail/ngo_detail'))

export default class Routing extends React.Component{
  static contextType   = UserContext
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn  : null
    }
  }
  updateLoggedIn = () => {
    if(this.state.isLoggedIn !== true){
      if(this.context.user !== null){
        this.context.user.checkLogin()
        .then((resp) => this.setState({isLoggedIn : true}))
        .catch((rej) => this.setState({isLoggedIn : false}))
      }
      else{
        this.setState({isLoggedIn : false})
      }
    }
  }
  componentDidMount(){
    // this.updateLoggedIn()
  }
  componentDidUpdate(){
    this.updateLoggedIn()
  }
  render(){
    return(
      <Router>
        <React.Suspense fallback = {<Loading />}>
          <Navbar isLoggedIn = {this.state.isLoggedIn}/>
          <Routes>
            <Route path = '/' element = {<Home 
              isLoggedIn = {this.state.isLoggedIn}
            />
            } />
            <Route path = '/login' element = {
              <NavigateParams>
                <Login 
                  user = {this.context.user}
                  setUser = {this.context.setUser}
                />
              </NavigateParams>
            } />
            <Route path = '/register' element = {
              <NavigateParams>
                <Register 
                  user = {this.context.user}
                  setUser = {this.context.setUser}
                />
              </NavigateParams>
            } />
            <Route path = '/profile' element = {
              <PrivateRoute to = '/profile' login = {this.state.isLoggedIn}>
                <Profile user = {this.context.user}/>
              </PrivateRoute>
            }/>
            <Route path = '/donate' element = {
              <PrivateRoute to = '/donate' login = {this.state.isLoggedIn}>
                <Donate user = {this.context.user}/>
              </PrivateRoute>
            } />
            <Route path = '/done' element = {
              <PrivateRoute to = '/done' login = {this.state.isLoggedIn}>
                <Done />
              </PrivateRoute>
            } />
            <Route path = '/transaction' element = {
              <PrivateRoute to = '/transaction' login = {this.state.isLoggedIn}>
                <Transaction />
              </PrivateRoute>
            }/>
            <Route path = '/ngo-companies'>
              <Route path = '/ngo-companies' element = {<NgoList />}/>
              <Route path = '/ngo-companies/:ngoId' element = {
                <NavigateParams>
                  <NgoDetail />
                </NavigateParams>
              } />
            </Route>
          </Routes>
        </React.Suspense >
      </Router>
    )
  }
}