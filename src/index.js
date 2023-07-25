import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyles from './GlobalStyles';
import { Provider } from 'react-redux';
import AuthProvider from './context/Auth/authContext';
import { CartProvider } from './context/CartContext/CartContext';
import UserContext from './context/UserContext/UserContext';
import axios from 'axios'; // Don't forget to import axios
import { Cookies } from 'react-cookie'; // Import Cookies correctly
import store from './store/store';

// New custom hook
function useUser() {
  const [user, setUser] = React.useState(null);
  const cookies = new Cookies(); // Instantiate Cookies

  React.useEffect(() => {
    const loadUserInfo = async () => {
      const user = cookies.get('userCookie');

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/users/profile`,
          {
            headers: {
              // Authorization: `Bearer ${localStorage.getItem('token')}`,
              Authorization: `Bearer ${cookies.get('auth')}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error(`Failed to fetch user data: ${error}`);
      }
    };

    loadUserInfo();
  }, []);

  return { user, setUser };
}

const root = document.getElementById('root');

function Main() {
  const { user, setUser, token } = useUser();

  return (
    <AuthProvider>
      <UserContext.Provider value={{ user, setUser, token }}>
        <CartProvider>
          <Provider store={store}>
            <GlobalStyles />
            <App />
          </Provider>
        </CartProvider>
      </UserContext.Provider>
    </AuthProvider>
  );
}

ReactDOM.render(<Main />, root);
