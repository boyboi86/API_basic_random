import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = "http://localhost:3000"

export function signinUser({ email, password }){
  return function(dispatch){
    axios.post(`${ROOT_URL}/users/signin`, { email, password })
    .then(function(res){
      dispatch({ type: AUTH_USER})
      localStorage.setItem('token', res.data.token);
      browserHistory.push('/users');
    })
    .catch(function(err){
      dispatch(authError('Invalid email or password'))
      console.log({err});
    })
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
