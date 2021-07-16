import { FETCH_ALL, CREATE } from '../constants/actionTypes';

import * as api from '../api/index';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  console.log("i was here in actions")
  try {
    const { data } = await api.createPost(post);
  console.log(data)


    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

