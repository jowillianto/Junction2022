import React from 'react'
import './infocard.css'

interface TabObject{
  name  : String, value : String
}

export default class InfoCard extends React.Component{
  renderTab(tab : TabObject){
    return (
      <div className = 'infocard-tab'>
        <div className = 'infocard-tab-left'>
          <p>{tab.name}</p>
        </div>
        <div className = 'infocard-tab-right'>
          <p>{tab.value}</p>
        </div>
      </div>
    )
  }
  render(){
    const title     = this.props.title
    const tabList : Array<TabObject> = this.props.tabList
    return(
      <div className = 'infocard'>
        <div className = 'infocard-title'>
          <p>{title}</p>
        </div>
        <div className = 'infocard-content'>
          {tabList.map((val) => this.renderTab(val))}
        </div>
      </div>
    )
  }
}