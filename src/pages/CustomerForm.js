// CustomerForm.jsx

import React from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function CustomTextField({ id = 'outlined', label, type }) {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      fullWidth
      sx={{
        marginBottom: '0.8rem',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.5)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
          },
        },
      }}
    />
  );
}

const CustomerForm = ({ calculateTotalPrice }) => (
  <Container maxWidth={false}>
    <Box sx={{ width: '100%', padding: '2rem' }}>
      <Typography
        variant="h5"
        sx={{ marginBottom: '1.5rem', fontWeight: 'bold' }}
      >
        Customer Info
      </Typography>
      <form>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: '1rem',
            }}
          >
            <Box>
              <CustomTextField label="First Name" />
              <CustomTextField label="Last Name" />
            </Box>
            <CustomTextField label="Street Address" />
            <CustomTextField label="City" />
            <CustomTextField label="State" />
            <CustomTextField type="number" label="Zip" />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CustomTextField type="number" label="Card Number" />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ margin: '0.8rem 0' }}
                  label="Expiration Date"
                />
              </LocalizationProvider>
              <CustomTextField type="number" label="CVV" />
            </Box>
            <Box sx={{ alignSelf: 'center' }}>
              <Box sx={{ marginTop: '2rem' }}>
                <Typography variant="h6">Grand Total:</Typography>
                <Typography variant="h6">${calculateTotalPrice()}</Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  marginTop: '1rem',
                  backgroundColor: '#1976d2',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                }}
                onClick={(event) => {
                  event.preventDefault();
                  alert('Thank you for your purchase!');
                }}
              >
                Submit Order
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  </Container>
);

export default CustomerForm;
