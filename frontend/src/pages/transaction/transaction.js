import React from "react";
import User from "../../API/user";
import LayoutGrid from "../../share/grid/grid";
import NGO from "../../API/ngo";
import { EventEmitter } from "stream";
import { getBalance, getWalletFromMnemonic, sendCoin } from "../../experiment";
import { UserContext } from "../../routes/utils";

class TransactionLeft extends React.Component {
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
  }
  handleCryptoChange(event) {
    this.setState({ crypto: event.target.value });
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
    NGO.all().then((val) => {
      console.log(val);
      this.setState({ ngo: val });
    });
  }

  doTransaction = () => {
    sendCoin(
      this.context.user.public_key,
      this.state.selectedNGO.wallet,
      this.state.crypto
    ).then((res) => {
      console.log(res);
    });
  };

  renderTransaction() {
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
          <button onClick={this.doTransaction}>Confirm</button>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="transaction-left">
        <div className="transaction-up">{this.renderDonation()}</div>
        <div className="transaction-down">{this.renderTransaction()}</div>
      </div>
    );
  }
}

class TransactionRight extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div></div>;
  }
}

export default class Transaction extends React.Component {
  render() {
    return (
      <LayoutGrid>
        <TransactionLeft />
        <TransactionRight />
      </LayoutGrid>
    );
  }
}
