import React from "react";
import ReactDOM from "react-dom/client";  // Import createRoot from react-dom/client
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter
import App from "./App";  // Main App component
import Store from './Store/Store';
import { Provider } from "react-redux";

// Create root element using React 18's createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application with AuthProvider and BrowserRouter wrapped
root.render(
  <BrowserRouter>

<Provider store={Store}>
    <App />
  </Provider>
    
  </BrowserRouter>
);
