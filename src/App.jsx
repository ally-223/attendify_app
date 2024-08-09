import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from "./contexts/authContext/index";

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import StatusSet from './pages/StatusSet';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/statusset" element={<StatusSet />} />
      </Routes>
    </AuthProvider>
    
  );
}

export default App;