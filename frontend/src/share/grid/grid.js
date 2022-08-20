import React from 'react'
import './grid.css'

export default class LayoutGrid extends React.Component{
  render(){
    return(
      <div className = 'grid-cont'>
        <div className = 'grid-bg-left'>
          {this.props.children[0]}
        </div>
        <div className = 'grid-bg-right'>
          {this.props.children[1]}
        </div>
      </div>
    )
  }
}