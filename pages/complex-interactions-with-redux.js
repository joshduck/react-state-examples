import React, { Component, Fragment } from "react";
import { createStore } from "redux";
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

const store = createStore(reduceState);

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = reduceState();
    store.subscribe(() => this.onChange());
  }

  onChange() {
    this.setState(store.getState());
  }

  onKeyPress(e) {
    if (e.keyCode === 38) {
      store.dispatch({ type: "up" });
    } else if (e.keyCode === 40) {
      store.dispatch({ type: "down" });
    } else if (e.keyCode === 27) {
      store.dispatch({ type: "close" });
    }
  }

  onClickItem(selected) {
    store.dispatch({ type: "select", index: selected });
  }

  onToggleCollapse() {
    store.dispatch({ type: "toggle" });
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
