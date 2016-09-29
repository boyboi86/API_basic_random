import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class App extends Component {
  renderLinks(){
    if(this.props.authentication){
      return (
        <li className="nav-item">
        <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      )
    } else {
      return [
        <li className="nav-item" key="1">
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key="2">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ]
    }
  }

  render() {
    return (
      <div>
      <nav className="navbar navbar-light">
        <Link className="navbar-brand" to="/">Reactive Blog</Link>
        <ul className="nav navbar-nav pull-sm-right">
          {this.renderLinks()}
        </ul>
      </nav>
        <div>{ this.props.children }</div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    authentication: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(App);
