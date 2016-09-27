import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

export default class NewEntry extends Component{
  render(){
    return (
      <div>
        <div>New Entry</div>
        <Link className="btn btn-danger" to="/entry">cancel?</Link>
      </div>
    )
  }
}
