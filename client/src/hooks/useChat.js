import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:4000';
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';

export const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    //Create a websocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    //Listen for new messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      let incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    //destroy this reference of the socket whenever connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageContent) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      senderId: socketRef.current.id,
      content: messageContent,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
