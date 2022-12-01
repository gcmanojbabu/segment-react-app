import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, Link, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import { Stack, width } from '@mui/system';

export default function HomeScreen() {
  const [openPopup, setOpenPopup] = useState(false);
  const [segmentName, setSegmentName] = useState('')
  const [segmentValue, setSegmentValue] = useState('')
  const [schemaList, setSchemaList] = useState([])

  const schemaOptions = [
    { label: 'First Name', value: 'first_name', isSelected: false },
    { label: 'Last Name', value: 'last_name', isSelected: false },
    { label: 'Gender', value: 'gender', isSelected: false },
    { label: 'Age', value: 'age', isSelected: false },
    { label: 'Account Name', value: 'account_name', isSelected: false },
    { label: 'City', value: 'city', isSelected: false },
    { label: 'State', value: 'state', isSelected: true },
  ]

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

  const addNewSchema = () => {
    let schemaListTemp = schemaList
    schemaListTemp.push(segmentValue)
    setSchemaList(schemaListTemp)
    setSegmentValue('')

    // let schemaOptionsUnselectedTemp = schemaOptionsUnselected

    // for (let index = 0; index < schemaOptionsUnselectedTemp.length; index++) {
    //   if (schemaOptionsUnselectedTemp[index] === segmentValue) {
    //     schemaOptionsUnselectedTemp.splice(index, 1);
    //   }
    // }
    // setSchemaOptionsUnselected(schemaOptionsUnselectedTemp)
  }

  const onSaveSegment = () => {
    let newSchemaList = []
    for (const element of schemaList) {
      let valueToSchemaList = {}
      valueToSchemaList[element.value] = element.label
      newSchemaList.push(valueToSchemaList)
    }
    let dataToTransfer = {
      segment_name: segmentName,
      schema: newSchemaList
    }
    console.log('dataToTransfer', dataToTransfer)
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
                    options={schemaOptions}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(event, value) => onSegmentSchemaChange(event, value)}
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
                  options={schemaOptions}
                  renderInput={(params) => <TextField {...params} label="Add schema to segment" />}
                  onChange={(event, value) => onSegmentSchemaChange(event, value)}
                  value={segmentValue}
                  style={{
                    marginTop: '30px',
                    marginBottom: '30px'
                  }}
                />
              </Grid>
              <Link onClick={addNewSchema}>+Add new schema</Link>
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
