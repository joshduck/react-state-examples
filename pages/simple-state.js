import React, { Component } from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  onClickButton() {
    this.setState({
      clicked: true
    });
  }

  render() {
    return (
      <div>
        {this.state.clicked ? "Noooooooo!" : "Don't click the button, please."}
        <br />
        <button onClick={() => this.onClickButton()}>Click me</button>
      </div>
    );
  }
}
