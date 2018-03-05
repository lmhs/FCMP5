import React, { Component } from 'react';
import './App.css';
import PostContainer from '../PostsContainer/PostsContainer';
import Post from '../../Components/Post';
import PostAdd from '../../Components/PostAdd';

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function addPost(state, article) {
  this.setState({articles: [article, ...state.articles]});
}

class App extends Component {
  state = {articles: []}

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
        const articles = data.articles;
        if (articles) this.setState({ articles });
      })
      .catch(function() {
        console.log('error');
      });
  }

  render() {
    return (
      <section>
        <section>{PostAdd(this.state, addPost.bind(this))}</section>
        <section>{PostContainer(this.state.articles)}</section>
      </section>
    )
  }
}

export default App;
