import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class NewEntry extends Component{
  handleFormSubmit({ title , description }){
    this.props.postEntry({ title , description });
  }

  render(){
    const {handleSubmit, fields: { title , description } } = this.props;
    return (
      <div>
        <div>New Entry</div>
        <Link className="btn btn-danger" to="/entry">cancel?</Link>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset>
            <label>Title:</label>
            <input {...title} type="text" className="form-control" placeholder="Title of your post.." />
          </fieldset>
          <fieldset>
            <label>Description:</label>
            <input {...description} type="text" className="form-control" placeholder="What's your story about.." />
          </fieldset>
          <button action="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

const formOptions = { form: 'newEntry' , fields: [ 'title', 'description' ] }

export default reduxForm(formOptions, null, actions)(NewEntry);
