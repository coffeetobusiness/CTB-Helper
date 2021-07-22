import { FETCH_ALL, CREATE, COMMENT,LIKE } from '../constants/actionTypes';

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
    console.log(post)
    const { data } = await api.createPost(post);
    console.log(data)


    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  console.log("i was here in actions")
  console.log(id)

  try {
    const { data } = await api.likePost(id);
    console.log("i was here in actions twice")
    console.log(data)
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const comment = (post,id) => async (dispatch) => {
  console.log("i was here in actions")
  console.log(id)

  try {
    const { data } = await api.comment(post,id);
    console.log("i was here in actions twice")
    console.log(data)
    dispatch({ type: COMMENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

