import reducer from './index'
import {
  ADD_POST,
  FILTER_POSTS_BY_AUTHOR
} from '../actions';
 
describe('authors reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        articles: [],
        authors: {}
      }
    )
  })
 
  it('should handle ADD_POST', () => {
    expect(
      reducer({
        articles: [],
        authors: {}
      }, {
        type: ADD_POST,
        payload: Object.assign({}, {
          _id: 1,
          author: 'testAuthor',
          title: 'testTitle',
          content: 'testContent'
        }, { isVisible: true })
      })
    ).toEqual({
      articles: [{
        _id: 1,
        author: 'testAuthor',
        title: 'testTitle',
        content: 'testContent',
        isVisible: true
      }],
      authors: {
        'testAuthor': [1]
      }
    })
  });

  it('should handle FILTER_POSTS_BY_AUTHOR', () => {
    expect(
      reducer({
        articles: [{
          _id: 1,
          author: 'testAuthor',
          title: 'testTitle',
          content: 'testContent',
          isVisible: true
        }, {
          _id: 2,
          author: 'testAuthor2',
          title: 'testTitle',
          content: 'testContent',
          isVisible: true
        }, {
          _id: 3,
          author: 'testAuthor',
          title: 'testTitle',
          content: 'testContent',
          isVisible: true
        }],
        authors: {
          'testAuthor': [1, 3],
          'testAuthor2': [2]
        }
      }, {
        type: FILTER_POSTS_BY_AUTHOR,
        payload: { author: 'testAuthor' }
      })
    ).toEqual({
      articles: [{
        _id: 1,
        author: 'testAuthor',
        title: 'testTitle',
        content: 'testContent',
        isVisible: true
      }, {
        _id: 2,
        author: 'testAuthor2',
        title: 'testTitle',
        content: 'testContent',
        isVisible: false
      }, {
        _id: 3,
        author: 'testAuthor',
        title: 'testTitle',
        content: 'testContent',
        isVisible: true
      }],
      authors: {
        'testAuthor': [1, 3],
        'testAuthor2': [2]
      }
    })
  })
})