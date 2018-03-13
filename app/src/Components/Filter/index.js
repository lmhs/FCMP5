import React from 'react';
import './Filter.css';

const Filter = (articles) => {
  const authors = articles.reduce((acc, article) => {
    acc[article._id] = article.author;
    return acc
  }, {});
  
  return (
    <div className="filter-items">
      {
        Object.keys(authors).map((key) => {
          console.log(authors[key]);
          {return <button className="filter-item" type="button" key="{key}">{authors[key]}</button>}
        })
      }
    </div>
  )
}

export default Filter;