import React, { useRef } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'

function Register() {
  const navigate = useNavigate()
  // refs
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  // values
  // const password = passwordRef.current
  // const passwordConfirm = passwordConfirmRef.current
  // const username = usernameRef.current
  // const email = emailRef.current


  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(handleValidation()){
      const {data} = await axios.post(registerRoute, {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      if(data.status === false){
        toast.error(data.msg, toastOptions)
      }
      if(data.status === true){
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate('/')
      }
    }
  }

  const handleValidation = () => {
    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      toast.error('password and confirm password should be same', toastOptions)
      return false
    }else if(usernameRef.current.value.length < 5){
      toast.error('Username should be greater than 4 characters', toastOptions)
      return false
    }else if(passwordRef.current.value.length < 9){
      toast.error('Password should be greater than 8 characters', toastOptions)
      return false
    }else if(emailRef.current.value === ''){
      toast.error('Email is required', toastOptions)
    }
    return true
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>snappy</h1>
          </div>
          <input type="text" placeholder='Username' name='username' ref={usernameRef} />
          <input type="email" placeholder='Email' name='email' ref={emailRef} />
          <input type="password" placeholder='Password' name='password' ref={passwordRef} />
          <input type="password" placeholder='Confirm password' name='confirmPassword' ref={passwordConfirmRef}  />
          <button type='submit'>Create User</button>
          <span>Already have an account ? <Link to='/login'>Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {  
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem; 
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      tex-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register