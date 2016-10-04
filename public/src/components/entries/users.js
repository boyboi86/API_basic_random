import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../../actions';
import { Link } from 'react-router';

/*This is dangerous*/


class Users extends Component {
  componentWillMount(){
    this.props.getUsers()
  }
  componentDidUpdate(){
    this.props.getUsers()
  }
/* Templating for follower system */
//   ConnectionHandle(Array, _id){
//   return Array.forEach(function(el, index){
//       console.log('chicken');
//     if(el === User_id){
//       return(
//         <div className="btn btn-warning" onClick={() => this.props.disconnectUser({id: _id})}>- user</div>
//       );
//     } else {
//       return (
//         <div className="btn btn-info" onClick={() => this.props.connectUser({id: _id})}>+ user</div>
//       );
//     }
//   },this);
// };


  joinDate(date){
    return moment.utc(date).format('MMM YYYY')
  }

/*Num of entries*/
  entryNum(num){
    if(num <= 1){
      return <div>Created {num} entry</div>
    } else {
      return <div>Created {num} entries</div>
    }
  }
/*Num of followers*/
  userNum(num){
    if(num <= 1){
      return <div>{num} follower</div>
    } else {
      return <div>{num} followers</div>
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

/*The <li> user list types, the followers/following icon should be here pending feature*/
    return this.props.users.map(function(el, index){
        return (
          <li className="list-group-item" key={ index }>
          <Link to={`/users/${el._id}`} activeClassName="active">
          {el.email}
          <div className="pull-sm-right">Join on {this.joinDate(el.createdAt)}</div>
          {this.entryNum(el.entries.length)}
          {this.userNum(el.followers.length)}
          <div>{el.follow.length} follows</div>
          </Link>

          {/*{this.ConnectionHandle(el.followers, el._id)}*/}
          <div className="btn btn-info" onClick={() => this.props.connectUser({id: el._id})}>+ user</div>
          <div className="btn btn-warning" onClick={() => this.props.disconnectUser({id: el._id})}>- user</div>
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
