import React, { Component, Fragment } from "react";
import MenuItem from "../components/MenuItem";

function reduceState(state = { selected: 0, collapsed: false }, action = {}) {
  switch (action.type) {
    case "up":
      return {
        selected: state.selected > 0 ? state.selected - 1 : 0,
        collapsed: state.selected == 0
      };
    case "down":
      return {
        selected:
          state.selected < 2 && !state.collapsed
            ? state.selected + 1
            : state.selected,
        collapsed: false
      };
    case "select":
      return {
        selected: action.index,
        collapsed: state.collapsed
      };
    case "close":
      return {
        selected: 0,
        collapsed: true
      };
    case "toggle":
      return {
        selected: state.selected,
        collapsed: !state.collapsed
      };
    default:
      return state;
  }
}

console.log(
  [
    { type: "up" },
    { type: "down" },
    { type: "select", index: 2 },
    { type: "down" },
    { type: "down" },
    { type: "down" },
    { type: "down" },
    { type: "down" },
    { type: "down" },
    { type: "down" },
    { type: "up" }
  ].reduce(reduceState, { selected: 0, collapsed: false })
);

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = reduceState();
  }

  dispatch(action) {
    this.setState(prevState => {
      const newState = reduceState(prevState, action);
      return newState;
    });
  }

  onKeyPress(e) {
    if (e.keyCode === 38) {
      this.dispatch({ type: "up" });
    } else if (e.keyCode === 40) {
      this.dispatch({ type: "down" });
    } else if (e.keyCode === 27) {
      this.dispatch({ type: "close" });
    }
  }

  onClickItem(selected) {
    this.dispatch({ type: "select", index: selected });
  }

  onToggleCollapse() {
    this.dispatch({ type: "toggle" });
  }

  render() {
    return (
      <Fragment>
        <ul>
          <MenuItem
            onKeyPress={e => this.onKeyPress(e)}
            onClick={() => this.onToggleCollapse()}
            isActive={this.state.collapsed}
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
