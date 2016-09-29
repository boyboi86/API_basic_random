import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';

class Users extends Component {
  componentWillMount(){
    this.props.getUsers()
  }

  renderElements(){
    return this.props.users.map(function(el, index){
        return (
          <li className="list-group-item" key={ index }>
          {el.email}
          <div className="pull-sm-right">Join on {el.createdAt}</div>
          <div>Created {el.entries.length} entries</div>
          </li>
        )
      })
  }

  render(){
    return (
      <div>
        <div>
          <Link className="btn btn-primary" to="/entry">See all your post</Link>
        </div>
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