import { GET_USERS } from '../actions/types';
import { GET_USERS_POST } from '../actions/types';

export default function( state = { user: [] }, action){
  switch (action.type) {
    case GET_USERS:
      return { ...state , user: action.payload.data.users };
    case GET_USERS_POST:
      return {...state, user: action.payload.user };
    }
    return state;
  }
