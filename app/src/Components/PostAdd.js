import React from 'react';

const PostAdd = (state, addPost) => {
  return (
    <form>
      <input type="text" name="title" placeholder="Title"/>
      <input type="text" name="author" placeholder="Author"/>
      <textarea name="content" placeholder="Content"/>
      <button style={{border: '4px solid #333',padding: '10px'}} type="button" onClick={() => {addPost(state, {'title':'New title'})}}>Submit</button>
    </form>
  )};

export default PostAdd;