import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';


import App from './components/app';
import Indexpage from './components/indexpage';
import Users from './components/users';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Entry from './components/entry';
import NewEntry from './components/newentry';
import EditEntry from './components/editentry';
import requiredAuth from './components/auth/require_auth';

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
        <Route path="entry/new" component= { requiredAuth(NewEntry) }  />
        <Route path="entry/edit" component= { requiredAuth(EditEntry) }  />
        <Route path="entry" components= { requiredAuth(Entry) } />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
