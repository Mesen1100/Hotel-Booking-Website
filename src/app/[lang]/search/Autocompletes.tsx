import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useRouter } from 'next/navigation';
import { useDictionary } from '@/components/dictionary/Dictionary';

type Options = {
  id: string;
  category: string;
  title: string;
};

//for city boolean if false
//for hotel boolen if true
interface Prop{
  id:string;
  category:boolean;
  onSelectionChange: (id: string, category: boolean) => void;}

const MyAutocomplete:React.FC<Prop>= ({id,category,onSelectionChange }) => {
  const { HomePage } = useDictionary();
  const [inputValue, setInputValue] = useState<Options[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const router = useRouter();

  const sendPostRequest = async (query: string) => {
    if (query.length < 3) return []; // Minimum 3 karakter gerekliliği kontrolü

    try {
      const response = await fetch(`http://localhost:5088/api/AutoComplete/AutoComplete?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data && data.body.hotels && Array.isArray(data.body.hotels) && data.body.cities && Array.isArray(data.body.cities)) {
        const hotelData = data.body.hotels.map((hotel: { hotel: { id: string; name: string } }) => ({
          id: hotel.hotel.id,
          category: HomePage.h,
          title: hotel.hotel.name
        }));
        
        const cityData = data.body.cities.map((city: { city: { id: string; name: string } }) => ({
          id: city.city.id,
          category: HomePage.c,
          title: city.city.name
        }));
        const merged = hotelData.concat(cityData);
        return merged;
      } else {
        throw new Error('Invalid data format received from server');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const handleInputChange = async (event: React.SyntheticEvent, newInputValue: string) => {
    const merged = await sendPostRequest(newInputValue);
    setInputValue(merged);
  };

  const handleChange = (event: React.SyntheticEvent, value: Options | string | null) => {
    if (typeof value === 'object' && value !== null) {
      setSelectedValue(value.id); // Set selected ID
      id=value.id;
      const newCategory = value.category === HomePage.c ? false : value.category === HomePage.h ? true : category;
      onSelectionChange(value.id, newCategory);
    } else {
      setSelectedValue(null); // Handle case where value is a string or null
    }
  };


  return (
    <div>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={inputValue.sort((a, b) => a.category.localeCompare(b.category))}
        groupBy={(option) => option.category}
        getOptionLabel={(option: string | Options) => typeof option === 'string' ? option : option.title}
        onInputChange={handleInputChange}
        onChange={handleChange}
        renderOption={(props, option) => (
          <li {...props}>
            <ListItemIcon>
              {option.category === HomePage.c ? (
                <LocationOnIcon sx={{ color: 'black', marginLeft: '5px' }} />
              ) : option.category === HomePage.h ? (
                <HotelIcon sx={{ color: 'black', marginLeft: '5px' }} />
              ) : null}
            </ListItemIcon>
            {option.title}
          </li>
        )}
        sx={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={HomePage.placeholderAuto}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <IconButton size="small" sx={{ marginRight: '0px', color: 'black' }} >
                  <SearchIcon />
                </IconButton>
              ),
              sx: {
                width: '260px',
                height: '40px',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#516D87',
                  borderRadius: '0px',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: 'blue',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue',
                },
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default MyAutocomplete;

