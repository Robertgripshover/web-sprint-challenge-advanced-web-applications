import React, { useEffect } from 'react'
import PT from 'prop-types'
import { useNavigate } from 'react-router-dom'


export default function Articles(props) {


  const navigate = useNavigate()
  const redirectToLogin = () => {navigate('/')}
  const token = localStorage.getItem('token')


  useEffect(() => {
    token !== null ? props.getArticles() : redirectToLogin()
  }, []); 


  const isDisabled = () => {
    if (props.currentArticleId !== null) {
     return true
    } else {
     return false
    }
   }
   

  return (
    <div className="articles">
      <h2>Articles</h2>
      {
        !props.articles.length
          ? 'No articles yet'
          : props.articles.map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button disabled={isDisabled()} onClick={() => {props.setCurrentArticleId(art.article_id)}}>Edit</button>
                  <button disabled={isDisabled()} onClick={() => {props.deleteArticle(art.article_id)}}>Delete</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}
