import React from "react";
import { UserContext } from "./routes/utils";
import User from "./API/user";
import Routing from "./routes/routes";
import runAll from "./experiment";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let user = null;
    try {
      user = User.loadFromLocal();
    } catch {}
    this.state = {
      user: user,
      setUser: this.setUser,
    };
  }
  setUser = (user: User) => {
    this.setUser({ user: user });
  };
  handleButton = () => {
    runAll();
  };
  render = () => {
    return (
      <UserContext.Provider value={this.state}>
        <button onClick={this.handleButton}>LAFDLJKSLK</button>
        <Routing />
      </UserContext.Provider>
    );
  };
}
