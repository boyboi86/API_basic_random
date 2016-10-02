import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';


import App from './components/app';
import Indexpage from './components/indexpage';
import Users from './components/entries/users';
import UsersPost from './components/entries/user_post';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Entry from './components/entries/entry';
import NewEntry from './components/entries/new_entry';
import EditEntry from './components/entries/edit_entry';
import requiredAuth from './components/auth/require_auth';
import NotFound from './components/notfound';

import { AUTH_USER } from './actions/types';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

/*To ensure if user has token in localStorage, they do not need to re-authenticate */
const token = localStorage.getItem('token');
if(token){
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={ browserHistory }>
      <Route path="/" component={ App } >
      <IndexRoute component={ Indexpage } />
        <Route path="signin" component={ Signin } />
        <Route path="signout" component={ Signout } />
        <Route path="signup" component={ Signup } />
        <Route path="users" component= { requiredAuth(Users) } />
        <Route path="user/:id" component={ requiredAuth(UsersPost) } />
        <Route path="entry/new" component= { requiredAuth(NewEntry) }  />
        <Route path="entry/edit/:id" component= { requiredAuth(EditEntry) }  />
        <Route path="entry" component= { requiredAuth(Entry) } />
        <Route path="*" component = { NotFound } />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
