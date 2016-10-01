import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class NewEntry extends Component{
  handleFormSubmit({ title , description }){
    this.props.postEntry({ title , description });

  }

  errorHandle(){
    if(this.props.errorMsg){
      return (
        <div className="alert alert-danger">
        {this.props.errorMsg}
        </div>
      )
    }
  }

  render(){
    const {handleSubmit, fields: { title , description } } = this.props;
    return (
      <div>
        <div>
          <strong>New Entry</strong>
        </div>
        <form id="CreateForm" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset>
            <label>Title:</label>
            <input {...title} type="text" value={this.props.newpost} className="form-control title" placeholder="Title of your post.." />
          </fieldset>
          <fieldset>
            <label>Description:</label>
            <textarea {...description} type="text" value={this.props.newpost} className="form-control description" placeholder="What's your story about.." />
          </fieldset>
          {this.errorHandle()}
          <button action="submit" className="btn btn-primary">Submit</button>
          <Link className="btn btn-danger pull-sm-right" to="/entry">cancel?</Link>
        </form>
      </div>
    )
  }
}


const formOptions = { form: 'newEntry' , fields: [ 'title', 'description' ] }

function mapStateToProps(state){
  return {
    errorMsg: state.posts.error
  }
}

export default reduxForm(formOptions, mapStateToProps, actions)(NewEntry);
