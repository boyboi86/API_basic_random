import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount(){
    this.props.signoutUser()
  }

  render(){
    return (
      <div>
        <div>You have successfully signed out</div>
      </div>
    )
  }
}

export default connect(null, actions)(Signout)
