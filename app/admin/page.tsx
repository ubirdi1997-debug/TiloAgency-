'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple authentication (in production, use proper auth)
  // TODO: Replace with secure server-side authentication (e.g., NextAuth.js)
  // WARNING: This is a DEMO implementation only - password is visible in client code
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      fetchMessages();
    } else {
      alert('Invalid password');
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessages(messages.filter(m => m.id !== id));
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: true }),
      });

      if (response.ok) {
        setMessages(messages.map(m => 
          m.id === id ? { ...m, read: true } : m
        ));
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-blue-50 via-white to-cyan-50 flex items-center justify-center px-4">
        <div className="glass rounded-xl p-8 max-w-md w-full shadow-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sky-blue-500 focus:ring-2 focus:ring-sky-blue-200 transition outline-none"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-blue-600 text-white px-6 py-3 rounded-lg hover:bg-sky-blue-700 transition shadow-lg font-semibold"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sky-blue-600 hover:text-sky-blue-700 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-blue-50 via-white to-cyan-50">
      <nav className="glass shadow-lg mb-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-sky-blue-600">Admin Panel</h1>
            <div className="flex gap-4">
              <Link href="/" className="text-gray-600 hover:text-sky-blue-600 transition">
                ← Back to Site
              </Link>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-red-600 hover:text-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Messages ({messages.length})
              </h2>
              
              {loading ? (
                <p className="text-gray-600">Loading...</p>
              ) : messages.length === 0 ? (
                <p className="text-gray-600">No messages yet</p>
              ) : (
                <div className="space-y-2">
                  {messages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (!msg.read) markAsRead(msg.id);
                      }}
                      className={`w-full text-left p-4 rounded-lg transition ${
                        selectedMessage?.id === msg.id
                          ? 'bg-sky-blue-100 border-2 border-sky-blue-500'
                          : msg.read
                          ? 'bg-white hover:bg-gray-50'
                          : 'bg-sky-blue-50 hover:bg-sky-blue-100 font-semibold'
                      }`}
                    >
                      <p className="font-semibold text-gray-900 truncate">
                        {msg.name}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {msg.subject}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message Details */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="glass rounded-xl p-8 shadow-lg">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedMessage.subject}
                    </h2>
                    <p className="text-gray-600">
                      From: {selectedMessage.name} ({selectedMessage.email})
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="text-red-600 hover:text-red-700 transition font-semibold"
                  >
                    Delete
                  </button>
                </div>

                <div className="border-t pt-6">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3">Reply</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Reply to: {selectedMessage.email}
                    </p>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                      className="inline-block bg-sky-blue-600 text-white px-6 py-2 rounded-lg hover:bg-sky-blue-700 transition"
                    >
                      Open Email Client
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass rounded-xl p-12 shadow-lg text-center">
                <p className="text-gray-600 text-lg">
                  Select a message to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
