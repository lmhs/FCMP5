import React from 'react';
import Post from '../../Components/Post/';
import Filter from '../../Components/Filter/';

const PostsContainer = (state, filterByAuthors) => {
  const articles = [...state.articles];

  return (
    <section className="articles">
      {Filter(state, filterByAuthors)}
      {articles.map((article) => (
        article.isVisible ? 
          <Post key={article._id} author={article.author} title={article.title} content={article.content}/>
          : ''
      ))}
    </section>
  )
};

export default PostsContainer;