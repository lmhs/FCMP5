import React from 'react';
import Post from '../../Components/Post/';
import Filter from '../../Components/Filter/';

const PostsContainer = (articles) => {
  return (
    <section className="articles">
      {Filter(articles)}
      {articles.map((article) => (
        <Post key={article._id} author={article.author} title={article.title} content={article.content}/>
      ))}
    </section>
  )
};

export default PostsContainer;