import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'
import axiosWithAuth from '../axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

//I THINK THAT I NEED TO PULL IN 
//USERNAME AND PASSWORD AS PROPS FROM
//LOGIN FORM SOMEHOW UP HERE

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState(null)
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { /* ✨ implement */ navigate('/')}
  const redirectToArticles = () => { /* ✨ implement */ navigate('/articles')}

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    window.localStorage.removeItem('token')
    setArticles([])
    setMessage('Goodbye!')
    redirectToLogin()
  }

  const login = ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    setMessage('')
    setSpinnerOn(true)
    axios.post(`http://localhost:9000/api/login`, {username, password})
      .then(res => {
        localStorage.setItem('token', res.data.token)
        setMessage(res.data.message)
        redirectToArticles()
        setSpinnerOn(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().get('/articles')
      .then(res => {
        setArticles(res.data.articles)
        setMessage(res.data.message)
        setSpinnerOn(false)
      })
      .catch(err => {
        console.log(err)
        setMessage('Sorry, must be signed in')
        setSpinnerOn(false)
        redirectToLogin()
      })
  } 


  const getArticlesAfterPostofUpdate = () => {
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().get('/articles')
      .then(res => {
        setArticles(res.data.articles)
        setSpinnerOn(false)
     })
      .catch(err => {
        console.log(err)
        setSpinnerOn(false)
      })
  } //<<<< This is my own creation

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().post('/articles', article)
      .then(res => {
        getArticlesAfterPostofUpdate()
        setMessage(res.data.message)
        setSpinnerOn(false)
      })
      .catch(err => {
        console.log(err)
        setSpinnerOn(false)
      })
  } 

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().put(`/articles/${article_id}`, article)
      .then(res => {
        getArticlesAfterPostofUpdate()
        setMessage(res.data.message)
        console.log(res)
        setSpinnerOn(false)
      })
      .catch(err => {
        console.log(err)
        setSpinnerOn(false)
      })
  }

  const deleteArticle = article_id => {
    console.log(article_id)
    // ✨ implement
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().delete(`/articles/${article_id}`)
      .then(res => {
        console.log(res)
        setMessage(res.data.message)
        getArticlesAfterPostofUpdate()
        setSpinnerOn(false)
      })
      .catch(err => {
        console.log(err)
        setSpinnerOn(false)
      })
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner /*I do not know what props to pass in here*/ />
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />
          <Route path="articles" element={
            <>
              <ArticleForm postArticle={postArticle} updateArticle={updateArticle} currentArticleId={currentArticleId} articles={articles} setCurrentArticleId={setCurrentArticleId}/>
              <Articles getArticles={getArticles} deleteArticle={deleteArticle} articles={articles} currentArticleId={currentArticleId} setCurrentArticleId={setCurrentArticleId}/>
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
