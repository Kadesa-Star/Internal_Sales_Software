import React from 'react';
import './App.css';


// src/App.js
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import SalesTracking from './components/SalesTracking';

function App() {
  return (
    <div className="App">
      <h1>Internal Sales Software</h1>
      <Dashboard />
      <ProductManagement />
      <SalesTracking />
    </div>
  );
}

export default App;
