export const ADD_POST = 'ADD_POST';
export const FILTER_POSTS_BY_AUTHOR = 'FILTER_POSTS_BY_AUTHOR';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';

export const addPost = (article) => ({
  type: ADD_POST,
  payload: Object.assign({}, article, { isVisible: true })
});

export const filterPostsByAuthor = (author) => ({
  type: FILTER_POSTS_BY_AUTHOR,
  payload: { author }
});

export const fetchArticlesSuccess = (articles) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: { articles }
});