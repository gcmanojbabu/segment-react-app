import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Link, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import axios from 'axios';

export default function HomeScreen() {
  const [openPopup, setOpenPopup] = useState(false);
  const [segmentName, setSegmentName] = useState('')
  const [segmentValue, setSegmentValue] = useState('')
  const [segmentValueError, setSegmentValueError] = useState(false)
  const [schemaList, setSchemaList] = useState([])
  const initialSchemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ]
  const [schemaOptionsFlag, setSchemaOptionsFlag] = useState({
    first_name: false,
    last_name: false,
    gender: false,
    age: false,
    account_name: false,
    city: false,
    state: false,
  })

  useEffect(() => {
    setOpenPopup(true)
  }, []);

  const handleClose = () => {
    setOpenPopup(false);
  };

  const onSaveSegmentClick = () => {
    setOpenPopup(true);
  }

  const onSegmentNameChange = (e) => {
    setSegmentName(e.target.value)
  }

  const onSegmentSchemaChange = (event, value) => {
    setSegmentValue(value)
  }

  const onSegmentSchemaStateChange = (event, value, index) => {
    let schemaListNewTemp = JSON.parse(JSON.stringify(schemaList))
    schemaListNewTemp[index] = value
    setSchemaList(schemaListNewTemp)
  }

  const addNewSchema = () => {
    // validation
    setSegmentValueError(false)
    if (segmentValue === '') {
      setSegmentValueError(true)
      return true
    }

    let schemaListTemp = schemaList
    schemaListTemp.push(segmentValue)
    setSchemaList(schemaListTemp)
    let schemaOptionsFlagTemp = JSON.parse(JSON.stringify(schemaOptionsFlag))
    schemaOptionsFlagTemp[segmentValue.value] = true
    setSchemaOptionsFlag(schemaOptionsFlagTemp)
    setSegmentValue('')
  }

  const onSaveSegment = async () => {
    let newSchemaList = []
    for (const element of schemaList) {
      let valueToSchemaList = {}
      valueToSchemaList[element.value] = element.label
      newSchemaList.push(valueToSchemaList)
    }
    let request = {
      segment_name: segmentName,
      schema: newSchemaList
    }
    console.log('request', request)

    const saveSegmentResponse = await axios.post('https://webhook.site/b8f7cf84-87c4-4639-a2d7-1b16300f6c57', request)
    console.log('saveSegmentResponse', saveSegmentResponse)

  }

  return (
    <>
      <Grid>
        <h1>
          View Audience
        </h1>
        <div>
          <Button variant="contained" onClick={onSaveSegmentClick}>Save segment</Button>

          <Dialog
            open={openPopup}
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
                  <Autocomplete
                    spacing={2}
                    disablePortal
                    id="combo-box"
                    options={initialSchemaOptions}
                    filterOptions={(options, params) => {
                      let filtered = options.filter(record => !schemaOptionsFlag[record.value])
                      return filtered;
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(event, value) => onSegmentSchemaStateChange(event, value, index)}
                    value={element}
                    style={{
                      marginTop: '30px',
                      marginBottom: '30px'
                    }}
                  />
                </React.Fragment>
              ))}
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box"
                  options={initialSchemaOptions}
                  filterOptions={(options, params) => {
                    let filtered = options.filter(record => !schemaOptionsFlag[record.value])
                    return filtered;
                  }}
                  renderInput={(params) => <TextField {...params} label="Add schema to segment"
                    error={segmentValueError}
                    id="standard-error-helper-text"
                    helperText={segmentValueError && "Please select value"}
                  />}
                  onChange={(event, value) => onSegmentSchemaChange(event, value)}
                  value={segmentValue}
                  style={{
                    marginTop: '30px',
                    marginBottom: '30px'
                  }}
                />
              </Grid>
              <Link onClick={addNewSchema}>+ Add new schema</Link>
            </DialogContent>

            <DialogActions>
              <Button variant="contained" onClick={onSaveSegment}>Save the Segment</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    </>
  )
}
