import React from 'react';

import Post from '../../components/Post/';
import Filter from '../../components/Filter/';

import './PostsContainer.css';

const PostsContainer = (props, filterByAuthors) => {
  const articles = [...props];

  return (
    <section className="articles">
      {/* {Filter(props, filterByAuthors)} */}
      {articles.map((article) => (
        article.isVisible ? 
          <Post key={article._id} author={article.author} title={article.title} content={article.content}/>
          : ''
      ))}
    </section>
  )
};

export default PostsContainer;