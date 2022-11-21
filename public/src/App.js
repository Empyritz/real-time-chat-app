import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CheckLogged from './components/CheckLogged';
import Chat from './pages/Chat';
import Loging from './pages/Login';
import Register from './pages/Register';
import SetAvatar from './pages/SetAvatar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CheckLogged><Chat /></CheckLogged>} />
        <Route path='/login' element={<CheckLogged><Loging /></CheckLogged>} />
        <Route path='/register' element={<CheckLogged><Register /></CheckLogged>} />
        <Route path='/setAvatar' element={<CheckLogged><SetAvatar /></CheckLogged>} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
