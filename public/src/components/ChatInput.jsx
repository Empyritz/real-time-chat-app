import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const msgRef = useRef()

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(prev => !prev)
  }

  const handleEmojiCLick = (emoji, event) => {
    msgRef.current.value += emoji.emoji
  }

  const senMessage = e => {
    e.preventDefault()
    if(msgRef.current.value.length > 0) {
      handleSendMsg(msgRef.current.value)
      msgRef.current.value = ''
    }
  }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <Picker className='picker' width='200px' height='250px' theme='dark' onEmojiClick={handleEmojiCLick} />}
        </div>
      </div>
      <form className='input-container' onSubmit={senMessage}>
        <input type="text" placeholder='Message' ref={msgRef} />
        <button className='submit' >
          <IoMdSend />
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
  background-color: #080420;
  padding: 0 1rem 0 2rem;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #f7dc1f;
        cursor: pointer;
      }
      .EmojiPickerReact {
        --epr-category-navigation-button-size: 20px;
        --epr-emoji-size: 20px;
        position: absolute;
        top: -290px;
        left: -10px; 
        box-shadow: 0 3px 13px #9a86f3;
        border-color: #9a86f3;
        .epr-header-overlay {
          display: none;
        }
        .epr-category-nav {
          padding: 0.4rem;
        }
        .epr-preview {
          display: none;
        }
        .epr-body{
          .epr-emoji-category-label{
            height: 1.3rem;
            font-size: 0.8rem;
          }
          .epr-emoji-category-content {
            margin: 0 3px 0 8px;
          }
          &::-webkit-scrollbar {
            width: 0.3rem;
            &-thumb {
              background-color: #ffffff39;
              border-radius: 1rem;
            }
          }
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    background-color: #ffffff34;
    padding-right: 0.8rem;
    input {
      width: 100%;
      heigh: 100%;
      padding: 0.8rem 0.8rem 0.8rem 1rem;
      background-color: transparent;
      color: white;
      border: none;
      font-size: 1.1rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 0.7rem 0.3rem 1rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      svg {
        font-size: 1.3rem;
        color: white;
      }
    }
  }
`

export default ChatInput