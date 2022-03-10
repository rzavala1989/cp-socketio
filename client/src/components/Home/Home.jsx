import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const [room, setRoom] = useState('');

  const handleChange = (e) => {
    setRoom(e.target.value);
  };

  return (
    <div className='home-container'>
      <input
        type='text'
        placeholder='Enter Room Name here...'
        value={room}
        onChange={handleChange}
        className='text-input-field'
      />
      <Link to={`/${room}`} className='enter-room-button'>
        Enter Chat Room
      </Link>
    </div>
  );
};
