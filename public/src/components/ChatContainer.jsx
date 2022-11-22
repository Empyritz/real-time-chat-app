import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import Logout from './Logout'
// import Messages from './Messages'
import axios from 'axios'
import { sendMessageRoute, getAllMessagesRoute } from '../utils/APIRoutes'
import { v4 as uuidv4 } from 'uuid'

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([])
  const scrollRef = useRef() 

  useEffect(() => {
    if(currentChat){
      const fetchMessages = async() => {
        const data = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id
        })
        return data
      }
      fetchMessages()
        .then(res => {
          // console.log(res.data)
          setMessages(res.data)
        })
    }
  }, [currentChat, currentUser])

  const handleSendMsg = async(msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    })
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser._id,
      message: msg
    })

    const msgs = [...messages]
    msgs.push({fromSelf: true, message: msg})
    setMessages(msgs)
  }

  useEffect(() => {
    if(socket.current){
      console.log('socket')
      socket.current.on('msg-receive', (msg) => {
        console.log('msg-received')
        const arrivalMessage = ({fromSelf: false, message: msg})
        setMessages(prev => [...prev, arrivalMessage])
      })
    }
  }, [socket])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [messages])

  return(
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}  alt='avatar' />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout socket={socket} currentUser={currentUser}/>
      </div>
      <div className="chat-messages">
        { 
          messages.map((msg) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div className={`message ${msg.fromSelf ? 'sended' : 'received'}`}>
                  <div className="content">
                    <p>
                      {msg.message}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      {/* <Messages /> */}
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )
} 

const Container = styled.div`
padding-top: 1rem;
display: grid;
grid-template-rows: 10% 78% 12%;
overflow: hidden;
.chat-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  .user-details{
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
      img{
        height: 3rem;
      }
    }
    .username {
      color: white;
    }
  }
}
.chat-messages {
  color: #d1d1d1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  padding-bottom: 0.8rem;
  &::-webkit-scrollbar {
    width: 0.4rem;
    &-thumb{
      background-color: #ffffff39;
      border-radius: 1rem;
    }  
  }
  .sended {
    justify-content: flex-end;
    padding-right: 1.3rem;
    .content{
      background-color: #9186f3;
    }
  }
  .received {
    justify-content: flex-start;
    padding-left: 1.6rem; 
    .content{
      background-color: #3f3c52;
    }
  }
  .message {
    display: flex;
    .content{
      font-size: 0.9rem;
      width: auto;
      padding: 0.4rem 0.8rem;
      border-radius: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
`

export default ChatContainer