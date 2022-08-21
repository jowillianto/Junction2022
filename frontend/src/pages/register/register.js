import React from 'react'
import User from '../../API/user'
import { NavigateParams, NavigateParamsContext, UserContext } from '../../routes/utils'
import './register.css'

class RegisterLeft extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="register-left">
        <h1>Amet minim mollit non dese</h1>
      </div>
    );
  }
}

class RegisterForm extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: {
          title: "User Name",
          value: "",
          placeholder: "User Name",
          warn: "",
          type: "text",
        },
        email: {
          title: "Email",
          value: "",
          placeholder: "Email",
          type: "text",
        },
        password: {
          title: "Password",
          value: "",
          placeholder: "Password",
          warn: "",
          type: "password",
        },
        confirm: {
          title: "Confirm Password",
          value: "",
          placeholder: "Confirm password",
          warn: "",
          type: "password",
        },
      },
    };
  }
  handleFormInput = (key, value) => {
    // Value verification
    let temp = { value: value };
    if (key == "confirm" && value !== this.state.form.password.value)
      temp.warn = "mismatch";
    else if (key == "confirm" && value === this.state.form.password.value)
      temp.warn = "";
    let form = {};
    form[key] = Object.assign(this.state.form[key], temp);
    form = Object.assign(this.state.form, form);
    this.setState({ form: form });
  };
  renderOneForm(key, formData) {
    return (
      <div className={`register-input-${key}`}>
        <div className="input-title">
          <p>{formData.title}</p>
        </div>
        <div className="input-input">
          <input
            type={formData.type}
            value={formData.value}
            onChange={(event) => this.handleFormInput(key, event.target.value)}
            placeholder={formData.placeholder}
          />
        </div>
        <div className="input-warn">
          <p>{formData.warn}</p>
        </div>
      </div>
    );
  }
  renderForm() {
    const formKeys = Object.keys(this.state.form);
    return (
      <div className="register-form">
        {formKeys.map((key) => this.renderOneForm(key, this.state.form[key]))}
      </div>
    );
  }
  submitRegister = (navigate) => {
    User.register(
      this.state.form.username.value,
      this.state.form.email.value,
      this.state.form.password.value
    )
    .then((user) => {
      this.context.setUser(user)
      window.location.href = '/'
    })
    .catch((err) => {
      if(err.response && err.response.status === 400){
        console.error(err)
      }
    })
  }
  renderButton(){
    return (
      <NavigateParamsContext.Consumer>
        {value => 
          (<div className = 'submit'>
            <button onClick = {() => this.submitRegister(value.navigate)}>Sign Up</button>
          </div>)
        }
      </NavigateParamsContext.Consumer>
    )
  }
  render() {
    return (
      <div className="register-right">
        {this.renderForm()}
        {this.renderButton()}
      </div>
    );
  }
}
export default class Register extends React.Component {
  render() {
    return (
      <div className="register">
        <RegisterLeft />
        <RegisterForm />
      </div>
    );
  }
}
