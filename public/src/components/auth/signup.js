import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

  handleFormSubmit({email, password}){
    this.props.signupUser({ email, password })
  }

  errorHandler(){
    if(this.props.errorMsg){
      return (
        <div className="alert alert-danger">
        { this.props.errorMsg }
        </div>
      )
    }
  }

  render(){
    const { handleSubmit, fields: {email, password, confirmPassword}} = this.props;

    return (
      <div>
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Email:</label>
            <input {...email} className="form-control" placeholder="what's your email?" type="email" required/>
          </fieldset>
          <fieldset className="form-group">
            <label>Password:</label>
            <input {...password} className="form-control" type="password" required/>
          </fieldset>
          <fieldset className="form-group">
            <label>Confirm Password:</label>
            <input {...confirmPassword} className="form-control" type="password" required/>
            { password.touched && confirmPassword.error && <div className="alert alert-danger">{ confirmPassword.error }</div> }
          </fieldset>
          {this.errorHandler()}
          <button action="submit" className="btn btn-primary">Sign up</button>
        </form>
      </div>
    )
  }
}

function validate(formProps){
  const errors = {};
    if(!formProps.confirmPassword && formProps.password){
      errors.confirmPassword = "Please confirm your password"
    }
    else if(formProps.confirmPassword !== formProps.password){
      errors.confirmPassword = "Passwords must match"
    }
  return errors
}

function mapStateToProps(state){
  return {
    errorMsg: state.auth.error
  }
}

const formOptions = { form: 'signup', fields: ['email', 'password', 'confirmPassword'], validate: validate }

export default reduxForm(formOptions, mapStateToProps, actions)(Signup);
