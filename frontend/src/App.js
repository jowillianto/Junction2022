import React from 'react'
import { UserContext } from './routes/utils'
import User from './API/user'
import Routing from './routes/routes'

export default class App extends React.Component{
  constructor(props){
    super(props)
    let user  = null
    try{
      user  = User.loadFromLocal()
    }
    catch{}
    this.state = {
      user    : user,
      setUser : this.setUser
    }
  }
  setUser = (user : User) => {
    this.setUser({user : user})
  }
  render = () => {
    return(
      <UserContext.Provider value = {this.state}>
        <Routing />
      </UserContext.Provider>
    )
  }
}