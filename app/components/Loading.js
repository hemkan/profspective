import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#13131E',
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loading;
