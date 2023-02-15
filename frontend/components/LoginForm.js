import React, { useState } from 'react'
import PT from 'prop-types'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here
//not sure what to do here yet....

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }





//VVVVV I built these two out, I think they might need to go into the App.js

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
     props.login(values) 
    //^^^^^^^^^^^I THINK I NEED TO IMPORT THIS IN 
    //FROM APP.JS AND PUT IN THE VALUES LIKE THIS.
  }
  
  const isDisabled = () => {
   if (values.username.trim().length >= 3 && values.password.trim().length >= 8) {
    return false
   } else {
    return true
   }
  }

//^^^^ I built these two out, I think they might need to go into the App.js







  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
