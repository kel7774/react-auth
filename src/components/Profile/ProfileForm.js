import classes from './ProfileForm.module.css'
import { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
const ProfileForm = () => {
  const history = useHistory()
  const authContext = useContext(AuthContext)
  const newPasswordInputRef = useRef()
  const submitHandler = (e) => {
    e.preventDefault()
    const enteredNewPassword = newPasswordInputRef.current.value
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCMwolnbk8B1vWa6cErI8ycvLX0obaSlQA', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authContext.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      history.replace('/')
    })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPasswordInputRef} type='password' id='new-password' minLength='7' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
