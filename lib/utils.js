import axios from 'axios';
import { POSTS_API_URL, AUTHORS_API_URL, MEDIA_API_URL } from './constants';

export const getAllPostsFromServer = async () => {
  //   get all posts from Server
  try {
    const { data } = await axios.get(POSTS_API_URL);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAuthor = async (id) => {
  try {
    const {
      data: { name },
    } = await axios.get(`${AUTHORS_API_URL}/${id}`);
    return name;
  } catch (error) {
    console.log(error);
  }
};

export const getFeaturedImage = async (id) => {
  try {
    const res = await axios.get(`${MEDIA_API_URL}/${id}`);
    return res.data.guid.rendered;
  } catch (error) {
    console.log(error);
    return '';
  }
};
