import React from 'react';

import Post from '../../components/Post/';
import Filter from '../../components/Filter/';

import './PostsContainer.css';

const PostsContainer = (articlesProps, authorsProps, filterByAuthors) => {
  const articles = [...articlesProps];
  const authors = Object.assign({}, authorsProps);
  const state = {
    articles,
    authors
  };

  return (
    <section>
      {Filter(state, filterByAuthors)}
      <section className="articles">
        {articles.map((article) => (
          article.isVisible ? 
            <Post key={article._id} author={article.author} title={article.title} content={article.content}/>
            : ''
        ))}
      </section>
    </section>
  )
};

export default PostsContainer;