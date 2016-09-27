import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
//testing only
import reactRouterToArray from 'react-router-to-array';

import App from './components/app';
import Indexpage from './components/indexpage';
import Users from './components/users';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import requiredAuth from './components/auth/require_auth';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={ browserHistory }>
      <Route path="/" component={ App } >
      <IndexRoute component={ Indexpage } />
        <Route path="signin" component={ Signin } />
        <Route path="signout" component={ Signout } />
        <Route path="signup" component={ Signup } />
        <Route path="users" component= { requiredAuth(Users) } />
        {/*<Route path="newEntry" component= { requiredAuth(NewEntry) }  />
        <Route path="Entry/:id" components= { requiredAuth(Entry) } />*/}
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
