import axios from 'axios';
import { browserHistory } from 'react-router';
import {reset} from 'redux-form';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  GET_USERS,
  GET_USERS_POST,
  GET_POSTS,
  GET_EDITPOST,
  PATCH_POST,
  PATCH_EDITPOST,
  PATCH_EDITPOST_DESC,
  POST_ERR,
  POST_DESCLEN,
  POST_TEXT } from './types';

let ROOT_URL;
if(process.env.NODE_ENV != "production"){
 ROOT_URL = "//localhost:3000"
} else {
 ROOT_URL = "//glacial-cove-64389.herokuapp.com"
axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'PATCH, DELETE, POST, GET, OPTIONS';
}

const axiosOption = {headers: { authorization : localStorage.getItem('token')}}

/*Sign in user*/
export function signinUser({ email, password }){
  return function(dispatch){
    axios.post(`${ROOT_URL}/users/signin`, { email, password })
    .then(function(res){
      dispatch({ type: AUTH_USER })
      localStorage.setItem('token', res.data.token);
      browserHistory.push('/');
    })
    .catch(function(err){
      dispatch(authError('Invalid email or password'))
      console.log({err});
    })
  }
}

/* Sign Up user */
export function signupUser({email, password}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/users/signup`, { email, password })
    .then(function(res){
      dispatch({ type: AUTH_USER })
      localStorage.setItem('token', res.data.token);
      browserHistory.push('/');
    })
    .catch(function(err){
      dispatch(authError('Invalid email or email has been registered'))
      console.log({err});
    })
  }
}

export function signoutUser(){
  return function(dispatch){
    dispatch({ type : UNAUTH_USER })
    localStorage.removeItem('token');
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

/*Get the entire list of users within database based on latest join date
  Route: /users */
export function getUsers(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/users`, axiosOption)
    .then(function(res){
      dispatch({
        type: GET_USERS,
        payload: res
      })
    })
    .catch(function(err){
      console.log({err})
    })
  }
}

/*Get the entire list of post by a user within database */
export function getOtherUsersPost({id}){
  return function(dispatch){
    axios.get(`${ROOT_URL}/users/${id}`)
    .then(function(res){
      dispatch({
        type: GET_USERS_POST,
        payload: res.data
      })
    })
    .catch(function(err){
      console.log({err});
    })
  }
}

/*The Below actions are all for new entries and entries related
  Route:/entry */

/* Get a list of own post */
export function getOwnPosts(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/entries/`, axiosOption)
    .then(function(res){
      dispatch({
        type: GET_POSTS,
        payload: res
      })
    })
    .catch(function(err){
      console.log({err})
    })
  }
}

/* Delete single post no need for dispatch
  Route: /entry */
export function deletePosts(_id){
  return function(dispatch){
    axios.delete(`${ROOT_URL}/entries/${_id}`, axiosOption)
    .then(function(res){
      console.log(res);
    })
    .catch(function(err){
      console.log({err})
    })
  }
}
/* Delete Enter a single new post
  Route: /entry/new */
export function postEntry({title, description}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/entries/new`, {title, description}, axiosOption)
    .then(function(res){
      browserHistory.push('/entry')
    })
    .catch(function(err){
      dispatch(postErr('word count limit exceeded'));
      console.log({err});
    })
  }
}

/* Create new post handles for char count and text*/
export function onDescLength({ description, length }){
  return function(dispatch){
    dispatch({
          type: POST_DESCLEN,
          payload: length
    });
    dispatch({
      type: POST_TEXT,
      payload: description
    });
  }
}

/*GET specific post for editing
  Route: /entry/edit/:id */
export function getEditPost({id}){
  return function(dispatch){
    axios.get(`${ROOT_URL}/entries/${id}`, axiosOption)
    .then(function(res){
      dispatch({
        type: GET_EDITPOST,
        payload: res
      })
    })
    .catch(function(err){
        console.log({err});
    })
  }
}
/* For edit post use only
  Route: /entry/edit/:id */
export function patchPost({title, description, id}){
  return function(dispatch){
    axios.patch(`${ROOT_URL}/entries/${id}`, { title, description } ,axiosOption)
    .then(function(res){
      dispatch({
        type: PATCH_POST,
        payload: res
      })
      browserHistory.push('/entry');
    })
    .catch(function(err){
      dispatch(postErr('word count limit exceeded'))
      console.log({err});
    })
  }
}

/* Change for input  for edit entry
  Route: entry/edit/:id */
export function onTitleChange({title}){
  return function(dispatch){
    dispatch({
      type: PATCH_EDITPOST,
      payload: title
    })
  }
}
/* Change for input  for edit entry
  Route: entry/edit/:id */
export function onDescChange({description}){
  return function(dispatch){
    dispatch({
      type: PATCH_EDITPOST_DESC,
      payload: description
    })
  }
}

/* Error message for all post props */
export function postErr(err){
  return {
    type: POST_ERR,
    payload: err
  }
}
