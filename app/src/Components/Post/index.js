import React from 'react';

import './Post.css';

const Post = (props) => (
  <article className="article">
    <div className="article-body">
      <h2 className="article-title">{props.title}</h2>
      <span className="article-author">By {props.author}</span>
      <p className="article-content">{props.content}</p>
    </div>
  </article>
);

export default Post;