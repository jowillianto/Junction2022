import React from 'react'
import './grid.css'

export default class LayoutGrid extends React.Component{
  render(){
    return(
      <div className = 'grid-cont'>
        <div className = 'grid-bg-left'></div>
        <div className = 'grid-bg-right'></div>
      </div>
    )
  }
}