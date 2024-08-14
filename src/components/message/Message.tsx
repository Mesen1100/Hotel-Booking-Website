import Image from 'next/image';
import loadingGif from '../../assets/images/building_loader.gif'; // Adjust path if necessary
import { Box, Typography } from '@mui/material';
import useRoomStore from '../store/useRoomCriteriaStore';
import { red } from '@mui/material/colors';

const Message: React.FC = () => {
 

  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '3%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backgroundColor: 'white', // Slightly transparent background
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        width: '420px',
        height: '200px',
   
      }}
    >
      <Typography  variant='h6' color={'#d50000'} >
       No results found. Please refine your search.
      </Typography>

    </Box>
  );
};

export default Message;
