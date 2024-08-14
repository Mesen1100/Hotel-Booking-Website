import Image from 'next/image';
import loadingGif from '../../assets/images/building_loader.gif'; // Adjust path if necessary
import { Box, Typography } from '@mui/material';
import useRoomStore from '../store/useRoomCriteriaStore';
import { useDictionary } from '../dictionary/Dictionary';

const Loading: React.FC = () => {
  const { LoadingPage } = useDictionary();
  const {
    adult,
    childCount,
    night
  } = useRoomStore();
  
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
        width: '400px',
        height: '300px',
   
      }}
    >
      <Image 
        src={loadingGif}
        alt="Loading"
        layout="fill"
        objectFit="cover"
      />
  <Typography
  sx={{
    position: 'absolute',
    top: '90%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#516D78',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    zIndex: 1,
    whiteSpace: 'nowrap' // Metnin tek satırda kalmasını sağlar
  }}
>
  {LoadingPage.searchingfor} {adult} {LoadingPage.adults}, {childCount} {LoadingPage.children}{childCount > 1 ? 'ren' : ''}, {night} {LoadingPage.night}{night > 1 ? 's' : ''}
</Typography>

    </Box>
  );
};

export default Loading;
