import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authentication extends Component{

/*Defined contextTypes to access context */
    static contextTypes = {
        router: React.PropTypes.object
    }

/*Made used of context to define route*/
    componentWillMount(){
      if(!this.props.authenticated){
        this.context.router.push("/");
      }
    }

/*If component update check if user still sign in */
  componentWillUpdate(nextProps){
    if(!nextProps.authenticated){
      this.context.router.push("/");
    }
  }

    render(){
      return <ComposedComponent { ...this.props } />
    }
  }

function mapStateToProps(state){
  return { authenticated: state.auth.authenticated }
}

  return connect(mapStateToProps)(Authentication);
}
