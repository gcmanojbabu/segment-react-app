import React, { useState } from 'react'

import './HomeScreen.css'
import { SchemaComponent } from '../../components/SchemaComponent/SchemaComponent';

import { Alert, Box, Button, Dialog, Snackbar } from '@mui/material'
import { HeaderLayout } from '../../layout/HeaderLayout/HeaderLayout';

export const HomeScreen = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleClose = (modalState) => {
    if (modalState === 'SUCCESS') {
      setOpenPopup(false);
      handleSnackbarClick()
    } else if (modalState === 'ERROR') {
      setOpenPopup(false);
    }
  };

  const onSaveSegmentClick = () => {
    setOpenPopup(true);
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  };

  const handleSnackbarClick = () => {
    setSnackbarOpen(true)
  };

  return (
    <div className='home'>
      <Box>
        <HeaderLayout />

        <div className='saveButtonContainer'>
          <Button className={"saveButton"} variant="contained" onClick={onSaveSegmentClick}>Save segment</Button>
        </div>

        <Dialog
          open={openPopup}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <SchemaComponent handleClose={handleClose} />
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          key={Math.random()}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            Segment saved successfully!
          </Alert>
        </Snackbar>
      </Box >
    </div>
  )
}
