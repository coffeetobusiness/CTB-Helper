import axios from 'axios';

const url = 'http://localhost:4000/users/help';
console.log("i was here in api")

export const fetchPosts = () => axios.get(`${url}/post`);
export const createPost = (newPost) => axios.post(url, newPost);
