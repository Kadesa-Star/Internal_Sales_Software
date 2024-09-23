import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import ProductList from './components/ProductList';
import SalesTracking from './components/SalesTracking';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Internal Sales Software</h1>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/manage-products" element={<ProductManagement />} />
          <Route path="/track-sales" element={<SalesTracking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
