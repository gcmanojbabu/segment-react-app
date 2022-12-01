import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, Link, TextField } from '@mui/material'
import React, { useState } from 'react'
import CircleIcon from '@mui/icons-material/Circle';

export default function HomeScreen() {
  const [open, setOpen] = useState(true);

  const schemaOptions = [
    { label: 'First Name', Value: 'first_name' },
    { label: 'Last Name', Value: 'last_name' },
    { label: 'Gender', Value: 'gender' },
    { label: 'Age', Value: 'age' },
    { label: 'Account Name', Value: 'account_name' },
    { label: 'City', Value: 'city' },
    { label: 'State', Value: 'state' },
  ]


  const handleClose = () => {
    setOpen(false);
  };

  const onSaveSegmentClick = () => {
    console.log('inside onSaveSegmentClick')
    setOpen(true);
  }

  return (
    <>
      <h1>
        View Audience
      </h1>
      <Icon baseClassName="fas" className="fa-plus-circle" />
      <div>
        <Button variant="contained" onClick={onSaveSegmentClick}>Save segment</Button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Saving segment"}
          </DialogTitle>
          <DialogContent>

            <p>Enter the Name of the Segment</p>
            <TextField id="outlined-basic" label="Name of the Segment" variant="outlined" />
            <p>To save your segment, you need to add the schemas to build the query</p>
            <CircleIcon color="success" /> - User Traits
            <CircleIcon sx={{ color: 'red' }} /> - Group Traits

            <Autocomplete
              disablePortal
              id="combo-box"
              options={schemaOptions}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Add schema to segment" />}
            />
            <Link href="#">+Add new schema</Link>


          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>Save the Segment</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
