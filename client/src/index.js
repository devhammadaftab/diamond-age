import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);