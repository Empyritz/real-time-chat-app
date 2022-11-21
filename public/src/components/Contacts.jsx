import React, { useState } from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.svg' 

const Contacts = ({ contacts, currentUser, changeChat }) => {
  // const [currentUserName, setCurrentUserName] = useState(undefined)
  // const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currenSelected, setCurrentSelected] = useState(undefined)
  // useEffect(() => {
  //   if(currentUser){
  //     setCurrentUserImage(currentUser.avatarImage)
  //     setCurrentUserName(currentUser.username)
  //   }
  // }, [currentUser])

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  }
  const contactsList = contacts.map((contact, index) => {
    return (
      <div 
        key={index} 
        className={`contact ${index === currenSelected ? 'selected' : ''}`}
        onClick={() => changeCurrentChat(index, contact)}
      >
        <div className="avatar">
          <img src={`data:image/svg+xml;base64,${contact.avatarImage}`}  alt='avatar' />
        </div>
        <div className='username'>
          <h3>{contact.username}</h3>
        </div>
      </div>
    )
  })
  // console.log(currentUser)
  return (
    <>
      {
        currentUser?.avatarImage && currentUser?.username && (
          <Container>
            <div className="brand">
              <img src={Logo} alt='Logo' />
              <h3>snappy</h3>
            </div>
            <div className="contacts">
              {contactsList}
            </div>
            <div className="current-user">
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}  alt='avatar' />
              </div>
              <div className="username">
                <h2>{currentUser.username}</h2>
              </div>
            </div>
          </Container>
        ) 
      }
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  color: white;
  .brand {
    display: flex; 
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex; 
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      display: flex;
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.23rem;
      padding: 0.9rem;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img{
          height: 3rem;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .avatar{
      img{
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px){
      gap: 2rem;
      .username {
        h2 {
          font-size: 1.2rem;
        }
      }
    }
  }
`

export default Contacts