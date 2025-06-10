import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Login from './Login';

// Mock the AuthContext
const mockLogin = jest.fn();
const mockLoginWithGoogle = jest.fn();
const mockSetupRecaptcha = jest.fn();

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={{ 
        login: mockLogin, 
        loginWithGoogle: mockLoginWithGoogle, 
        setupRecaptcha: mockSetupRecaptcha 
      }}>
        {ui}
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form correctly', () => {
    renderWithRouter(<Login />);
    
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('handles email login submission', async () => {
    renderWithRouter(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  test('handles Google login', async () => {
    renderWithRouter(<Login />);
    
    fireEvent.click(screen.getByRole('button', { name: /Continue with Google/i }));
    
    await waitFor(() => {
      expect(mockLoginWithGoogle).toHaveBeenCalled();
    });
  });
});