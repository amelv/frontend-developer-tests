import React from 'react';
import { render, fireEvent, waitForElement, screen } from '@testing-library/react';
import App from './App';

test('renders header, gender filter menu, list of countries', () => {
  render(<App />);
  const linkElement = screen.getByText(/Countries/i);
  expect(linkElement).toBeInTheDocument();
});
