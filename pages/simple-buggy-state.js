import React, { Component } from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isOdd: false
    };
  }

  onClickButton() {
    this.setState({
      count: this.state.count + 1
    });

    this.setState({
      isOdd: this.state.count % 2 === 1
    });
  }

  render() {
    return (
      <div>
        {this.state.count} clicks! (an {this.state.isOdd ? "odd" : "even"}{" "}
        number!)
        <br />
        <button onClick={() => this.onClickButton()}>Click me</button>
      </div>
    );
  }
}
