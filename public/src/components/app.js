import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li className="nav-item">Sign In</li>
          <li className="nav-item">Sign Up</li>
        </ul>
      </nav>
        <div>{ this.props.children }</div>
      </div>
    );
  }
}
