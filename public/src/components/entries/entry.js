import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Entry extends Component{
  componentWillMount(){
    this.props.getOwnPosts();
  }

  componentDidUpdate(){
    this.props.getOwnPosts();
  }

/* NEED TO CREATE A FEW POST USING POSTMAN */
  renderPost(){
    if(!this.props.post[0] || !this.props.post){
      return <div>Try adding some new post?..</div>
    }
    return this.props.post.map(function(el, index){
      return(
        <li className="list-group-item" key={index}>
          <div>
            <strong>{el.title}</strong>
            <italic className="pull-sm-right">{el.updatedAt}</italic>
          </div>
          <div>{el.description}</div>
          <Link className="btn btn-warning" to={`/entry/edit/${el._id}`} activeClassName="active">Edit</Link>
          <button className="btn btn-danger pull-sm-right" onClick= { () => this.props.deletePosts(el._id)}>Delete</button>
        </li>
      )
    }, this);
  }

  render(){
    return (
      <div>
        <div className="container jumbotron">
          <div className="pull-sm-left">
            <Link className="btn btn-primary" to="/entry/new">Add new post?</Link>
          </div>
          <div className="pull-sm-right">
            <Link className="btn btn-info" to="/users">See all users?</Link>
          </div>
        </div>
        <div className="container row jumbotron">
            <ul className="list-group col-sm-6 offset-sm-3">
              { this.renderPost() }
            </ul>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    post: state.posts.post
  }
}

export default connect(mapStateToProps, actions)(Entry);
