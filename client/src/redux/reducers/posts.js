import { FETCH_ALL, CREATE, LIKE, COMMENT } from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...posts];

    case COMMENT:
      return posts.map((post)=>(post._id === action.payload._id ? action.payload : post))
      // return posts;

    case LIKE:
      return posts.map((post)=>(post._id === action.payload._id ? action.payload : post))
      // return posts.map((post)=>action.payload)
      
    default:
      return posts;
  }
};

