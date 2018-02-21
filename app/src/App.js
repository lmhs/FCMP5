import React, { Component } from 'react';
import './App.css';
import Post from './Post.js';
import data from './data.json';

const articles = data.articles;

const Posts = articles.map((article) => (
  <Post key={article.id} author={article.author} title={article.title} content={article.content}/>
));

class App extends Component {
  render() {
    return (
      <section>{Posts}</section>
    )
  }
}

export default App;
