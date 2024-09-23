// src/components/__tests__/SalesTracking.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SalesTracking from '../SalesTracking';
import '@testing-library/jest-dom/extend-expect';

describe('SalesTracking Component', () => {
  test('renders Sales Tracking form', () => {
    render(<SalesTracking />);
    const headerElement = screen.getByText(/Track Sales/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('submits form with correct data', () => {
    render(<SalesTracking />);
    fireEvent.change(screen.getByLabelText(/Product Name/i), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByLabelText(/Sale Date/i), { target: { value: '2024-09-01' } });
    fireEvent.change(screen.getByLabelText(/Quantity Sold/i), { target: { value: '5' } });

    fireEvent.click(screen.getByText(/Record Sale/i));

    // Assuming you have a function to handle form submission
    // and you can mock it or test for its effect
  });
});
