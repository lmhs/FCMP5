import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PostsCreator.css';
import PostContainer from '../PostsContainer/';
import Post from '../../components/Post/';
import PostAdd from '../../components/PostAdd/';
import {
  addPost,
  filterPostsByAuthor,
  fetchArticlesSuccess
} from '../../actions';

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const mapStateToProps = state => ({
  articles: state.articles,
  authors: state.authors
});

const mapDispatchToProps = dispatch => ({
  addPost(article) {
    dispatch(addPost(article));
  },
  filterPostsByAuthor(state, author) {
    dispatch(filterPostsByAuthor(state, author));
  },
  fetchArticlesSuccess(articles) {
    dispatch(fetchArticlesSuccess(articles));
  }
});

class PostsCreator extends Component {
  state = {articles: [], authors: {}};

  componentDidMount() {
    fetch('/api/posts', {
      headers: {
        'accept': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNzViNTNjMDFjYjhmNmU1ZjRmOThkYSIsImlhdCI6MTUxNzk1NDA3M30.Nw1UMGBRJm50iZdmwW0QnEvbCc-il1wpfYb2W2UCl1c',
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then(handleErrors)
      .then(res => {
        return res.json()
      })
      .then(data => {
        const articles = data.articles.map((article) => Object.assign({}, article, {isVisible: true}));
        if (articles) {
          this.props.fetchArticlesSuccess(articles);
        }
        return data;
      })
      .catch(function() {
        console.log('error');
      });
  }

  render() {
    return (
      <section>
        <section>
          <PostAdd mainState={this.props.articles} addPost={this.props.addPost}/>
        </section>
        <section>{PostContainer(this.props.articles, this.props.authors, this.props.filterPostsByAuthor)}</section>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsCreator);
