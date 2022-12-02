import React, { useState } from 'react';

import axios from 'axios';
import { Box } from '@mui/system';
import CircleIcon from '@mui/icons-material/Circle';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { SchemaOptionsFlagInterface } from '../../models/ISchemaComponent';

export const SchemaComponent = ({ handleClose }) => {
  // state
  const [segmentName, setSegmentName] = useState('');
  const [segmentValue, setSegmentValue] = useState<{
    label: string;
    value: string;
  }>({
    label: '',
    value: '',
  });
  const [segmentNameError, setSegmentNameError] = useState(false);
  const [segmentValueError, setSegmentValueError] = useState(false);
  const [schemaList, setSchemaList] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const initialSchemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];
  const [schemaOptionsFlag, setSchemaOptionsFlag] =
    useState<SchemaOptionsFlagInterface>({
      first_name: false,
      last_name: false,
      gender: false,
      age: false,
      account_name: false,
      city: false,
      state: false,
    });

  const onSegmentNameChange = (e) => {
    setSegmentName(e.target.value);
  };

  const onSegmentSchemaChange = (event, value) => {
    setSegmentValue(value);
  };

  const onSegmentSchemaStateChange = (event, value, index) => {
    let schemaListNewTemp = JSON.parse(JSON.stringify(schemaList));
    let schemaOptionsFlagTemp = JSON.parse(JSON.stringify(schemaOptionsFlag));
    schemaOptionsFlagTemp[schemaListNewTemp[index].value] = false;
    schemaOptionsFlagTemp[value.value] = true;

    schemaListNewTemp[index] = value;
    setSchemaList(schemaListNewTemp);
    setSchemaOptionsFlag(schemaOptionsFlagTemp);
    setSegmentValue({
      label: '',
      value: '',
    });
  };

  const addNewSchema = () => {
    // validation
    setSegmentValueError(false);
    if (segmentValue.value === '') {
      setSegmentValueError(true);
      return true;
    }

    let schemaListTemp = schemaList;
    schemaListTemp.push(segmentValue);
    setSchemaList(schemaListTemp);
    let schemaOptionsFlagTemp = JSON.parse(JSON.stringify(schemaOptionsFlag));
    schemaOptionsFlagTemp[segmentValue.value] = true;
    setSchemaOptionsFlag(schemaOptionsFlagTemp);
    setSegmentValue({
      label: '',
      value: '',
    });
  };

  const removeSchema = (index) => {
    const schemaListTemp = JSON.parse(JSON.stringify(schemaList));
    const schemaOptionsFlagTemp = JSON.parse(JSON.stringify(schemaOptionsFlag));
    schemaOptionsFlagTemp[schemaListTemp[index].value] = false;
    setSchemaOptionsFlag(schemaOptionsFlagTemp);
    schemaListTemp.splice(index, 1);
    setSchemaList(schemaListTemp);
  };

  const onSaveSegment = async () => {
    // validation
    let isValid = true;
    setSegmentValueError(false);
    setSegmentNameError(false);
    if (schemaList.length === 0) {
      isValid = false;
      setSegmentValueError(true);
    }
    if (segmentName === '') {
      isValid = false;
      setSegmentNameError(true);
    }
    if (isValid === false) {
      return false;
    }

    let newSchemaList: any = [];
    for (const element of schemaList) {
      let valueToSchemaList = {};
      valueToSchemaList[element.value] = element.label;
      newSchemaList.push(valueToSchemaList);
    }
    let request: {
      segment_name: string;
      schema: { label: string; value: string };
    } = {
      segment_name: segmentName,
      schema: newSchemaList,
    };
    console.log('request', request);
    try {
      await axios.post(
        'https://webhook.site/b8f7cf84-87c4-4639-a2d7-1b16300f6c57',
        request
      );
      handleClose('SUCCESS');
    } catch (error) {
      handleClose('ERROR');
    }
  };

  return (
    <Box>
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='flex-start'
      >
        <Grid item xs={12}>
          <Typography
            variant='h5'
            style={{
              color: 'white',
              backgroundColor: '#39AEBC',
              boxShadow: 'none',
              padding: '20px',
            }}
          >
            Saving segment
          </Typography>
        </Grid>

        <DialogContent>
          <Grid item xs={12}>
            <Typography variant='subtitle1' gutterBottom>
              Enter the Name of the Segment
            </Typography>
            <TextField
              autoComplete='off'
              id='outlined-basic'
              label='Name of the Segment'
              fullWidth
              variant='outlined'
              onChange={onSegmentNameChange}
              error={segmentNameError}
              helperText={segmentNameError && 'Please enter segment name'}
            />
            <Typography variant='subtitle1' gutterBottom sx={{ my: 2 }}>
              To save your segment, you need to add the schemas to build the
              query
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              direction='row'
              justifyContent='flex-end'
              alignItems='center'
              sx={{ my: 2 }}
            >
              <CircleIcon
                color='success'
                sx={{ height: '15px', width: '15px' }}
              />
              - User Traits
              <CircleIcon
                sx={{ color: '#AD027E', height: '15px', width: '15px', ml: 2 }}
              />
              - Group Traits
            </Grid>
          </Grid>

          {schemaList?.map((element, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <Grid
                  container
                  direction='row'
                  justifyContent='felx-start'
                  alignItems='center'
                >
                  <Grid item xs={1}>
                    <CircleIcon
                      color='success'
                      sx={{ height: '15px', width: '15px' }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Autocomplete
                      sx={{ my: 2 }}
                      disablePortal
                      id='combo-box'
                      options={initialSchemaOptions}
                      filterOptions={(options, params) => {
                        let filtered = options.filter(
                          (record) => !schemaOptionsFlag[record.value]
                        );
                        return filtered;
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(event, value) =>
                        onSegmentSchemaStateChange(event, value, index)
                      }
                      value={element}
                      disableClearable={true}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <RemoveRoundedIcon
                      onClick={() => {
                        removeSchema(index);
                      }}
                      sx={{ height: '35px', width: '35px', ml: 3 }}
                      style={{
                        backgroundColor: '#ECEFF4',
                        borderRadius: '7px',
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}

          <Grid item xs={12}>
            <Grid
              container
              direction='row'
              justifyContent='felx-start'
              alignItems='center'
            >
              <Grid item xs={1}>
                <CircleIcon
                  color='success'
                  sx={{ height: '15px', width: '15px' }}
                />
              </Grid>
              <Grid item xs={9}>
                <Autocomplete
                  sx={{ my: 2 }}
                  disablePortal
                  id='combo-box'
                  options={initialSchemaOptions}
                  filterOptions={(options, params) => {
                    let filtered = options.filter(
                      (record) => !schemaOptionsFlag[record.value]
                    );
                    return filtered;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Add schema to segment'
                      error={segmentValueError}
                      id='standard-error-helper-text'
                      helperText={segmentValueError && 'Please select value'}
                    />
                  )}
                  onChange={(event, value) =>
                    onSegmentSchemaChange(event, value)
                  }
                  value={segmentValue}
                  disableClearable={true}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Link onClick={addNewSchema}>+ Add new schema</Link>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Grid item xs={12}>
            <Button
              sx={{ m: 2 }}
              variant='contained'
              onClick={onSaveSegment}
              style={{
                backgroundColor: '#41B494',
              }}
            >
              Save the Segment
            </Button>
            <Button
              sx={{ m: 2 }}
              onClick={handleClose}
              style={{
                color: 'red',
                backgroundColor: '#ECEFF4',
              }}
            >
              Cancel
            </Button>
          </Grid>
        </DialogActions>
      </Grid>
    </Box>
  );
};
