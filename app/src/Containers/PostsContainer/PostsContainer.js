import React from 'react';
import Post from '../../Components/Post';

const PostsContainer = (articles) => {
  return articles.map((article) => (
    <Post key={article._id} author={article.author} title={article.title} content={article.content}/>
  ))
};

export default PostsContainer;