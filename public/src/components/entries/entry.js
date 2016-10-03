import React, { Component } from 'react';
import moment from 'moment';
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

  getTimeFrom(time){
    const updatedAt = new Date(time);
    return moment(updatedAt, 'YYYYMMDD').fromNow()
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
            <b>{el.title}</b>
            <i className="pull-sm-right">{this.getTimeFrom(el.updatedAt)}</i>
          </div>
          <div>{el.description}</div>
          <Link className="btn btn-warning" to={`/entry/${el._id}`} activeClassName="active">Edit</Link>
          <button className="btn btn-danger pull-sm-right" onClick= { () => this.props.deletePosts(el._id)}>Delete</button>
        </li>
      )
    }, this);
  }

  render(){
    return (
        <div className="container row jumbotron">
            <ul className="list-group col-sm-6 offset-sm-3">
              { this.renderPost() }
            </ul>
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
