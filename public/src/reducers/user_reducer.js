import { GET_USERS } from '../actions/types';

export default function( state = { user: [] }, action){
  switch (action.type) {
    case GET_USERS:
      return { ...state , user: action.payload.data.users };
    }
    return state;
  }
