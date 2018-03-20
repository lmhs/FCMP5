import { ADD_POST, FILTER_POSTS_BY_AUTHOR } from '../actions';

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
    default:
      return state;
  }
}


function filterByAuthors(state, author) {
  this.setState(Object.assign({}, state, {
    articles: state.articles.map((article) => {
      if (article.author === author || author === 'all') {
        return Object.assign({}, article, {isVisible: true});
      } else {
        return Object.assign({}, article, {isVisible: false});
      }
    })
  }));
}