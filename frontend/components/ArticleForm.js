import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {

  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here

  useEffect(() => {
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
    console.log(props.currentArticleId)

    if(props.currentArticleId === null) {
      return setValues(initialFormValues)
      } 

    if(props.currentArticleId !== null) {
      const myCurrentArticle = props.articles[props.currentArticleId - 1]
      const nonObjectArticle = Object.values(myCurrentArticle)
           return setValues({...values,
              title: nonObjectArticle[1],
              text: nonObjectArticle[2],
              topic: nonObjectArticle[3]
          })
      }

  }, [props.currentArticleId]) //Whatever you put in here will rerender when there is a state change



  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()




    if(props.currentArticleId === null) {
      return props.postArticle(values)      
    }

    else if(props.currentArticleId !== null) {
      const myNewCurrentArticle = props.articles[props.currentArticleId - 1]
        console.log(myNewCurrentArticle.article_id)
          return props.updateArticle(myNewCurrentArticle.article_id, values)
      }
    


   // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
      //I need to do something like, "if article has an id then props.postArticle(values)"
    //"if article does have an id then props.updateArticle(values)"
    
    // props.currentArticleId === null ? props.postArticle(values) : props.updateArticle(props.currentArticleId, values) 
   setValues({...values, 
  initialFormValues})    
          
  }

  const onCancel = evt => {
    evt.preventDefault()
    setValues(initialFormValues)
    props.setCurrentArticleId(null)
  }

  const isDisabled = () => {
    if (values.title.trim().length > 0 && values.text.trim().length > 0 && values.topic.trim().length > 0) {
      return false
     } else {
      return true
     }
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      <h2>{props.currentArticleId === null ? "Create Article" : "Edit Article"}</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        <button disabled={isDisabled()} onClick={onCancel}>Cancel edit</button>
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
