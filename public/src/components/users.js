import React, { Component } from 'react';

export default class Users extends Component {
  render(){
    return (
      <div>
      <div>Users</div>
      {this.props.children}
      </div>
    )
  }
}
