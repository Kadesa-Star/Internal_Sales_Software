// src/components/__tests__/ProductManagement.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductManagement from '../ProductManagement';
import '@testing-library/jest-dom/extend-expect';

describe('ProductManagement Component', () => {
  test('renders Product Management form', () => {
    render(<ProductManagement />);
    const headerElement = screen.getByText(/Manage Products/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('submits form with correct data', () => {
    render(<ProductManagement />);
    fireEvent.change(screen.getByLabelText(/Product Name/i), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '25.00' } });

    fireEvent.click(screen.getByText(/Add Product/i));

    // Assuming you have a function to handle form submission
    // and you can mock it or test for its effect
  });
});
