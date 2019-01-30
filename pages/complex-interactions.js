import React, { Component, Fragment } from "react";
import MenuItem from "../components/MenuItem";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      collapsed: false
    };
  }

  onKeyPress(e) {
    if (e.keyCode === 38 /* Up */) {
      if (this.state.selected >= 1) {
        this.setState({ selected: this.state.selected - 1 });
      } else if (this.state.selected === 0) {
        this.setState({ collapsed: true });
      }
    } else if (e.keyCode === 40 /* Down */) {
      if (this.state.collapsed) {
        this.setState({ collapsed: false, selected: 0 });
      } else if (this.state.selected < 2) {
        this.setState({ selected: this.state.selected + 1 });
      }
    } else if (e.keyCode === 27 /* Escape */) {
      this.setState({ collapsed: true });
    }
  }

  onClickItem(selected) {
    this.setState({ selected });
  }

  onToggleCollapse() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <Fragment>
        <ul>
          <MenuItem
            onKeyPress={e => this.onKeyPress(e)}
            isActive={this.state.collapsed}
            onClick={() => this.onToggleCollapse()}
          >
            More... {this.state.collapsed ? "⬇️" : "⬆️"}
          </MenuItem>
        </ul>
        {!this.state.collapsed && (
          <ul>
            <MenuItem
              onKeyPress={e => this.onKeyPress(e)}
              onClick={() => this.onClickItem(0)}
              isActive={this.state.selected === 0}
            >
              One
            </MenuItem>
            <MenuItem
              onKeyPress={e => this.onKeyPress(e)}
              onClick={() => this.onClickItem(1)}
              isActive={this.state.selected === 1}
            >
              Two
            </MenuItem>
            <MenuItem
              onKeyPress={e => this.onKeyPress(e)}
              onClick={() => this.onClickItem(2)}
              isActive={this.state.selected === 2}
            >
              Three
            </MenuItem>
          </ul>
        )}
      </Fragment>
    );
  }
}
