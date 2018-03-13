import React from 'react';
import './PostAdd.css'

const PostAdd = (state, addPost) => {
  return (
    <form>
      <input type="text" name="title" placeholder="Title"/>
      <input type="text" name="author" placeholder="Author"/>
      <textarea name="content" placeholder="Content"/>
      <button className="btn add-post-btn" type="button"
        onClick={() => {
          addPost(state, {'title':'New title'})
        }}>Submit</button>
    </form>
  )};

export default PostAdd;