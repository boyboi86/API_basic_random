import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth_reducer';
import users from './user_reducer';
import posts from './post_reducer';

const rootReducer = combineReducers({
  form,
  auth,
  users,
  posts
});

export default rootReducer;
