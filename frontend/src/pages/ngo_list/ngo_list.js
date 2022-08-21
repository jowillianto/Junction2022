import React from 'react'
import NGO from '../../API/ngo'
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
    NGO.all()
    .then((ngos) => this.setState({ngoList : ngos}))
    .catch((err) => console.error(err))
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