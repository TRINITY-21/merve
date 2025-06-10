import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { IChatMessage } from '../types/productDetailsTypes';
import { initialChatMessages } from '../utils/productDetailsDummyData';

export const useChatLogic = () => {
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    setChatMessages(initialChatMessages);
  }, []);

  const sendMessage = useCallback(() => {
    if (chatMessage.trim() === '') return;

    const newMessage: IChatMessage = {
      id: `m${Date.now()}`,
      text: chatMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage('');
    Keyboard.dismiss();

    // Simulate message delivery
    setTimeout(() => {
      setChatMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);

    // Simulate seller response
    setTimeout(() => {
      setIsTyping(true);
    }, 2000);

    setTimeout(() => {
      setIsTyping(false);
      const sellerResponse: IChatMessage = {
        id: `m${Date.now() + 1}`,
        text: "Thanks for your message! I'll get back to you shortly.",
        sender: 'seller',
        timestamp: new Date(),
        status: 'delivered'
      };
      setChatMessages(prev => [...prev, sellerResponse]);
    }, 4000);
  }, [chatMessage]);

  return {
    chatMessage,
    setChatMessage,
    chatMessages,
    isTyping,
    sendMessage,
  };
};