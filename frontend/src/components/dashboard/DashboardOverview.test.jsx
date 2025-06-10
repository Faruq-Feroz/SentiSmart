import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../context/AuthContext';
import DashboardOverview from './DashboardOverview';

// Mock the required components
jest.mock('./summary/FinancialSummary', () => () => <div data-testid="financial-summary">Financial Summary</div>);
jest.mock('./input/SalaryInput', () => () => <div data-testid="salary-input">Salary Input</div>);
jest.mock('./input/ExpenseInput', () => () => <div data-testid="expense-input">Expense Input</div>);
jest.mock('./advisor/FinancialAdvisor', () => () => <div data-testid="financial-advisor">Financial Advisor</div>);
jest.mock('./budget/SavedBudgets', () => () => <div data-testid="saved-budgets">Saved Budgets</div>);

describe('DashboardOverview Component', () => {
  test('renders welcome message with user name', () => {
    render(
      <AuthContext.Provider value={{ user: { displayName: 'John Doe' } }}>
        <DashboardOverview />
      </AuthContext.Provider>
    );
    
    expect(screen.getByText(/Welcome, John!/i)).toBeInTheDocument();
  });

  test('renders welcome message with default when no user name', () => {
    render(
      <AuthContext.Provider value={{ user: {} }}>
        <DashboardOverview />
      </AuthContext.Provider>
    );
    
    expect(screen.getByText(/Welcome, there!/i)).toBeInTheDocument();
  });

  test('renders all dashboard components', () => {
    render(
      <AuthContext.Provider value={{ user: { displayName: 'John Doe' } }}>
        <DashboardOverview />
      </AuthContext.Provider>
    );
    
    expect(screen.getByTestId('salary-input')).toBeInTheDocument();
    expect(screen.getByTestId('expense-input')).toBeInTheDocument();
    expect(screen.getByTestId('saved-budgets')).toBeInTheDocument();
    expect(screen.getByTestId('financial-advisor')).toBeInTheDocument();
  });
});