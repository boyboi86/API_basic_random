import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../actions';
import moment from 'moment';

class UsersPost extends Component {

  componentWillMount(){
    const {id} = this.props.params
    this.props.getOtherUsersPost({ id })
  }

  getTimeFrom(time){
    const updatedAt = new Date(time);
    return moment(updatedAt, 'YYYYMMDD').fromNow()
  }



userPostHandle(){
  if(!this.props.users.entries || !this.props.users.entries[0]){
    return (
      <div><strong>No post found!!</strong></div>
    )
  }
  return this.props.users.entries.map(function(el, index){
    return(
      <li className="list-group-item" key={index}>
        <div>
          <b>{ el.title }</b>
          <i className="pull-sm-right">{this.getTimeFrom(el.updatedAt)}</i>
          <div>{el.description}</div>
        </div>
      </li>
    )
  },this)
}

  render(){
    return (
      <div className="jumbotron container">
      
        <ul className="list-group col-sm-6 offset-sm-3">
        {this.userPostHandle()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    users: state.users.user,
    post: state.posts.post
  }
}

export default connect(mapStateToProps, action)(UsersPost)
