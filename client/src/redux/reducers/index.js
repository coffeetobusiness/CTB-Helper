import { combineReducers } from 'redux';

import posts from './posts';
import authReducer from './authReducers';

export const reducers = combineReducers({ posts,authReducer });
