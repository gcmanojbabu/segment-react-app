import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, Link, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CircleIcon from '@mui/icons-material/Circle';

export default function HomeScreen() {
  const [open, setOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('')
  const [segmentSchema, setSegmentSchema] = useState('')
  const [schemaList, setSchemaList] = useState([])

  const schemaOptions = [
    { label: 'First Name', Value: 'first_name' },
    { label: 'Last Name', Value: 'last_name' },
    { label: 'Gender', Value: 'gender' },
    { label: 'Age', Value: 'age' },
    { label: 'Account Name', Value: 'account_name' },
    { label: 'City', Value: 'city' },
    { label: 'State', Value: 'state' },
  ]


  useEffect(() => {
    const fetchData = async () => {
      setOpen(true)
    }
    fetchData();
  }, []);


  const handleClose = () => {
    setOpen(false);
  };

  const onSaveSegmentClick = () => {
    console.log('inside onSaveSegmentClick')
    setOpen(true);
  }

  const onSegmentNameChange = (e) => {
    console.log('inside onSegmentNameChange')
    setSegmentName(e.target.value)
  }

  const onSegmentSchemaChange = (event, value) => {
    console.log('inside onSegmentSchemaChange')
    setSegmentSchema(value)
  }

  const addNewSchema = () => {
    console.log('inside addNewSchema')
    let schemaListTemp = schemaList
    schemaListTemp.push(segmentSchema)
    setSchemaList(schemaListTemp)
    console.log('schemaListTemp', schemaListTemp)
  }



  return (
    <>
      <h1>
        View Audience
      </h1>
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
            <TextField id="outlined-basic" label="Name of the Segment" fullWidth variant="outlined" onChange={onSegmentNameChange} />
            <p>To save your segment, you need to add the schemas to build the query</p>
            <CircleIcon color="success" /> - User Traits
            <CircleIcon sx={{ color: 'red' }} /> - Group Traits

            {schemaList?.map((element, index) => (
              <React.Fragment key={index}>
                <h2>input - {element.label}</h2>
              </React.Fragment>
            ))}

            <Autocomplete
              disablePortal
              id="combo-box"
              options={schemaOptions}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Add schema to segment" />}
              onChange={(event, value) => onSegmentSchemaChange(event, value)}
              value={segmentSchema}
            />
            <Link onClick={addNewSchema}>+Add new schema</Link>


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
