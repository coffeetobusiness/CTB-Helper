import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    history.push('/home');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {    
    const { data } = await api.signUp(formData);
    // if (response.json()!=201) {
    //   const { message } = await response.json();
    //   throw Error(message);
    // }else{
      console.log(data)

      dispatch({ type: AUTH, data });

      history.push('/');
    }
    
   catch (error) {
    console.log(error);
  }
};