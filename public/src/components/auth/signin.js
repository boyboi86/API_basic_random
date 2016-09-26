import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password}){
    this.props.signinUser({ email, password })
  }

  renderAlert(){
    if(this.props.errorMsg){
      return(
        <div className="alert alert-danger">
        {this.props.errorMsg}
        </div>
      )
    }
  }

  render(){
    const { handleSubmit, fields: {email, password} } = this.props;
    return (
        <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
          <fieldset className="form-group">
            <label>Email: </label>
            <input { ...email } className="form-control" placeholder="what's your email?" />
          </fieldset>
          <fieldset className="form-group">
            <label>Password: </label>
            <input { ...password } className="form-control" type="password" />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign in</button>
        </form>
    )
  }
}

function mapStateToProps(state){
  return { errorMsg: state.auth.error }
}

const formOptions = { form: 'signin', fields: ['email', 'password']}

export default reduxForm(formOptions, mapStateToProps, actions)(Signin)
