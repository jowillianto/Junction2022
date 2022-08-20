import React from 'react'
import { NGOObject } from '../../API/ngo'
import './ngo_render.css'

export default class NGORenderer extends React.Component{
  render(){
    const ngoObject : NGOObject = this.props.ngo
    return (
      <div className = 'ngo-obj'>
        <div className = 'ngo-obj-avatar'>
          <img src = {ngoObject.avatar} />
        </div>
        <div className = 'ngo-obj-title'>
          <span className = 'ngo-obj-name'>
            {ngoObject.name}
          </span>
          <span className = 'ngo-obj-val'>
            {ngoObject.value}
          </span>
        </div>
        <div className = 'ngo-obj-desc'>
          <p>{ngoObject.description}</p>
        </div>
      </div>
    )
  }
}