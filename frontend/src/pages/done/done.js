import React from "react";
import DoneMessage from "./../../assets/done_message.png";

export default class Done extends React.Component {
  render() {
    return (
      <div className="done-page">
        <img alt="no image" src={DoneMessage} />
      </div>
    );
  }
}
