import React, { Component } from 'react';
import { ObjectID } from 'bson';

import './PostAdd.css';

class PostAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {title: '', author: '', content: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const id = new ObjectID();
    this.props.addPost({'_id': id.toString(), 'title': this.state.title, 'author': this.state.author, content: this.state.content, isVisible: true});
    this.setState({title: '', author: '', content: ''});
  }
  
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  
  render() {
    return (<form className="add-post-form" onSubmit={this.handleSubmit}>
      <h3 className="add-post-form__title">Add Post</h3>
      <input className="field-item" type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange}/>
      <input className="field-item" type="text" name="author" placeholder="Author" value={this.state.author} onChange={this.handleChange}/>
      <textarea className="field-item" name="content" placeholder="Content" value={this.state.content} onChange={this.handleChange}/>
      <button className="btn add-post-btn" type="submit">Post</button>
    </form>)
  }
};

export default PostAdd;