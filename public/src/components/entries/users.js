import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../../actions';
import { Link } from 'react-router';

class Users extends Component {
  componentWillMount(){
    this.props.getUsers()
  }

  joinDate(date){
    return moment.utc(date).format('MMM YYYY')
  }

/*Num of entries*/
  entryNum(num){
    if(num <= 1){
      return(
        <div>Created {num} entry</div>
      )
    } else {
      return(
        <div>Created {num} entries</div>
      )
    }
  }
/*Num of followers*/
  userNum(num){
    if(num <= 1){
      <div>{num} follower </div>
    } else {
      return(
        <div>{num} followers </div>
      )
    }
  }

  renderElements(){
/*First user post */
    if(!this.props.users){
      return(
        <div>
          <strong>You are the 1st User in this blog!!</strong>
        </div>
      )
    }

/*Simple loader*/
    if(!this.props.users[0]){
      return (
        <div>
          <strong>Loading..!!</strong>
        </div>
      )
    }

/*The <li> user list types*/
    return this.props.users.map(function(el, index){
        return (
          <li className="list-group-item" key={ index }>
          <Link to={`/users/${el._id}`} activeClassName="active">
          {el.email}
          <div className="pull-sm-right">Join on {this.joinDate(el.createdAt)}</div>
          {this.entryNum(el.entries.length)}
          {this.userNum(el.followers.length)}
          </Link>
          </li>
        )
      }, this)
    }

  render(){
    return (
      <div>
        <ul className="list-group">
            {this.renderElements()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    users: state.users.user
  }
}

export default connect(mapStateToProps, actions)(Users);
