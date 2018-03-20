export const ADD_POST = 'ADD_POST';

export const addPost = (title, author, content) => ({
  type: ADD_POST,
  payload: {
    title,
    author,
    content,
    isVisible: true
  }
});