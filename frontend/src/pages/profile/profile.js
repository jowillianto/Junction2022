import React from 'react'
import { UserContext } from '../../routes/utils'
import './profile.css'
import BlankAvatar from '../../assets/blank_avatar.png'
import { getBalance, getTransactionFrom, getWalletFromMnemonic, sendCoin, top1Transaction } from '../../experiment'
import NGO from '../../API/ngo'

class ProfileLeft extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      transaction : []
    }
  }
  componentDidMount(){
    let pubKey  = this.props.user.pubKey
    getWalletFromMnemonic(pubKey)
    .then((resp) => {
      getTransactionFrom(resp)
      .then((resp) => {
        this.setState({transaction : resp})
      })
    })
  }
  renderUpper(){
    let user = this.props.user
    return (
      <div className = 'profile-left-upper'>
        <div className = 'profile-left-username'>
          {user.username}
        </div>
        <div className = 'profile-left-avatar'>
          <div className = 'profile-avatar-left'>
            <img src = {BlankAvatar}/>
          </div>
          <div className = 'profile-avatar-right'>
            <div className = 'profile-avatar-right-email'>
              <p>{user.email}</p>
            </div>
            <div className = 'profile-avatar-wallet'>
              <div className = 'profile-wallet-text'>
                <p> Amount donated</p>
              </div>
              <div className = 'profile-wallet-amount'>
                <p>{user.amount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderLower(){
    return (
      <div className = 'profile-left-lower'>
        
      </div>
    )
  }
  render(){
    return(
      <div className = 'profile-left'>
        {this.renderUpper()}
        {this.renderLower()}
      </div>
    )
  }
} 

class ProfileRight extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      ngoList : [],
      selectedId : 0,
      donateAmount : 0, 
      warn  : ''
    }
  }
  componentDidMount(){
    NGO.all()
    .then((ngos) => this.setState({ngoList : ngos}))
    .catch((err) => console.error(err))
    
  }
  recursiveTransactions(source, depth, list){
    
  }
  handleSelect = (event) => {
    this.setState({selectId : event.target.value})
  }
  handleDonate = () => {
    let user  = this.props.user
    let ngo   = this.props.ngoList[this.props.selectedId]
    sendCoin(user.publicKey, ngo.wallet, this.donateAmount)
    .then(() => {
      this.setState({donateAmount : 0, warn : 'Donate successful'})
    })
  }
  handleDonateChange = (event) => {
    this.setState({
      donateAmount : event.target.value, 
      warn        : ''
    })
  }
  renderDonate(){
    let ngoList   = this.state.ngoList
    let selId     = this.state.selectedId
    return (
      <div className = 'profile-right-upper'>
        <div className = 'profile-right-ngo-name'>
          <p>NGO Name</p>
        </div>
        <div className = 'profile-right-select'>
          <select value = {selId} onChange = {this.onChange}>
            {ngoList.map(
              (val, id) => <option value = {id}>{val.name}</option>
            )}
          </select>
        </div>
        <div className = 'profile-right-donate-amount'>
          <div className = 'profile-right-amount-title'>
            <p>
              <span className = 'amount-left'>Amount</span>
              <span className = 'amount-right'>Crypto</span>
            </p>
          </div>
          <div className = 'profile-donate-input'>
            <input type = 'text' value = {this.props.donateAmount} onChange = {this.handleDonateChange} />
          </div>
          <div className = 'profile-donate-button'>
            <button onClick = {this.handleDonate}>Donate</button> 
          </div>
          <p>{this.state.warn}</p>
        </div>
      </div>
    )
  }
  renderHistory(){
    
  }
  render(){
    return(
      <div className = 'profile-right'>
        {this.renderDonate()}
        {this.renderHistory()}
      </div>
    )
  }
}

export default class Profile extends React.Component{
  static contextType = UserContext
  constructor(props){
    super(props)
    this.state = {
      user : {
        id : -1, username : '', email : '', amount : ''
      }
    }
  }
  componentDidMount(){
    this.context.user.get()
    .then((resp) => {
      let user    = resp.data
      let pubKey  = this.context.user.publicKey
      getWalletFromMnemonic(pubKey)
      .then((resp) => {
        let amount = getBalance(resp)
        user  = Object.assign(user, {
          amount : amount
        })
        this.setState({amount : amount})
      })
    })
    .catch((err) => console.error(err))
  }
  render(){
    return (
      <div className = 'profile'>
        <ProfileLeft user = {this.state.user}/>
        <ProfileRight user = {this.state.user}/>
      </div>
    )
  }
}