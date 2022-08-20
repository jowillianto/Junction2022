import React from 'react'
import { NavigateParamsContext } from '../../routes/utils'
import LayoutGrid from '../../share/grid/grid'
import { NGOObject } from '../../API/ngo'
import TitleDesc from '../../share/titleDesc/titleDesc'
import './ngo_detail.css'
import InfoCard from '../../share/infocard/infocard'


class NGODetailLeft extends React.Component{
  render(){
    return(
      <div className = 'ngo-detail-left'>

      </div>
    )
  }
}

class NGODetailRight extends React.Component{
  renderTransparency(){

  }
  renderNGONameAndIcon(){
    let ngo : NGOObject = this.props.ngo
    return(
      <div className = 'ngo-detail-title'>
        <div className = 'ngo-detail-icon'>
          <img src = {ngo.avatar} />
        </div>
        <div className = 'ngo-detail-name'>
          {ngo.name}
        </div>
      </div>
    )
  }
  renderNGOMission(){
    let ngo : NGOObject = this.props.ngo
    return (
      <div className = 'ngo-mission'>
        <TitleDesc 
          title = 'Our Mission'
          description = {'Something over here that is very very long \
          and has a lot of meaning in it'}
        />
      </div>
    )
  }
  renderNGOVision(){
    let ngo : NGOObject = this.props.ngo
    return(
      <div className = 'ngo-vision'>
        <TitleDesc 
          title = 'Our Vision'
          description = {'Something over here that is very very long \
          and has a lot of meaning in it'}
        />
      </div>
    )
  }
  render(){
    let govtTabList = [{
      name : 'Effective date', value : 'Apr 14, 2004'
    }, {
      name : 'Org.Structure', value : 'Company gkajdfkjakaklkfg'
    }]
    let contactTabList = [{
      name : 'Website', value : 'https://bbc.co.uk'
    }, {
      name : 'Address', value : 'Pretoria, Cross Street, Combe Martin, EX34 ODH'
    }]
    let financialTabList = [{
      name : 'Donation Received', value : '$948.55', 
    }, {
      name : 'Total Income', value : '$1223000'
    }, {
      name : 'Total Expenditure', value : '$1223000'
    }, {
      name : 'Total Assets', value : '$1223000'
    }, {
      name : 'Total Liabilities', value : '$1223000'
    }]
    let transparencyTabList = [{
      name : '', value : ''
    }]
    return(
      <div className = 'ngo-detail-right'>
        {this.renderTransparency()}
        {this.renderNGONameAndIcon()}
        {this.renderNGOMission()}
        {this.renderNGOVision()}
        <InfoCard 
          title = 'Official Government Information'
          tabList = {govtTabList}
        />
        <InfoCard 
          title = 'Contact Information'
          tabList = {contactTabList}
        />
        <InfoCard 
          title = 'Financial Information'
          tabList = {financialTabList}
        />
        <InfoCard 
          title = 'Transparency' 
          tabList = {transparencyTabList}
        />
      </div>
    )
  }
}

export default class NGODetails extends React.Component{
  static contextType = NavigateParamsContext
  constructor(props){
    super(props)
    this.state  = {
      ngo   : {
        name : '',
        description : '',
        avatar : '', 
        value : ''
      }
    }
  }
  componentDidMount(){
    let ngoId   = this.context.match.params.ngoId
  }
  render(){
    return(
      <LayoutGrid>
        <NGODetailLeft ngo = {this.state.ngo}/>
        <NGODetailRight ngo = {this.state.ngo}/>
      </LayoutGrid>
    )
  }
}