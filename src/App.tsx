import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/style/theme';
import Login from './Login/Login';
import Home from './Home/Home';

import './App.scss'
import Collection from './Collection/Collection';
import Register from './Register/Register';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/collection" element={<Collection/>} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;