import { GET_POSTS } from '../actions/types';

export default function( state = { post: [] }, action){
  switch (action.type) {
    case GET_POSTS:
      return { ...state , post: action.payload.data };
    }
    return state;
  }
