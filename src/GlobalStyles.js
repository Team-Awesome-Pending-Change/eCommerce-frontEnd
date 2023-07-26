//! src/styles/GlobalStyles.js
// import { createGlobalStyle } from 'styled-components';
import { GlobalStyles } from '@mui/material';

<GlobalStyles
  styles={{
    html: {
      height: '100vh',
    },
    '*::-webkit-scrollbar': {
      width: '8px',
    },
    '*::-webkit-scrollbar-track': {
      backgroundColor: 'gray.200',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'gray.500',
      borderRadius: '20px',
    },
  }}
/>;

export default GlobalStyles;
