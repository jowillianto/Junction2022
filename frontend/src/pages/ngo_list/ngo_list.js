import React from 'react'
import NGORenderer from '../../share/ngo/NGORenderer'
import './ngo_list.css'

export default class NGOList extends React.Component{
  constructor(props){
    super(props)  
    this.state = {
      ngoList   : []
    }
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
  renderNGOTwoBlock(array){
    return(
      <div className = 'ngo-set'>
        <div className = 'ngo-left'>
          <NGORenderer ngo = {array[0]}/>
        </div>
        <div className = 'ngo-right'>
          {array.length === 2 && <NGORenderer ngo = {array[1]}/>}
        </div>
      </div>
    )
  }
  renderTitle(){
    return(
      <div className = 'ngo-list-title'>
        <h1>Amet minim mollit non deser</h1>
      </div>
    )
  }
  render(){
    const renderBlock = this.state.ngoList.reduce((res, item, index) => {
      const chunkIndex = Math.floor(index / 2)

      if(!res[chunkIndex]) {
        res[chunkIndex] = [] // start a new chunk
      }
    
      res[chunkIndex].push(item)
    
      return res
    }, [])
    return(
      <div className = 'ngo-list'>
        {this.renderTitle()}
        {renderBlock.map((val) => this.renderNGOTwoBlock(val))}
      </div>
    )
  }

}