import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/metrics');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Key sales and inventory metrics will be displayed here.</p>
      
      {/* Navigation Links */}
      <div className="dashboard-links">
        <Link to="/manage-products" className="dashboard-link">Manage Products</Link>
        <Link to="/track-sales" className="dashboard-link">Track Sales</Link>
      </div>

      {/* Metrics Section */}
      <div className="metrics">
        <h2>Key Metrics</h2>
        <ul>
          <li>Total Products: {metrics.total_products}</li>
          <li>Total Sales: {metrics.total_sales}</li>
          <li>Total Stock Level: {metrics.total_stock_level}</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
