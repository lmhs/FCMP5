import React, { Component } from 'react';
import './App.css';
import Post from './Post.js';

const Posts = (articles) => {
  return articles.map((article) => (
    <Post key={article._id} author={article.author} title={article.title} content={article.content}/>
  ))
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
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
      <section>{Posts(this.state.articles)}</section>
    )
  }
}

export default App;
