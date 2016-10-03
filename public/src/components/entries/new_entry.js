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
/*Triggers your word count and actual text input*/
  textAreaHandle(event){
  this.props.onDescLength({ description: event.target.value ,length: event.target.value.length})
  }

  wordCountHandle(){
    const Num = parseInt(this.props.length, 10)
    if(Num === 300){
      return (
        <div className="exceeded pull-sm-right">{this.props.length} / 300</div>
      )
    } else {
      return (
        <div className="pull-sm-right"><strong>{this.props.length} / 300</strong></div>
      )
    }
  }



  render(){
    const {handleSubmit, fields: { title , description }} = this.props;
    return (
      <div>
        <div>
          <strong>New Entry</strong>
        </div>
        <form id="CreateForm" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset>
            <label>Title:</label>
            <input {...title} type="text"
            className="form-control"
            maxLength="50"
            placeholder="Title of your post.." autoComplete="off" required/>
          </fieldset>
          <fieldset>
            <label>Description:</label>
            <textarea {...description} type="text" value={this.props.post} onChange={this.textAreaHandle.bind(this)}
            className="form-control"
            maxLength="300"
            placeholder="What's your story about.." autoComplete="off" required/>
            {this.wordCountHandle()}
          </fieldset>
          {this.errorHandle()}
          <button action="submit" className="btn btn-primary">Submit</button>
          <Link className="btn btn-danger" to="/entry">cancel?</Link>
        </form>
      </div>
    )
  }
}


const formOptions = { form: 'newEntry' , fields: [ 'title', 'description' ] }

function mapStateToProps(state){
  return {
    errorMsg: state.posts.error,
    length: state.posts.length,
    post: state.posts.text
  }
}

export default reduxForm(formOptions, mapStateToProps, actions)(NewEntry);
