// Customer.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerForm from './CustomerForm';

describe('CustomerForm Component', () => {
  // Mock the calculateTotalPrice function for testing purposes
  const mockCalculateTotalPrice = jest.fn(() => 100);

  test('renders customer form with required fields', () => {
    render(<CustomerForm calculateTotalPrice={mockCalculateTotalPrice} />);
    
    // Check if all the required input fields are rendered
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Street Address')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('State')).toBeInTheDocument();
    expect(screen.getByLabelText('Zip')).toBeInTheDocument();
    expect(screen.getByLabelText('Card Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiration Date')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV')).toBeInTheDocument();
    
    // Check if the 'Grand Total' text and calculated price are rendered
    expect(screen.getByText('Grand Total:')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  test('submit button triggers the onClick event', () => {
    render(<CustomerForm calculateTotalPrice={mockCalculateTotalPrice} />);
    
    const submitButton = screen.getByText('Submit Order');
    submitButton.click();

    // Check if the alert message is shown after clicking the submit button
    expect(window.alert).toHaveBeenCalledWith('Thank you for your purchase!');
  });
});
