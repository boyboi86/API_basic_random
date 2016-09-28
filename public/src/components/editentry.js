import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class EditEntry extends Component{
  handleFormSubmit(){

  }

  handleFormData(){

  }

  render(){
    const { handleSubmit, fields: {title, description}} = this.props;
    return(
      <div>
        <form onLoadedData={this.handleSubmit(this.handleFormData.bind(this))} onSubmit={this.handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>title:</label>
            <input className="form-control" type="text"/>
          </fieldset>
          <fieldset className="form-group">
            <label>description:</label>
            <input className="form-control" type="text"/>
          </fieldset>
        </form>
      </div>
    )
  }
}

const formOptions = { form: 'editentry', fields: ['title', 'description'] }

export default reduxForm(formOptions, null, actions)(EditEntry)
