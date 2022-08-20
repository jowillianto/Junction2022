import React from 'react'
import LayoutGrid from '../../share/grid/grid'
import {Link} from 'react-router-dom'
import { NGOObject } from '../../API/ngo'
import './home.css'
import NGORenderer from '../../share/ngo/NGORenderer'

class HomepageLeft extends React.Component{
  constructor(props){
    super(props)
    this.state  = {
      people_count : 4846, 
      amount       : "$ 1,233,000"
    }
    this.title  = 'Amet minim mollit non dese'
    this.desc   = 'Amet minim non deserunt uliamco est sit aliqua\
    dolor do amet sint . Velit officia consequat duis enim velit\
     mollit'
  }
  getDonationText(){
    let count = this.state.people_count
    let amount= this.state.amount 
    return `${count} people donated ${amount}`
  }
  renderTodayDonation(){
    return(
      <div className = 'today-donation'>
        <div className = 'donate-title'>
          <p>Today's Donation</p>
        </div>
        <div className = 'donate-amount'>
          <p>{this.getDonationText()}</p>
        </div>
      </div>
    )
  }
  renderTitle(){
    return(
      <div className = 'home-title'>
        <h1>{this.title}</h1>
      </div>
    )
  }
  renderDescription(){
    return(
      <div className = 'home-desc'>
        <p>{this.desc}</p>
      </div>
    )
  }
  renderButtons(){
    if(this.props.user === null){
      return (
        <div className = 'public-home-button'>
          <div className  = 'button-left'>
            <Link to = '/donate'>Donate</Link>
          </div>
          <div className  = 'button-right'>
            <Link to = '/'>Learn more</Link>
          </div>
        </div>
      )
    }
    else{
      return (
        <div className = 'private-home-button'>
          <div className  = 'button-left'>
            <Link to = '/donate'>Donate</Link>
          </div>
          <div className  = 'button-right'>
            <Link to = '/'>Learn more</Link>
          </div>
        </div>
      )
    }
  }
  render(){
    return(
      <div className = 'homepage-left'>
        {this.renderTodayDonation()}
        {this.renderTitle()}
        {this.renderDescription()}
        {this.renderButtons()}
      </div>  
    )
  }
}

class HomepageRight extends React.Component{
  constructor(props){
    super(props)
    this.state  = {
      ngoList   : [{

      }]
    }
    this.title  = 'Amet minim mollit non deser'
  }
  componentDidMount(){
    let NGO_TEMPLATE = {
      name        : 'NGO Name', 
      avatar      : 'LOL', 
      value       : '00000',
      description : 'Consetectuer Adipisincg Elit asd afkhvauodghnm adfjhhnfasjh '
    }
    this.setState({
      ngoList : Array(10).fill(NGO_TEMPLATE)
    })
  }

  renderNGOThreeBlock(array : NGOObject){
    return(
      <div className = 'ngo-list'>
        <div className = 'blc-title'>
          Amet minim mollit non deser
        </div>
        <div className = 'ngo-top'>
          <NGORenderer ngo = {array[0]} />
        </div>
        <div className = 'ngo-bottom'>
          <div className = 'ngo-bottom-left'>
            {array.length >= 2 && <NGORenderer ngo = {array[1]} />}
          </div>
          <div className = 'ngo-bottom-right'>
            {array.length >= 3 && <NGORenderer ngo = {array[2]} />}
          </div>
        </div>
      </div>
    )
  }
  render(){
    const renderBlock = this.state.ngoList.reduce((res, item, index) => {
      const chunkIndex = Math.floor(index / 3)

      if(!res[chunkIndex]) {
        res[chunkIndex] = [] // start a new chunk
      }
    
      res[chunkIndex].push(item)
    
      return res
    }, [])
    return(
      <div className = 'homepage-right'>
        {renderBlock.map((val) => this.renderNGOThreeBlock(val))}
      </div>
    )
  } 
}

export default class Home extends React.Component{

  render(){
    return (
      <LayoutGrid>
        <HomepageLeft />
        <HomepageRight />
      </LayoutGrid>
    )
  }
}