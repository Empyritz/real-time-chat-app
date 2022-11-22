/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { allUsersRoute, host } from '../utils/APIRoutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import { io } from 'socket.io-client'

function Chat() {
  const socket = useRef()
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)

  useEffect(() => {
    const getUser = async() => {
      console.log('user')
      const user = await JSON.parse(localStorage.getItem('chat-app-user'))
      setCurrentUser(user) 
    }
    getUser()
  }, [])

  useEffect(() => {
    if(currentUser){
      socket.current = io(host)
      socket.current.emit('add-user', currentUser._id)
      console.log('add-user')
      console.log(socket.current)
    }
  }, [currentUser])

  useEffect(() => {
    const fetchContacts = async() => {
      if(currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
        setContacts(data.data)
      }else {
        navigate('/setAvatar')
      }
    }
    fetchContacts()
  }, [currentUser, navigate])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }  

  return (
    <Container>
      <div className="container">
        <Contacts 
          contacts={contacts} 
          currentUser={currentUser} 
          changeChat={handleChatChange}/>
          {currentChat ? 
            <ChatContainer 
              currentChat={currentChat} 
              currentUser={currentUser} 
              socket={socket}
            /> :
            <Welcome currentUser={currentUser}/>}
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 80vw;
    background-color: #00000076;
    display: grid; 
    grid-template-columns: 20% 80%;
    @media screen and (min-width: 720px) and (max-width: 1080px){
      grid-template-columns: 25% 75%;
    }
  }
`

export default Chat