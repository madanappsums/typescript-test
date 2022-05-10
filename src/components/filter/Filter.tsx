import { Button, Checkbox, Grid, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import React from 'react'
import {ReactComponent as ManuIc  } from '../../assets/icons/menu-right.svg'

const Filter = ({handleMessage,handleSaveFilter}:any) => {
  const [checked, setChecked] = React.useState([0]);
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  

  return (
    <div className='filter'>
      <div className="d-flex justify-content-between align-items-center">
        <h1><ManuIc/> Audience</h1>
        <span className='contact_count'>100 Contacts</span>
      </div>
      <div className="tags">
        <h2>Include Tags : </h2>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem
                key={value}

                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                  <ListItemText id={labelId} primary={`Greetings`} />
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    // icon={CheckCircleIcon}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
      <div className="tags">
        <h2>Exclude Tags : </h2>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem
                key={value}

                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                  <ListItemText id={labelId} primary={`Greetings`} />
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    // icon={CheckCircleIcon}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
      <div className="msg_box">
        <h2>Message Sent: </h2>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField placeholder='Min' type="number" onChange={handleMessage} name="minMessagesSent" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField placeholder='Max' type="number" onChange={handleMessage} name="maxMessagesSent" variant="outlined" />
          </Grid>

        </Grid>
      </div>
      <div className="msg_box">
        <h2>Message Received: </h2>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField placeholder='Min' type="number" onChange={handleMessage} name="minMessagesRecv" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField placeholder='Max' type="number" onChange={handleMessage} name="maxMessagesRecv" variant="outlined" />
          </Grid>
        </Grid>
      </div>
      <Button className='filter-btn' variant="contained" onClick={handleSaveFilter}>Save Filters</Button>
    </div>
  )
}

export default Filter