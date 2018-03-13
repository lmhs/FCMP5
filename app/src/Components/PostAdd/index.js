import React from 'react';
import './PostAdd.css'

const PostAdd = (state, addPost) => {
  return (
    <form className="add-post-form">
      <h3 className="add-post-form__title">Add Post</h3>
      <input className="field-item" type="text" name="title" placeholder="Title"/>
      <input className="field-item" type="text" name="author" placeholder="Author"/>
      <textarea className="field-item" name="content" placeholder="Content"/>
      <button className="btn add-post-btn" type="button"
        onClick={() => {
          addPost(state, {'title': 'New title', 'author': '', isVisible: true})
        }}>Submit</button>
    </form>
  )};

export default PostAdd;