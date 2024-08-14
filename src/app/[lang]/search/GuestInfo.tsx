import React, { useState } from 'react';
import { Button, Menu, MenuItem, IconButton, TextField, Stack, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ChildAge from './ChildAge';
import PeopleIcon from '@mui/icons-material/People';
import useRoomStore from '../../../components/store/useRoomCriteriaStore';
import { useDictionary } from '@/components/dictionary/Dictionary';

const GuestInfo = () => {
  const { HomePage } = useDictionary();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {adult,childAges,childCount,incrementAdult,incrementChild,decrementAdult,decrementChild,removeLastChildAge}=useRoomStore();
  const [buttonText, setButtonText] = useState(`${adult} ${HomePage.adult} · ${childCount} ${HomePage.children}`);
  const [childAgesValid, setChildAgesValid] = useState(false);
  let childAge1=[];
  const handleClick = (event: { currentTarget: React.SetStateAction<null | HTMLElement>; }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdultChange = (operation: string) => {
    if(operation==='increment'){
      incrementAdult();
    }
    else{
      decrementAdult();
    }
  };

  const handleChildrenChange = (operation: string) => {
    if(operation==='increment'){
      incrementChild();
    }
    else{
      decrementChild();
      removeLastChildAge();
    }
  };
  const renderChildAges = () => {
    const childAges = [];
    for (let i = 0; i < childCount; i++) {
      childAges.push(
        <Box key={i}>
          <Stack direction="row">
            <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold', marginLeft: '15px' }}>
              {i + 1}. {HomePage.childAge}
            </p>
            <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold', marginLeft: '1px', color: 'red' }}>*</p>
          </Stack>
          <ChildAge onValidChange={handleChildAgeValid} index={i} />
        </Box>
      );
    }
    return childAges;
  };
  const handleApply = () => {
    if (childCount > 0 && !childAgesValid) {
      alert('Please enter child ages.');
      return;
    }

    setButtonText(`${adult} ${HomePage.adult} · ${childCount} ${HomePage.children}`);
    handleClose();
  };

  const handleChildAgeValid = (isValid: boolean) => {
    setChildAgesValid(isValid);
  };

  return (
    <div>
      <Button
        sx={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          border: '2px solid #516D87',
          borderRadius: '0px',
          height: '40px',
          width: '250px',
          textTransform: 'none',
          color: 'grey',
          fontSize: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '10px',
        }}
        aria-controls="room-menu"
        aria-haspopup="true"
        onClick={(event) => handleClick(event)}
      >
        <PeopleIcon sx={{ marginRight: '10px', color: 'black' }} />
        {buttonText}
      </Button>
      <Menu
        id="room-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
       <MenuItem>
  <Stack direction="row" spacing={10} sx={{ marginTop: '15px', width: 1, alignItems: 'center' }}>
    <p style={{ fontSize: '16px', font: 'Inter', fontWeight: 'bold', marginTop: '7px' }}>
      {HomePage.adultCount}
    </p>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <IconButton
        sx={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #516D87' }}
        onClick={() => handleAdultChange('decrement')}
      >
        <RemoveIcon />
      </IconButton>
      <TextField
        sx={{
          '& .MuiInputBase-root': {
            border: 'none !important',
            boxShadow: 'none !important',
          },
          '& .MuiOutlinedInput-root': {
            border: 'none !important',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none !important',
          },
          width: '60px',
          height: '35px',
          margin: '0',
        }}
        value={adult}
        type="number"
      />
      <IconButton
        sx={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #516D87' }}
        onClick={() => handleAdultChange('increment')}
      >
        <AddIcon />
      </IconButton>
    </Box>
  </Stack>
</MenuItem>
<MenuItem>
  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', width: 1 }}>
    <Stack spacing={1} sx={{ flex: '1' }}>
      <p style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '5px' }}>
        {HomePage.childrencount}
      </p>
      <p style={{ fontSize: '13px', marginTop: '0px' }}>
        {HomePage.chidRule}
      </p>
    </Stack>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <IconButton
        sx={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #516D87' }}
        onClick={() => handleChildrenChange('decrement')}
      >
        <RemoveIcon />
      </IconButton>
      <TextField
        sx={{
          '& .MuiInputBase-root': {
            border: 'none !important',
            boxShadow: 'none !important',
          },
          '& .MuiOutlinedInput-root': {
            border: 'none !important',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none !important',
          },
          width: '60px',
          height: '35px',
          margin: '0',
        }}
        value={childCount}
        type="number"
      />
      <IconButton
        sx={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #516D87' }}
        onClick={() => handleChildrenChange('increment')}
      >
        <AddIcon />
      </IconButton>
    </Box>
  </Stack>
</MenuItem>

        {childCount > 0 && (
          <Stack spacing={1.5} sx={{  marginTop: '20px', marginRight:'30px' }}>
            {childAge1=renderChildAges()}
          </Stack>
        )}
        <Button
          sx={{
            marginLeft: '245px',
            borderRadius: '20px',
            width: '80px',
            backgroundColor: '#516D87',
            textTransform: 'none',
            marginTop: '20px',
          }}
          variant="contained"
          onClick={handleApply}
          disabled={childCount > 0 && !childAgesValid}
        >
          {HomePage.applyButton}
        </Button>
      </Menu>
    </div>
  );
};

export default GuestInfo;
