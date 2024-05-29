import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM's createRoot method
import './index.css';
import App from './App';
import { store } from './store/store'; // Import the Redux store
import { Provider } from 'react-redux'; // Import the Redux Provider component

// Create a root using ReactDOM's createRoot method
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside a React StrictMode and wrap it with the Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
