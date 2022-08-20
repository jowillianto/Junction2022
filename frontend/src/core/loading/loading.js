import React from 'react'

export default class Loading extends React.Component{
  render(){
    return (
      <div className = 'loading-cont'>
        <div className = 'loading-img'>

        </div>
        <div className = 'loading-txt'>
          <p>{this.props.text}</p>
        </div>
      </div>
    )
  }
}