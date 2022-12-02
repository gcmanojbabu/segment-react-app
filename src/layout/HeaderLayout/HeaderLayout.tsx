import React from 'react';

import './HeaderLayout.css';

import { AppBar, Typography } from '@mui/material';

export const HeaderLayout = () => {
  return (
    <AppBar id='appBar' position='static'>
      <Typography variant='h4'>View Audience</Typography>
    </AppBar>
  );
};
