import React from 'react'
import "./Header.css"
import {FaHome} from "react-icons/fa"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../../config/firebaseConfig'
import { signOut } from 'firebase/auth'


const Header = () => {

  //get user data

  const [user] = useAuthState(auth);

    const categories = ["Health", "Food", "Travel", "Technology"]

    const navigate = useNavigate();


  return (
    <div className='header-container'>
      <FaHome style={{cursor:"pointer"}} onClick={() => navigate('/')}/>
      {
        user && <Link to="/addarticle" className='auth-link'>Add Article</Link>
      }
      <div className="categories-container">
        {
            categories.map(item => <Link className='nav-link' to={`/category/${item}`} key={item}>{item}</Link>)
        }
      </div>

      {
        user ? <div>
          <span className='username'>{user?.displayName}</span>
          <button className="auth-link" onClick={() => signOut(auth)}>Log Out</button>
        </div>
        :
        <Link to="/auth" className='auth-link'>Sign Up</Link>
      }

    </div>
  )
}

export default Header
