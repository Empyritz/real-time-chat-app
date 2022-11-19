import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat';
import Loging from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/login' element={<Loging />} />
        <Route path='/register' element={<Register />} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
