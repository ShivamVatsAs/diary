import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import our base styles
import App from './App';

// This is the standard entry point for a React application.
// It finds the 'root' div in our public/index.html file and renders our main App component inside it.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)