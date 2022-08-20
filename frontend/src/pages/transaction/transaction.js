import React from "react";
import LayoutGrid from "../../share/grid/grid";

class TransactionLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount  : 0,
      crypto  : 0.00
    }
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCryptoChange = this.handleCryptoChange.bind(this);
  }

  handleAmountChange(event) {
    this.setState({amount: event.target.value})
  }
  handleCryptoChange(event) {
    this.setState({crypto: event.target.value})
  }

  renderDonation(){
    return(
      <div className="donate">
        <div className="donateText">
          DONATE
        </div>
        <div className = "amount">
          <label>
            Amount: 
          <input title = "$" type = "currency" value={this.amount} onChange={this.handleAmountChange}/>
          </label>
        </div>
        <div className="crypto">
          <label>
            Crypto:
          <input title = "uosmos"type = "currency" value={this.crypto} onChange={this.handleCryptoChange}/>
          </label>
        </div>
      </div>
    )
  }

  renderTransaction(){
    
  }

}

class TransactionRight extends React.Component {
  constructor(props) {
    super(props);
  }
}

export default class Transaction extends React.Component {
  render() {
    return (<LayoutGrid>
      <TransactionLeft/>
      <TransactionRight/>
    </LayoutGrid>)
}
