import axios from 'axios';

const url = 'http://localhost:9000';

export const signUp = (newPost) => axios.post(`${url}/register`, newPost);
export const signIn = (newPost) => axios.post(`${url}/login`, newPost);


