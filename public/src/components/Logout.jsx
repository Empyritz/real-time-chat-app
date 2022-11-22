import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
// import axios from 'axios'
import { BiPowerOff } from 'react-icons/bi'

const Logout = ({ socket, currentUser }) => {
  const navigate = useNavigate()
  const handleClick = async () => {
    const id = currentUser._id 
    socket.current.emit('logout', id)
    localStorage.clear()
    navigate('/login')
  }

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  height: 2.3rem;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`
export default Logout