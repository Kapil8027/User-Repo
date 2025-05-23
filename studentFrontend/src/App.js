import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import Assignments from './component/Assignments';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Listen to token changes
  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', checkLogin);
    checkLogin();
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/assignments"
          element={isLoggedIn ? <Assignments /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
