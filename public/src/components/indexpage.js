import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Indexpage extends Component {
  render(){
    return (
      <div>
        <div>This is build with React/Redux</div>
        <Link className="btn btn-primary" to="/Entry">Profile</Link>
        <Link className="btn btn-info" to="/users">See all users</Link>
      </div>
    )
  }
}
