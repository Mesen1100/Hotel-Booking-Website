import React, { useEffect, useState } from 'react';
import { Autocomplete, SxProps, TextField, Theme } from '@mui/material';
import useRoomStore from '../../../components/store/useRoomCriteriaStore';

// Top 17 Numbers data
const top17Numbers =  Array.from({ length: 18 }, (_, i) => ({ label: i.toString(), value: i }));

interface ChildAgeProps {
  onValidChange: (isValid: boolean) => void;
  index: number;
}

const ChildAge: React.FC<ChildAgeProps> = ({ onValidChange, index }) => {
  const [value, setValue] = useState<{ label: string; value: number } | null>(null);
  const { childAges,updateChildAge,addChildAge,setChildAge} = useRoomStore();

  useEffect(() => {
    const isValid = value !== null;
    onValidChange(isValid);
  }, [value, onValidChange]);

  const textFieldStyles: SxProps<Theme> = {
    '& .MuiOutlinedInput-root': {
      borderColor: '#516D87',
      borderRadius: '0',
      height: '35px',
      marginLeft: '22px'
    },
    '& .MuiOutlinedInput-input': {
      height: '100%',
    },
    '& .MuiInputLabel-root': {
      color: '#516D87',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: '#516D87',
    },
    width: '300px',
  };

  const handleChildAge = (event: React.SyntheticEvent<Element, Event>, newValue: { label: string; value: number } | null) => {
    setValue(newValue);
    if (newValue !== null) {
      setChildAge(index,newValue.value);
    }
  };

  return (
    <Autocomplete
      options={top17Numbers}
      value={value}
      onChange={handleChildAge}
      renderInput={(params) => (
        <TextField
          {...params}
          label=""
          variant="outlined"
          sx={textFieldStyles}
        />
      )}
    />
  );
};

export default ChildAge;
