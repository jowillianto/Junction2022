import React from 'react'
import {useParams, useNavigate} from 'react-router-dom'

export const NavigateParamsContext = React.createContext({
  navigate : null, 
  match : {params : null}
})

export const UserContext = React.createContext({
  user : null, setUser : null
})

export const NavigateParams = ({children, ...props}) => {
  const params    = useParams()
  const navigate  = useNavigate()
  const [state, setState] = React.useState({
    navigate : navigate, 
    match : {params : params}
  })
  if (!children || children.length > 1) 
    throw Error("Only one children is allowed")
  return (
    <NavigateParamsContext.Provider value = {state}>
      {React.cloneElement(children, {
        ...props, ...children.props, ...state
      })}
    </NavigateParamsContext.Provider>
  )
}