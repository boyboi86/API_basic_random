import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li className="nav-item"><Link to="/users/signin">Sign In</Link></li>
          <li className="nav-item"><Link to="/users/signup">Sign Up</Link></li>
        </ul>
      </nav>
        <div>{ this.props.children }</div>
      </div>
    );
  }
}
