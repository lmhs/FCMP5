import React, { Component } from 'react';
import './App.css';
import Post from './Post.js';

const Posts = (articles) => {
  return articles.map((article) => (
    <Post key={article._id} author={article.author} title={article.title} content={article.content}/>
  ))
};

class App extends Component {
  state = {articles: []}

  componentDidMount() {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        const articles = data.articles;
        if (articles) this.setState({ articles });
      }
      );
  }

  render() {
    return (
      <section>{Posts(this.state.articles)}</section>
    )
  }
}

export default App;
