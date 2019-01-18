import React, { Component, Fragment } from "react";
import MenuItem from "../components/MenuItem";
import EventEmitter from "../lib/EventEmitter";

class SelectionState extends EventEmitter {
  constructor() {
    super();
    this.selected = 0;
    this.collapsed = false;
  }

  moveUp() {
    if (this.selected === 0) {
      this.collapsed = true;
    }
    if (this.selected > 0) {
      this.selected--;
    }
    this.emit();
  }

  moveDown() {
    this.collapsed = false;
    if (this.selected < 2 && !this.collapsed) {
      this.selected++;
    }
    this.emit();
  }

  selectItem(index) {
    this.selected = index;
    this.emit();
  }

  close() {
    this.selected = 0;
    this.collapsed = true;
    this.emit();
  }

  toggle() {
    this.collapsed = !this.collapsed;
    this.emit();
  }

  getState() {
    return {
      collapsed: this.collapsed,
      selected: this.selected
    };
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.store = new SelectionState();
    this.state = this.store.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    this.store.unsubscribe(this.onChange);
  }

  onChange() {
    this.setState(this.store.getState());
  }

  onKeyPress(e) {
    if (e.keyCode === 38) {
      this.store.moveUp();
    } else if (e.keyCode === 40) {
      this.store.moveDown();
    } else if (e.keyCode === 27) {
      this.store.close();
    }
  }

  onClickItem(selected) {
    this.store.selectItem(selected);
  }

  onToggleCollapse() {
    this.store.toggle();
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
