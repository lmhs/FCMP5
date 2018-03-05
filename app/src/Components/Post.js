import React from 'react';

const Post = (props) => (
  <article>
    <h2>{props.title}</h2>
    <h3>By {props.author}</h3>
    <p>{props.content}</p>
  </article>
);

export default Post;