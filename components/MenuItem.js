import React, { Component } from "react";

export default class extends Component {
  componentDidMount() {
    this.setFocus();
  }

  componentDidUpdate() {
    this.setFocus();
  }

  setFocus() {
    if (this.props.isActive) {
      this.refs.a.focus();
    }
  }

  render() {
    const { onClick, onKeyPress, children, isActive } = this.props;

    return (
      <li>
        <style jsx>{`
          li {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          a {
            display: block;
            border-bottom: 1px solid #ccc;
            padding: 10px;
            ${isActive &&
              `background: #339;
              color: white;`}
          }
        `}</style>
        <a
          ref="a"
          href="#"
          onKeyUp={e => onKeyPress && onKeyPress(e)}
          onClick={e => onClick && onClick(e)}
        >
          {children}
        </a>
      </li>
    );
  }
}
