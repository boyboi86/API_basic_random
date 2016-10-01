import { GET_POSTS } from '../actions/types';
import { GET_EDITPOST } from '../actions/types';
import { RESET_ENTRY } from '../actions/types';
import { PATCH_POST } from '../actions/types';
import { DELETE_POST } from '../actions/types';
import { PATCH_EDITPOST } from '../actions/types';
import { PATCH_EDITPOST_DESC } from '../actions/types';
import { POST_ERR } from '../actions/types';

export default function( state = { post: [] }, action){
  switch (action.type) {
    case GET_POSTS:
      return { ...state, error: '', post: action.payload.data };
    case GET_EDITPOST:
      return { ...state, error: '', post: action.payload.data };
    case PATCH_POST:
      return { ...state, error: '', post: action.payload.data };
    case DELETE_POST:
      return { ...state, error: '', post: action.payload.data };
    case PATCH_EDITPOST:
      return {...state, error: '', post: action.payload };
    case PATCH_EDITPOST_DESC:
      return {...state, error: '', post: action.payload };
    case POST_ERR:
      return {...state, error: action.payload};
    }
    return state;
  }
