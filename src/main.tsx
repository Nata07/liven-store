import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './App'

import {Router} from './routes';
import { BrowserRouter as Routes } from "react-router-dom";

import './styles/global.css';

ReactDOM.render(
  <React.StrictMode>
    <Routes>
      <Router />
    </Routes>
  </React.StrictMode>,
  document.getElementById('root')
)
