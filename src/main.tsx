import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './App'

import {Router} from './routes';
import { BrowserRouter as Routes } from "react-router-dom";
import { CartProvider } from './hook/useCart';

import './styles/global.css';
import { Header } from './components/Header';

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
    <Routes>
      <Header />
      <Router />
    </Routes>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
