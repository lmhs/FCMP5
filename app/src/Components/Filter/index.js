import React from 'react';
import './Filter.css';

const Filter = (state, filter) => {
  const articles = state.articles;
  const authors = Object.assign({}, state.authors, {'all': articles.map((article) => article._id)});
  
  return (
    <div className="filter-items">
      {
        Object.keys(authors).map((key) => {
          {
            return <button className="filter-item" type="button" key={key} onClick={
              () => {
                filter(state, key)
              }
            }>{key}</button>
          }
        })
      }
    </div>
  )
}

export default Filter;