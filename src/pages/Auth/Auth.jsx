import React, { useState } from 'react'
import "./Auth.css"
import App from '../../App';

function Auth() {

    const [existingUser, setExistingUser] = useState(false);



  return (
    <div className='auth-container'>
        {existingUser ? <form className='auth-form'>
            <h1>Login with your email</h1>
            <div className="form-group">
                <input type="email" placeholder='Your Email Here' required />
                <input type="password" placeholder='Your Password Here' required />
            </div>
            <button type='submit'>Login</button>
            <p>Don't have an account? 
                <span className='form-link'>Signup</span>
            </p>
            </form> 
            : 
            <form>Signup</form>}
      
    </div>
  )
}

export default Auth
