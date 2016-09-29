import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import {Link} from 'react-router';
import * as actions from '../../actions';

class EditEntry extends Component{

  handleFormSubmit({title, description}){
    const {id} = this.props.params;
    this.props.patchPost({title, description, id})
  }

componentWillMount(){
    const {id} = this.props.params;
    this.props.getEditPost({id})
  }

  TitleChange(event){
    this.props.onTitleChange({title: event.target.value})
  }

  DescChange(event){
    this.props.onDescChange({description: event.target.value})
  }

  render(){
    const { handleSubmit, fields: {title, description}} = this.props;
    return(
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>title:</label>
            <input {...title} className="form-control" type="text"
            value={this.props.post.title}
            onChange={ this.TitleChange.bind(this)}/>
          </fieldset>
          <fieldset className="form-group">
            <label>description:</label>
            <input {...description} className="form-control" type="text"
            value={this.props.post.description}
            onChange={this.DescChange.bind(this)}/>
          </fieldset>
          <button action="submit" className="btn btn-primary">Submit Changes</button>
          <Link className="btn btn-danger pull-sm-right" to="/entry">cancel</Link>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    post: state.posts.post
  }
}

const formOptions = { form: 'editentry', fields: ['title', 'description'] }

export default reduxForm(formOptions, mapStateToProps, actions)(EditEntry)