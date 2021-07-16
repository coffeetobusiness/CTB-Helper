import axios from 'axios';

// const url = 'http://localhost:5000/posts';
const url = 'http://localhost:4000/users/help';
console.log("i was here in api")

export const fetchPosts = () => axios.get(`${url}/post`);
// export const fetchPosts = () => fetch(`${url}/post`).then(response => response.json());
export const createPost = (newPost) => axios.post(url, newPost);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);
