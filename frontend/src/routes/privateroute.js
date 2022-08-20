import React from 'react'
import { Navigate } from 'react-router-dom'
import {
  NavigateParams, NavigateParamsContext
} from './utils'

const Loading = React.lazy(() => import('../core/loading/loading'))

class InternalPrivateRoute extends React.Component{
  static contextType = NavigateParamsContext
  constructor(props) {
    super(props)
    if (this.props.children.length > 1)
      throw Error("Only one children allowed")
  }
  render() {
    let { login, children, to, ...props } = this.props
    if (!to) {
      const location = window.location.href.split('/')
      to  = location[location.length - 1]
    }
    to = to.replace(/\//g, "_slash_")
    if (login === null)
      return <Loading text='Authenticating' />
    else if (login)
      return React.cloneElement(children, {
        ...props, ...children.props, ...this.context
      })
    else {
      return <Navigate to = {`/login/cont_to=${to}`} replace/>
    }
  }
}

export default class PrivateRoute extends React.Component{
  render() {
    const {children, to, login, ...props} = this.props 
    return (
      <NavigateParams>
        <InternalPrivateRoute to = {to} login = {login}>
          {React.cloneElement(children, {
            ...children.props, ...props
          })}
        </InternalPrivateRoute>
      </NavigateParams>
    )
  }
}