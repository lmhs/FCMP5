export const ADD_POST = 'ADD_POST';
export const FILTER_POSTS_BY_AUTHOR = 'FILTER_POSTS_BY_AUTHOR';

export const addPost = (article) => ({
  type: ADD_POST,
  payload: Object.assign({}, article, { isVisible: true })
});

export const filterPostsByAuthor = (author) => ({
  type: FILTER_POSTS_BY_AUTHOR,
  payload: { author }
})