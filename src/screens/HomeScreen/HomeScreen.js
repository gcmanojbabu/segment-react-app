import { AppBar, Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Link, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import axios from 'axios';
import { Box, Container } from '@mui/system';

export default function HomeScreen() {
  const [openPopup, setOpenPopup] = useState(false);
  const [segmentName, setSegmentName] = useState('')
  const [segmentValue, setSegmentValue] = useState('')
  const [segmentNameError, setSegmentNameError] = useState(false)
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
    // validation
    setSegmentValueError(false)
    if (schemaList.length === 0 || segmentName === '') {
      setSegmentValueError(true)
      setSegmentNameError(true)
      return false
    }




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
      <Box>
        <AppBar position="static" style={{
          backgroundColor: '#2596be',
          boxShadow: 'none',
          padding: '15px'
        }}>
          <Typography variant="h4">
            View Audience
          </Typography>
        </AppBar>

        <div>
          <br />
          <Button variant="contained" onClick={onSaveSegmentClick}>Save segment</Button>

          <Dialog
            open={openPopup}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              // style={{
              //   marginTop: '30px',
              // }}
              >
                <Grid item xs={12}>
                  <Typography variant="h5" style={{
                    color: 'white',
                    backgroundColor: '#2596be',
                    boxShadow: 'none',
                    padding: '20px'
                  }}>
                    Saving segment
                  </Typography>
                </Grid>

                <DialogContent>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Enter the Name of the Segment
                    </Typography>
                    <TextField autoComplete='off' id="outlined-basic" label="Name of the Segment" fullWidth variant="outlined" onChange={onSegmentNameChange}
                      error={segmentNameError}
                      helperText={segmentNameError && "Please enter segment name"} />
                    <Typography variant="subtitle1" gutterBottom sx={{ my: 2 }}>
                      To save your segment, you need to add the schemas to build the query
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <CircleIcon color="success" sx={{ height: '15px', width: '15px' }} />
                      - User Traits
                      <CircleIcon sx={{ color: '#AD027E', height: '15px', width: '15px', ml: 2 }} />
                      - Group Traits

                    </Grid>
                  </Grid>
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
                    {/* <CircleIcon color="success" sx={{ height: '15px', width: '15px' }} /> */}
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
              </Grid>
            </Box>
          </Dialog>
        </div>
      </Box>
    </>
  )
}
