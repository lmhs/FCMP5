import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import PostContainer from '../PostsContainer/';
import Post from '../../components/Post/';
import PostAdd from '../../components/PostAdd/';
import { addPost } from '../../actions';

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

// function addPost(state, article) {
//   this.setState(Object.assign({}, state, {articles: [article, ...state.articles]}));
// }

function getAuthors(articles) {
  return articles.reduce((acc, article) => {
    if (article.author) {
      if (!acc.hasOwnProperty(article.author)) {
        acc[article.author] = [article._id];
      } else {
        acc[article.author].push(article._id)
      }
    }
    return acc
  }, {});
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

const mapStateToProps = state => ({
  articles: state
});

const mapDispatchToProps = dispatch => ({
  addPost(article) {
    dispatch(addPost(article.title, article.author, article.content));
  }
});

class App extends Component {
  state = {articles: [], authors: {}};

  componentWillMount() {
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
        const authors = getAuthors(articles);
        if (articles) this.setState({ articles, authors });
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
        <section>{PostContainer(this.props.articles, filterByAuthors.bind(this))}</section>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
