// Auth.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthContext } from '../../context/Auth/authContext';
import Auth from './auth';
import Login from './login';

// Mock the AuthContext
jest.mock('../../context/Auth/authContext', () => ({
  AuthContext: {
    Consumer: ({ children }) => children({ isLoggedIn: true, can: () => true }), // Mocked values for AuthContext
  },
}));

describe('Auth Component', () => {
  it('renders routes when user is logged in and has the capability', () => {
    const children = <div>Rendered Content</div>;
    const capability = 'some_capability';

    render(<Auth capability={capability}>{children}</Auth>);
    expect(screen.getByText('Rendered Content')).toBeInTheDocument();
  });

  it('does not render routes when user is not logged in', () => {
    const children = <div>Rendered Content</div>;
    const capability = 'some_capability';

    jest.spyOn(Auth.contextType, '_currentValue').mockReturnValue({ isLoggedIn: false });

    render(<Auth capability={capability}>{children}</Auth>);
    expect(screen.queryByText('Rendered Content')).toBeNull();
  });

  it('does not render routes when user does not have the required capability', () => {
    const children = <div>Rendered Content</div>;
    const capability = 'some_capability';

    jest.spyOn(Auth.contextType, '_currentValue').mockReturnValue({ isLoggedIn: true, can: () => false });

    render(<Auth capability={capability}>{children}</Auth>);
    expect(screen.queryByText('Rendered Content')).toBeNull();
  });
});

describe('Login Component', () => {
  it('submits login form', async () => {
    const loginMock = jest.fn();
    const signupMock = jest.fn();

    // Mock the AuthContext methods
    const authContext = {
      isLoggedIn: false,
      login: loginMock,
      signup: signupMock,
    };

    render(
      <AuthContext.Provider value={authContext}>
        <Login />
      </AuthContext.Provider>
    );

    userEvent.type(screen.getByPlaceholderText('Username'), 'testuser');
    userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    userEvent.type(screen.getByPlaceholderText('Password'), 'testpassword');

    // Switch to Sign Up mode
    userEvent.click(screen.getByLabelText('Sign up mode'));

    userEvent.type(screen.getByPlaceholderText('Full Name'), 'Test User');
    userEvent.type(screen.getByPlaceholderText('Role Data'), 'Test Role');

    userEvent.click(screen.getByText('Sign Up'));

    expect(signupMock).toHaveBeenCalledWith(
      'testuser',
      'testpassword',
      'test@example.com',
      { name: 'Test User' },
      { name: 'Test Role' }
    );
  });

  it('submits login form', async () => {
    const loginMock = jest.fn();
    const signupMock = jest.fn();

    // Mock the AuthContext methods
    const authContext = {
      isLoggedIn: false,
      login: loginMock,
      signup: signupMock,
    };

    render(
      <AuthContext.Provider value={authContext}>
        <Login />
      </AuthContext.Provider>
    );

    userEvent.type(screen.getByPlaceholderText('Username'), 'testuser');
    userEvent.type(screen.getByPlaceholderText('Password'), 'testpassword');

    userEvent.click(screen.getByText('Login'));

    expect(loginMock).toHaveBeenCalledWith('testuser', 'testpassword');
  });
});
