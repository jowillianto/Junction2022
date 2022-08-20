import React from 'react'
import './titleDesc.css'

export default class TitleDesc extends React.Component{
  render(){
    const title   = this.props.title
    const desc    = this.props.desc
    return(
      <div className = 'title-desc'>
        <div className = 'title-desc-title'>
          <p>{title}</p>
        </div>
        <div className = 'title-desc-desc'>
          <p>{desc}</p>
        </div>
      </div>
    )
  }
}