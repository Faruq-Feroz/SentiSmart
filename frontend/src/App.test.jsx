import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Mock the router and context providers
jest.mock('./router', () => () => <div data-testid="router">Router</div>);
jest.mock('./context/AuthContext', () => ({
  AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>
}));
jest.mock('./context/BudgetContext', () => ({
  BudgetProvider: ({ children }) => <div data-testid="budget-provider">{children}</div>
}));
jest.mock('./context/NotificationContext', () => ({
  NotificationProvider: ({ children }) => <div data-testid="notification-provider">{children}</div>
}));
jest.mock('./context/SavingsContext', () => ({
  SavingsProvider: ({ children }) => <div data-testid="savings-provider">{children}</div>
}));
jest.mock('./context/SocketContext', () => ({
  SocketProvider: ({ children }) => <div data-testid="socket-provider">{children}</div>
}));
jest.mock('./context/ChamaContext', () => ({
  ChamaProvider: ({ children }) => <div data-testid="chama-provider">{children}</div>
}));
jest.mock('./context/DonationContext', () => ({
  DonationProvider: ({ children }) => <div data-testid="donation-provider">{children}</div>
}));

describe('App Component', () => {
  test('renders with all providers and router', () => {
    const { getByTestId } = render(<App />);
    
    expect(getByTestId('auth-provider')).toBeInTheDocument();
    expect(getByTestId('budget-provider')).toBeInTheDocument();
    expect(getByTestId('savings-provider')).toBeInTheDocument();
    expect(getByTestId('donation-provider')).toBeInTheDocument();
    expect(getByTestId('socket-provider')).toBeInTheDocument();
    expect(getByTestId('chama-provider')).toBeInTheDocument();
    expect(getByTestId('notification-provider')).toBeInTheDocument();
    expect(getByTestId('router')).toBeInTheDocument();
  });
});