import React, { Component, Fragment } from "react";
import { createStore, bindActionCreators } from "redux";
import { Provider, connect } from "react-redux";
import MenuItem from "../components/MenuItem";

// Reducers
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

// Action creators
function moveUp() {
  return { type: "up" };
}

function moveDown() {
  return { type: "down" };
}

function close() {
  return { type: "close" };
}

function toggle() {
  return { type: "toggle" };
}

function select(index) {
  return { type: "select", index };
}

// Page can use actions bound (later on)
class Page extends React.Component {
  onKeyPress(e) {
    if (e.keyCode === 38) {
      this.props.moveUp();
    } else if (e.keyCode === 40) {
      this.props.moveDown();
    } else if (e.keyCode === 27) {
      this.props.close();
    }
  }

  onClickItem(selected) {
    this.props.select(selected);
  }

  onToggleCollapse() {
    this.props.toggle();
  }

  render() {
    return (
      <Fragment>
        <ul>
          <MenuItem
            onKeyPress={e => this.onKeyPress(e)}
            onClick={() => this.onToggleCollapse()}
            isActive={this.props.collapsed}
          >
            More... {this.props.collapsed ? "⬇️" : "⬆️"}
          </MenuItem>
        </ul>
        {!this.props.collapsed && (
          <ul>
            <MenuItem
              onKeyPress={e => this.onKeyPress(e)}
              onClick={() => this.onClickItem(0)}
              isActive={this.props.selected === 0}
            >
              One
            </MenuItem>
            <MenuItem
              onKeyPress={e => this.onKeyPress(e)}
              onClick={() => this.onClickItem(1)}
              isActive={this.props.selected === 1}
            >
              Two
            </MenuItem>
            <MenuItem
              onKeyPress={e => this.onKeyPress(e)}
              onClick={() => this.onClickItem(2)}
              isActive={this.props.selected === 2}
            >
              Three
            </MenuItem>
          </ul>
        )}
      </Fragment>
    );
  }
}

const store = createStore(reduceState);

// Get props for component based on Redux store state.
const mapStateToProps = state => {
  return {
    selected: state.selected,
    collapsed: state.collapsed
  };
};

// Get props for component for dispatching actions.
const mapDispatchToProps = dispatch => ({
  // doSomething: (arg1) => dispatch({ type: 'do-somethign', id: arg1 })

  // Shorthand version, using pre-defined action creators.
  ...bindActionCreators(
    {
      moveUp,
      moveDown,
      close,
      toggle,
      select
    },
    dispatch
  )
});

const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);

export default function() {
  return (
    <Provider store={store}>
      <ConnectedPage />
    </Provider>
  );
}
