import React from "react";
import User from "../../API/user";
import LayoutGrid from "../../share/grid/grid";
import NGO from "../../API/ngo";
import { getBalance, getWalletFromMnemonic, sendCoin } from "../../experiment";
import { NavigateParamsContext, UserContext } from "../../routes/utils";
import './donate.css'

class DonateLeft extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      crypto: 0.0,
      ngo: [],
      selectedNGO: {},
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCryptoChange = this.handleCryptoChange.bind(this);
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
    this.setState({ crypto: event.target.value });
  }
  handleCryptoChange(event) {
    this.setState({ crypto: event.target.value });
    this.setState({ amount: event.target.value });
  }
  handleNGOChange(event) {
    this.setState({ selectedNGO: event.target.value });
  }

  renderDonation() {
    return (
      <div className="donate">
        <div className="donateText">DONATE</div>
        <div className="amount">
          <label>
            Amount:
            <input
              title="$"
              type="number"
              value={this.state.amount}
              onChange={this.handleAmountChange}
            />
          </label>
        </div>
        <div className="crypto">
          <label>
            Crypto:
            <input
              title="osmo"
              type="number"
              value={this.state.crypto}
              onChange={this.handleCryptoChange}
            />
          </label>
        </div>
      </div>
    );
  }

  componentDidMount() {
    NGO.all({id : this.props.ngoId})
    .then((val) => {
      if(val.length == 0) window.location.href = '/not-found'
      this.setState({ ngo: val });
    });
  }

  doDonate = () => {
    sendCoin(
      this.context.user.public_key,
      this.state.selectedNGO.wallet,
      this.state.crypto
    ).then((res) => {
      console.log(res);
    });
  };

  renderDonate() {
    return (
      <div className="transaction">
        <div className="transactionText">Transaction</div>
        <div className="chooseNGO">
          <select
            value={this.state.selectedNGO}
            onChange={this.handleNGOChange}
          >
            {this.state.ngo.map((val, id) => (
              <option key={id}>{val.name}</option>
            ))}
          </select>
        </div>
        <div className="button">
          <button onClick={this.doDonate}>Confirm</button>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="transaction-left">
        <div className="transaction-up">{this.renderDonation()}</div>
        <div className="transaction-down">{this.renderDonate()}</div>
      </div>
    );
  }
}

class DonateRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donatePrivately: true,
      sourceOfFund: "Salary",
      Identity: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  renderFormText() {
    return (
      <div className="formtext">
        <label>
          Identity:
          <input
            name="Identity"
            type="string"
            value={this.state.Identity}
            onChange={this.handleInputChange}
          />
        </label>
      </div>
    );
  }

  renderCheckbox() {
    return (
      <div className="checkbox">
        <label>
          Donate Privately:
          <input
            name="Donate Privately"
            type="checkbox"
            checked={this.state.donatePrivately}
            onChange={this.handleInputChange}
          />
        </label>
      </div>
    );
  }

  renderSelect() {
    return (
      <div className="select">
        <label>
          Source of Fund:
          <select
            sourceOfFund={this.state.sourceOfFund}
            onChange={this.handleChange}
          >
            <option sourceOfFund="Salary">Salary</option>
            <option sourceOfFund="Tax Returns">Tax Returns</option>
            <option sourceOfFund="Inheritance">Inheritance</option>
            <option sourceOfFund="Savings">Savings</option>
            <option sourceOfFund="Prefer Not To Say">Prefer Not To Say</option>
          </select>
        </label>
      </div>
    );
  }

  render() {
    return (
      <form>
        {this.renderFormText()}
        {this.renderCheckbox()}
        {this.renderSelect()}
        {/* <input type="submit" value="Submit" /> */}
      </form>
    );
  }
}

export default class Donate extends React.Component {
  static contextType = NavigateParamsContext
  constructor(props){
    super(props)
    this.ngoId  = window.location.href.split('/')[2]
  }
  componentDidMount(){

  }
  render() {
    return (
      <LayoutGrid>
        <DonateLeft ngoId = {this.ngoId}/>
        <DonateRight ngoId = {this.ngoId}/>
      </LayoutGrid>
    );
  }
}
