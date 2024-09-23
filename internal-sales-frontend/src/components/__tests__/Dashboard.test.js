// src/components/__tests__/Dashboard.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import '@testing-library/jest-dom/extend-expect';

describe('Dashboard Component', () => {
  test('renders Dashboard header', () => {
    render(<Dashboard />);
    const headerElement = screen.getByText(/Dashboard/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders Dashboard description', () => {
    render(<Dashboard />);
    const descriptionElement = screen.getByText(/Key sales and inventory metrics will be displayed here./i);
    expect(descriptionElement).toBeInTheDocument();
  });
});
