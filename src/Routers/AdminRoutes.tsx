import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/style/theme';
import Login from '../Login/Login';
import Home from '../Home/Home';

import '../App.scss'
import Collection from '../Collection/Collection';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import AdminHome from '../Admin/AdminHome/AdminHome';
import UserSearch from '../Admin/UserSearch/UserSearch';
import CardCreate from '../Admin/CardCreate.tsx/CardCreate';
import CreateMonsterCard from '../Admin/CardCreate.tsx/CreateMonsterCard';
import CreateTrapCard from '../Admin/CardCreate.tsx/CreateTrapCard';
import CreateSpellCard from '../Admin/CardCreate.tsx/CreateSpellCard';

function AdminRoutes() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/search" element={<UserSearch />} />
          <Route path="/admin/card_create" element={<CardCreate />} />
          <Route path="/admin/card_create/monster" element={<CreateMonsterCard />} />
          <Route path="/admin/card_create/spell" element={<CreateSpellCard />} />
          <Route path="/admin/card_create/trap" element={<CreateTrapCard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collection" element={<Collection/>} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default AdminRoutes;