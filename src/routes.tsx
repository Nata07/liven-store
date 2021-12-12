import React from 'react'

import { Routes, Route } from 'react-router-dom';
import { App } from './App';

import {Cart} from './pages/Cart';

export function Router() {
  return (  
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/cart" element={
        <Cart />
      } />
    </Routes>
  );
};