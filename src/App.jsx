import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/landing';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import TipsAndSuggestions from './pages/TipsAndSuggestions';
import Gullak from './pages/Gullak';
import Diary from './pages/Diary';
import Test from './pages/Test';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/landing' element={<Landing/>}/>
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/tipsandsuggestions' element={<TipsAndSuggestions/>}/>
        <Route path='/gullak' element={<Gullak/>}/>
        <Route path='/diary' element={<Diary/>}/>
        <Route path='/' element={<Test/>}/>


      </Routes>
    </BrowserRouter>
  )
}
