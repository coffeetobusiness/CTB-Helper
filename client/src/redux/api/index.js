import axios from 'axios';

const url = 'http://localhost:4000/users';
// console.log("i was here in api")

const API = axios.create({ baseURL: 'http://localhost:4000/users' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = () => axios.get(`${url}/help/post`);
// export const createPost = (newPost) => axios.post(`${url}/help`, newPost);
export const createPost = (newPost) => API.post('/help', newPost);

export const likePost = (id) => API.put(`/${id}/likePost`)

export const signUp = (newPost) => axios.post(`${url}/register`, newPost);
export const signIn = (newPost) => axios.post(`${url}/login`, newPost);
