import {
  ADD_POST,
  FILTER_POSTS_BY_AUTHOR,
  FETCH_ARTICLES_SUCCESS
} from '../actions';

import { getAuthors } from '../utils';

export default (state = {articles: [], authors: {}}, action) => {
  switch (action.type) {
    case ADD_POST:
      const articlesByAuthor = state.authors[action.payload.author] || [];
      return Object.assign({}, state, {
        articles: [action.payload, ...state.articles],
        authors: Object.assign({}, state.authors,
          {[action.payload.author]: [action.payload._id, ...articlesByAuthor]})
      });
    case FILTER_POSTS_BY_AUTHOR:
      return Object.assign({}, state, {
        articles: state.articles.map((article) => {
          if (article.author === action.payload.author || action.payload.author === 'all') {
            return Object.assign({}, article, {isVisible: true});
          } else {
            return Object.assign({}, article, {isVisible: false});
          }
        })
      });
    case FETCH_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        articles: action.payload.articles,
        authors: getAuthors(action.payload.articles)
      });
    default:
      return state;
  }
}
