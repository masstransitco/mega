'use client';

import React, { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { sendMessageToClaude } from '@/store/chatSlice';
import { selectMessages } from '@/store/chatSlice';
import { Message } from '@/types/booking';
import { X } from 'lucide-react';

export default function ChatWidget() {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: inputText,
      timestamp: new Date(),
      reactions: [],
      attachments: []
    };

    dispatch(sendMessageToClaude({ userMessage }));
    setInputText('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-card border border-border rounded shadow-lg flex flex-col">
          {/* Header */}
          <div className="p-2 bg-accent text-white flex justify-between items-center">
            <span>Chat with Claude</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className="text-sm">
                <strong>{msg.role}:</strong> {msg.content}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-border flex gap-2">
            <input
              className="flex-1 p-2 border border-border rounded"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Type your message..."
            />
            <button
              className="bg-primary text-white px-3 py-2 rounded"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-primary text-white p-3 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          Chat
        </button>
      )}
    </div>
  );
}
