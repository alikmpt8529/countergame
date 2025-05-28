import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // 拡張子を明示

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);