import React from 'react';
import PropTypes from 'prop-types'
import './Article.css';

const Article = ({ author, authorImage, authorLink, date, body, image }) => {
  const imagePlace = image ? <img src={image} alt="Прикрепленное изображение" /> : ""
  return (
    <article>
      <div className="avatar" onClick={authorLink}><img src={authorImage} alt={author}/></div>
      <h2 onClick={authorLink}>{author}</h2>
      <div className="date">{new Date(date).toLocaleString("ru", {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})}</div>
      <div className="body">
        <p>{body}</p>
        {imagePlace}
      </div>
      <div className="footer">Здесь могли быть ваши лайки</div>
  </article>
)}

Article.propTypes = {
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
}

export default Article
