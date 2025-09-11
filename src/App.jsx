import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData)); // You can dispatch userData directly, no need to wrap in object
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
