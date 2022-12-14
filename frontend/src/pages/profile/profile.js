import React from "react";
import { UserContext } from "../../routes/utils";
import "./profile.css";
import BlankAvatar from "../../assets/blank_avatar.png";
import {
  getBalance,
  getTransactionFrom,
  getWalletFromMnemonic,
  sendCoin,
  top1Transaction,
} from "../../experiment";
import NGO from "../../API/ngo";
import NGORenderer from "../../share/ngo/NGORenderer";

class ProfileLeft extends React.Component {
  static contextType = UserContext
  constructor(props) {
    super(props);
    this.state = {
      transaction: [],
      balance: 0,
    };
  }
  componentDidMount() {
    let pubKey = this.context.user.publicKey;
    getWalletFromMnemonic(pubKey).then((resp) => {
      getBalance(resp).then((res)=>{
        this.setState({balance: res})
      })
      getTransactionFrom(resp).then((resp) => {
        this.setState({ transaction: resp });
      });
    });
  }
  renderUpper() {
    let user = this.props.user;
    return (
      <div className="profile-left-upper">
        <div className="profile-left-username">
          <p>{user.username}</p>
        </div>
        <div className="profile-left-avatar">
          <div className="profile-avatar-left">
            <img src={BlankAvatar} />
          </div>
          <div className="profile-avatar-right">
            <div className="profile-avatar-right-email">
              <p>{user.email}</p>
            </div>
            <div className="profile-avatar-wallet">
              <div className="profile-wallet-text">
                <p> Amount donated</p>
              </div>
              <div className="profile-wallet-amount">
                <p>{user.amount}</p>
              </div>
            </div>
            <div className="profile-avatar-wallet">
              <div className="profile-wallet-text">
                <p> Balance</p>
              </div>
              <div className="profile-wallet-amount">
                <p>{this.state.balance}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderLower() {
    return <div className="profile-left-lower"></div>;
  }
  render() {
    return (
      <div className="profile-left">
        {this.renderUpper()}
        {this.renderLower()}
      </div>
    );
  }
}

class ProfileRight extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      ngoList: [],
      selectedId: 0,
      donateAmount: 0,
      warn: "",
      ngoChain: [
        {
          name: "Barehand Uninv",
          description: "nice",
          avatar: "",
          value: 100,
          wallet: "osmo1ekjwn40e6kvhhpds454ycgj45m7aznn0tglphj",
          amount: 360,
        },
        {
          name: "Skyesa",
          description: "nice",
          avatar: "",
          value: 80,
          wallet: "osmo19uqaag7j6rvznnnxu8k7q7pwgnh9wvzxhwda3x",
          amount: 340,
        },
      ],
    };
  }
  recursiveTransactions(allNgo) {
    let curWallet = this.state.ngoList[1].wallet;
    let ngoChain  = []
    let sentTo = "";
    let num = 0;
    while (curWallet != sentTo && !sentTo) {
      console.log(curWallet)
      if (num == 2) {
        break;
      } else {
        num = num + 1;
      }
      getTransactionFrom(this.state.ngoList[1].wallet).then((val) => {
        top1Transaction(val).then((val) => {
          sentTo = val.to;
          let findNGO = allNgo.filter((val) => {
            return val.wallet == sentTo;
          });
          ngoChain.push(findNGO);
          console.log('adsfasdf', findNGO)
        });
      });
    }
  }

  componentDidMount() {
    NGO.all()
      .then((ngos) => {
        this.setState({ ngoList: ngos });
        // this.recursiveTransactions(ngos);
      })
      .catch((err) => console.error(err));
  }
  handleSelect = (event) => {
    this.setState({ selectId: event.target.value });
  };
  handleDonate = () => {
    let user = this.props.user;
    let ngo = this.props.ngoList[this.props.selectedId];
    sendCoin(user.publicKey, ngo.wallet, this.donateAmount).then(() => {
      this.setState({ donateAmount: 0, warn: "Donate successful" });
    });
  };
  handleDonateChange = (event) => {
    this.setState({
      donateAmount: event.target.value,
      warn: "",
    });
  };
  renderDonate() {
    let ngoList = this.state.ngoList;
    let selId = this.state.selectedId;
    return (
      <div className="profile-right-upper">
        <div className="profile-right-ngo-name">
          <p>NGO Name</p>
        </div>
        <div className="profile-right-select">
          <select value={selId} onChange={this.onChange}>
            {ngoList.map((val, id) => (
              <option value={id}>{val.name}</option>
            ))}
          </select>
        </div>
        <div className="profile-right-donate-amount">
          <div className="profile-right-amount-title">
            <p>
              <span className="amount-left">Amount</span>
              <span className="amount-right">Crypto</span>
            </p>
          </div>
          <div className="profile-donate-input">
            <input
              type="text"
              value={this.props.donateAmount}
              onChange={this.handleDonateChange}
            />
          </div>
          <div className="profile-donate-button">
            <button onClick={this.handleDonate}>Donate</button>
          </div>
          <p>{this.state.warn}</p>
        </div>
      </div>
    );
  }
  renderHistory() {
    return(
      <div className = 'history'>
        {this.state.ngoChain.map((val) => <NGORenderer ngo = {val}/>
        )}
      </div>
    )
  }
  render() {
    return (
      <div className="profile-right">
        {this.renderDonate()}
        {this.renderHistory()}
      </div>
    );
  }
}

export default class Profile extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: -1,
        username: "",
        email: "",
        amount: 0,
      },
    };
  }
  componentDidMount() {
    this.context.user
      .get()
      .then((resp) => {
        let user = resp.data;
        let pubKey = this.context.user.publicKey;
        getWalletFromMnemonic(pubKey)
          .then((resp) => {
            let amount = "";
            getBalance(resp).then((val) => {
              amount = val;
            });
            user = Object.assign(user, {
              amount: 0,
            });
            this.setState(
              {
                amount: amount,
                user: user,
              },
              console.log(this.state)
            );
          })
          .catch((err) => {
            this.setState({
              user: user,
            });
          });
      })
      .catch((err) => console.error(err));
  }
  render() {
    return (
      <div className="profile">
        <ProfileLeft user={this.state.user} />
        <ProfileRight user={this.state.user} />
      </div>
    );
  }
}
