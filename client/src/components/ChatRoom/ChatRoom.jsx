import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ChatRoom.css';
import useChat from '../../hooks/useChat';

export const ChatRoom = (props) => {
  const { roomId } = useParams();
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState('');

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleMessageSubmit = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  console.log(roomId);
  return (
    <div className='chat-room-container'>
      <h1 className='room-name'>Room: {roomId}</h1>
      <div className='messages-container'>
        <ol className='messages-list'>
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`message-item ${
                msg.ownedByCurrentUser ? 'my-message' : 'received-message'
              }`}
            >
              {msg.content}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleMessageChange}
        placeholder='Write your message...'
        className='new-message-input-field'
      />
      <button onClick={handleMessageSubmit} className='send-message-button'>
        Send Message
      </button>
    </div>
  );
};
