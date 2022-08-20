import React from 'react'
import User from '../../API/user'
import { UserContext } from '../../routes/utils'
import './login.css'

class LoginLeft extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className = 'login-left'>
        <h1>Amet minim mollit non dese</h1>
      </div>
    )
  }
}


class LoginForm extends React.Component{
  static contextType = UserContext
  constructor(props){
    super(props)
    this.state  = {
      form  : {
        email     : {
          title       : 'Email', 
          value       : '', 
          placeholder : 'Email',
          type        : 'text'
        }, 
        password  : {
          title       : 'Password', 
          value       : '', 
          placeholder : 'Password', 
          warn        : '',
          type        : 'password'
        }
      }
    }
  }
  handleFormInput = (key, value) => {
    // Value verification
    let temp    = {value : value}
    let form    = {}
    form[key]   = Object.assign(this.state.form[key], temp)
    form        = Object.assign(this.state.form, form)
    this.setState({form : form})
  }
  renderOneForm(key, formData){
    return (
      <div className = {`login-input-${key}`}>
        <div className = 'input-title'>
          <p>{formData.title}</p>
        </div>
        <div className = 'input-input'>
          <input 
            type = {formData.type} 
            value = {formData.value} 
            onChange = {
              (event) => this.handleFormInput(key, event.target.value)
            }
            placeholder = {formData.placeholder}
          />
        </div>
        <div className = 'input-warn'>
          <p>{formData.warn}</p>
        </div>
      </div>
    )
  }
  renderForm(){
    const formKeys = Object.keys(this.state.form)
    return (
      <div className = 'login-form'>
        {formKeys.map(
          (key) => this.renderOneForm(key, this.state.form[key])
        )}
      </div>
    )
  }
  submitLogin = () => {
    User.login(
      this.state.form.email.value, 
      this.state.form.password.value
    )
    .then((user) => {
      this.context.setUser(user)
      window.location.href = '/'
    })
    .catch((err) => console.error(err))
  }
  renderButton(){
    return(
      <div className = 'submit'>
        <button onClick = {this.submitLogin}>Login</button>
      </div>
    )
  }
  render(){
    return(
      <div className = 'login-right'>
        {this.renderForm()}
        {this.renderButton()}
      </div>
    )
  }
}
export default class Login extends React.Component{
  render(){
    return (
      <div className = 'login'>
        <LoginLeft />
        <LoginForm />
      </div>
    )
  }
}