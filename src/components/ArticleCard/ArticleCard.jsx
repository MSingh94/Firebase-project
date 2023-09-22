import React from 'react'
import "./ArticleCard.css"
import { Link } from 'react-router-dom'


function ArticleCard({article}) {
  return (
    <div className='article-card'>
        <img src={article?.imageUrl}/>
        <div className="article-card-info">
            <p>{article.title}</p>
            <p></p>
            </div>        
        </div>
  )
}

export default ArticleCard
