'use client';

import { useEffect, useRef, useState } from 'react';
import * as CustomerSDK from '@livechat/customer-sdk';

const LiveChat = () => {
  const [messages, setMessages] = useState<{ text: string; author: string }[]>([]);
  const [input, setInput] = useState('');
  const [chatReady, setChatReady] = useState(false);
  const customerRef = useRef<any>(null);

  useEffect(() => {
    const customer = CustomerSDK.init({
      organizationId: 'aca618ca-3926-46b0-9f18-d72a4f141b80',
      clientId: '29ce4aa6b35c6857ef35ca7f85feebd7',
      redirectUri: 'http://localhost:5173/compare_agents_chat',
    });

    customerRef.current = customer;

    customer.on('connected', async () => {
      try {
        await customer.startChat();
        setChatReady(true);
        setMessages((msgs) => [
          ...msgs,
          { text: 'Connected to LiveChat!', author: 'system' },
        ]);
      } catch (error) {
        console.error('Failed to start chat:', error);
        setMessages((msgs) => [
          ...msgs,
          { text: 'Failed to start chat. Please refresh.', author: 'system' },
        ]);
      }
    });

    customer.on('incoming_event', (event: any) => {
      console.log('Incoming event:', event);
      if (event.event.type === 'message') {
        setMessages((msgs) => [
          ...msgs,
          { text: event.event.text, author: 'agent' },
        ]);
      }
    });

    customer.on('error', (err: any) => {
      console.error('LiveChat SDK error:', err);
    });

    return () => {
      customer.disconnect?.();
    };
  }, []);

  const sendMessage = async () => {
    if (input.trim() && chatReady && customerRef.current) {
      try {
        await customerRef.current.sendEvent({
          type: 'message',
          text: input,
        });

        setMessages((msgs) => [...msgs, { text: input, author: 'you' }]);
        setInput('');
      } catch (err) {
        console.error('Failed to send message:', err);
        setMessages((msgs) => [
          ...msgs,
          { text: 'Failed to send message. Try again.', author: 'system' },
        ]);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl shadow-md border border-gray-200 bg-white flex flex-col h-[500px]">
      <div className="p-4 text-lg font-semibold border-b border-gray-200 bg-gray-50 rounded-t-2xl">
        LiveChat Support
      </div>
      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-100">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.author === 'you'
                ? 'justify-end'
                : msg.author === 'agent'
                ? 'justify-start'
                : 'justify-center'
            }`}
          >
            <div
              className={`
                ${
                  msg.author === 'you'
                    ? 'bg-blue-600 text-white'
                    : msg.author === 'agent'
                    ? 'bg-white text-gray-900 border border-gray-200'
                    : 'bg-transparent text-gray-500 italic'
                }
                rounded-lg px-4 py-2 max-w-[260px] text-sm shadow
              `}
            >
              {msg.author === 'system' ? (
                <span>
                  <b>system:</b> {msg.text}
                </span>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex p-3 bg-white border-t border-gray-200 rounded-b-2xl">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 px-3 py-2 mr-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 text-sm font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
