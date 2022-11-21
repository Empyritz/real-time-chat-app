import React from 'react'
import { Navigate } from 'react-router-dom'

const checkLogged = ({children}) => {
  const user = localStorage.getItem('chat-app-user') 
  // eslint-disable-next-line no-restricted-globals
  const route = location.pathname

  if(user && (route === '/login' || route === '/register')){
    return <Navigate to='/' />
  }else if(!user && (route === '/' || route === '/setAvatar')){
    return <Navigate to='/login' />
  }else{
    return (
    <>
      {children}
    </>
  )}
}

export default checkLogged
