import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';

class Users extends Component {
  componentWillMount(){
    this.props.getUsers()
  }

  renderElements(){
    if(!this.props.users){
      return(
        <div>
          <strong>You are the 1st User in this blog!!</strong>
        </div>
      )
    }

    if(!this.props.users[0]){
      return (
        <div>
          <strong>Loading..!!</strong>
        </div>
      )
    }
    return this.props.users.map(function(el, index){
      if(el.entries.length <= 1) {
        return (
          <li className="list-group-item" key={ index }>
          <Link to={`/users/${el._id}`} activeClassName="active">
          {el.email}
          <div className="pull-sm-right">Join on {el.createdAt}</div>
          <div>Created {el.entries.length} entry</div>
          </Link>
          </li>
        )
      }
        return (
          <li className="list-group-item" key={ index }>
          <Link to={`/user/${el._id}`} activeClassName="active">
          <div>
            {el.email}
            <div className="pull-sm-right">Join on {el.createdAt}</div>
            <div>Created {el.entries.length} entries</div>
          </div>
          </Link>
          </li>
        )
      })
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
