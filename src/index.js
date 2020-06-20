import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AuthNavigation from './component/Navigation/AuthNavigation';

ReactDOM.render(
  <BrowserRouter>
    <AuthNavigation />
  </BrowserRouter>,
  document.getElementById('root')
);
